import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from './src/contexts/AuthContext';
import MainTabsScreen from './src/screens/MainTabsScreen';
import DrinkDetailScreen from './src/screens/DrinkDetailScreen';
import AuthScreen from './src/screens/AuthScreen';
import {
  clearSessionToken,
  fetchCurrentUser,
  isAuthApiConfigured,
  loadSessionToken,
  loginAccount,
  registerAccount,
  saveSessionToken,
} from './src/services/authApi';
import { loadDrinksCatalog } from './src/services/drinksApi';
import {
  addFavorite,
  fetchFavorites,
  loadLocalFavorites,
  removeFavorite,
  saveLocalFavorites,
} from './src/services/favoritesApi';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.backgroundElevated,
    text: colors.text,
    border: colors.border,
    notification: colors.accent,
  },
};

export default function App() {
  const [sessionLoading, setSessionLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [drinks, setDrinks] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogStatus, setCatalogStatus] = useState('');
  const [catalogSource, setCatalogSource] = useState('mock');
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoriteBusyIds, setFavoriteBusyIds] = useState([]);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        const token = await loadSessionToken();

        if (!token) {
          return;
        }

        const { user: currentUser } = await fetchCurrentUser(token);

        if (!active) {
          return;
        }

        setAccessToken(token);
        setUser(currentUser);
      } catch (error) {
        await clearSessionToken();
      } finally {
        if (active) {
          setSessionLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadCatalog = async () => {
      setCatalogLoading(true);

      try {
        const { drinks: nextDrinks, source, statusMessage } =
          await loadDrinksCatalog();

        if (!active) {
          return;
        }

        setDrinks(nextDrinks);
        setCatalogSource(source);
        setCatalogStatus(statusMessage);
      } finally {
        if (active) {
          setCatalogLoading(false);
        }
      }
    };

    loadCatalog();

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    let active = true;

    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }

      if (catalogSource === 'mock' || !accessToken || !isAuthApiConfigured()) {
        const localFavorites = await loadLocalFavorites(user.id);
        if (active) {
          setFavorites(localFavorites);
        }
        return;
      }

      setFavoritesLoading(true);

      try {
        const payload = await fetchFavorites(accessToken);

        if (!active) {
          return;
        }

        const nextFavorites = Array.isArray(payload.items)
          ? payload.items.map((item) => item.drink)
          : [];

        setFavorites(nextFavorites);
      } catch (error) {
        const localFavorites = await loadLocalFavorites(user.id);
        if (active) {
          setFavorites(localFavorites);
        }
      } finally {
        if (active) {
          setFavoritesLoading(false);
        }
      }
    };

    loadFavorites();

    return () => {
      active = false;
    };
  }, [accessToken, catalogSource, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    saveLocalFavorites(user.id, favorites).catch(() => {});
  }, [favorites, user]);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((drink) => drink.idDrink)),
    [favorites],
  );

  const authContextValue = useMemo(
    () => ({
      busy,
      user,
      accessToken,
      authConfigured: isAuthApiConfigured(),
      drinks,
      favorites,
      favoriteBusyIds,
      catalogLoading,
      catalogStatus,
      catalogSource,
      favoritesLoading,
      isFavorite(drinkId) {
        return favoriteIds.has(drinkId);
      },
      isFavoriteBusy(drinkId) {
        return favoriteBusyIds.includes(drinkId);
      },
      async toggleFavorite(drink) {
        if (!drink?.idDrink) {
          return;
        }

        const drinkId = drink.idDrink;
        if (favoriteBusyIds.includes(drinkId)) {
          return;
        }
        setFavoriteBusyIds((current) => [...new Set([...current, drinkId])]);

        try {
          const shouldUseLocalOnly =
            catalogSource === 'mock' || !accessToken || !isAuthApiConfigured();

          if (favoriteIds.has(drinkId)) {
            if (!shouldUseLocalOnly) {
              await removeFavorite(accessToken, drinkId);
            }
            setFavorites((current) =>
              current.filter((item) => item.idDrink !== drinkId),
            );
            return;
          }

          if (!shouldUseLocalOnly) {
            await addFavorite(accessToken, drinkId);
          }
          setFavorites((current) => {
            if (current.some((item) => item.idDrink === drinkId)) {
              return current;
            }

            return [drink, ...current];
          });
        } finally {
          setFavoriteBusyIds((current) =>
            current.filter((item) => item !== drinkId),
          );
        }
      },
      async signIn(credentials) {
        setBusy(true);
        try {
          const response = await loginAccount(credentials);
          await saveSessionToken(response.accessToken);
          setAccessToken(response.accessToken);
          setUser(response.user);
        } finally {
          setBusy(false);
        }
      },
      async signUp(credentials) {
        setBusy(true);
        try {
          const response = await registerAccount(credentials);
          await saveSessionToken(response.accessToken);
          setAccessToken(response.accessToken);
          setUser(response.user);
        } finally {
          setBusy(false);
        }
      },
      async signOut() {
        await clearSessionToken();
        setAccessToken(null);
        setUser(null);
        setFavorites([]);
      },
    }),
    [
      accessToken,
      busy,
      catalogLoading,
      catalogSource,
      catalogStatus,
      drinks,
      favoriteBusyIds,
      favoriteIds,
      favorites,
      favoritesLoading,
      user,
    ],
  );

  if (sessionLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Restaurando sua sessão...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.backgroundElevated,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              fontWeight: '700',
            },
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          {user ? (
            <>
              <Stack.Screen
                name="Voltar"
                component={MainTabsScreen}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="DrinkDetail"
                component={DrinkDetailScreen}
                options={{ title: 'Detalhes do Drink' }}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" options={{ title: 'Entrar' }}>
                {(props) => <AuthScreen {...props} mode="login" />}
              </Stack.Screen>
              <Stack.Screen name="Register" options={{ title: 'Criar conta' }}>
                {(props) => <AuthScreen {...props} mode="register" />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    gap: 14,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 15,
  },
});
