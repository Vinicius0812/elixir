// App.js
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from './src/contexts/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
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

  const authContextValue = useMemo(
    () => ({
      busy,
      user,
      authConfigured: isAuthApiConfigured(),
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
      },
      accessToken,
    }),
    [accessToken, busy, user],
  );

  if (sessionLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Restaurando sua sessao...</Text>
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
                name="Home"
                component={HomeScreen}
                options={{ title: 'Elixir' }}
              />
              <Stack.Screen
                name="DrinkDetail"
                component={DrinkDetailScreen}
                options={{ title: 'Detalhes do Drink' }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                options={{ title: 'Entrar' }}
              >
                {(props) => <AuthScreen {...props} mode="login" />}
              </Stack.Screen>
              <Stack.Screen
                name="Register"
                options={{ title: 'Criar conta' }}
              >
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
