import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DrinkCard from '../components/DrinkCard';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';

export default function FavoritesScreen({ navigation }) {
  const {
    favorites,
    favoritesLoading,
    isFavorite,
  } = useAuth();

  const handlePressDrink = (drink) => {
    navigation.navigate('DrinkDetail', { drink });
  };

  if (favoritesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Separando seus favoritos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idDrink}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <DrinkCard
            name={item.strDrink}
            imageUrl={item.strDrinkThumb}
            isFavorite={isFavorite(item.idDrink)}
            onPress={() => handlePressDrink(item)}
          />
        )}
        ListHeaderComponent={
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Coleção pessoal</Text>
            <Text style={styles.title}>Favoritos para voltar quando quiser.</Text>
            <Text style={styles.description}>
              Seus drinks salvos aparecem aqui para consulta rápida e preparo
              sem perder tempo procurando de novo.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Nenhum drink favoritado ainda.</Text>
            <Text style={styles.emptyDescription}>
              Toque no coração na Home, Explorar ou no detalhe da receita para
              montar sua própria lista.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    gap: 12,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 15,
  },
  hero: {
    margin: 16,
    padding: 24,
    borderRadius: 28,
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eyebrow: {
    color: colors.accentSoft,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  emptyContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    padding: 24,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyDescription: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
