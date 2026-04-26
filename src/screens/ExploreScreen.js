import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DrinkCard from '../components/DrinkCard';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';

const FILTERS = [
  { key: 'all', label: 'Tudo' },
  { key: 'alcoholic', label: 'Alcoólicos' },
  { key: 'non-alcoholic', label: 'Sem álcool' },
];

export default function ExploreScreen({ navigation }) {
  const { drinks, isFavorite } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = useMemo(() => {
    const names = drinks
      .map((drink) => drink.strCategory?.trim())
      .filter(Boolean);

    return [...new Set(names)].sort((left, right) => left.localeCompare(right));
  }, [drinks]);

  const featuredCategories = categories.slice(0, 6);

  const filteredDrinks = useMemo(() => {
    if (activeFilter === 'alcoholic') {
      return drinks.filter((drink) => drink.strAlcoholic === 'Alcoholic');
    }

    if (activeFilter === 'non-alcoholic') {
      return drinks.filter((drink) => drink.strAlcoholic !== 'Alcoholic');
    }

    return drinks;
  }, [activeFilter, drinks]);

  const handlePressDrink = (drink) => {
    navigation.navigate('DrinkDetail', { drink });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredDrinks}
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
          <>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Rotas de descoberta</Text>
              <Text style={styles.title}>Explore o catálogo por clima e estilo.</Text>
              <Text style={styles.description}>
                Navegue pelas famílias da carta, separe receitas alcoólicas ou
                não alcoólicas e encontre novas ideias para a próxima rodada.
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterRow}
            >
              {FILTERS.map((filter) => {
                const active = filter.key === activeFilter;

                return (
                  <Pressable
                    key={filter.key}
                    onPress={() => setActiveFilter(filter.key)}
                    style={[styles.filterChip, active && styles.filterChipActive]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        active && styles.filterChipTextActive,
                      ]}
                    >
                      {filter.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={styles.categorySection}>
              <Text style={styles.categoryTitle}>Categorias em destaque</Text>
              <View style={styles.categoryGrid}>
                {featuredCategories.map((category) => (
                  <View key={category} style={styles.categoryPill}>
                    <Text style={styles.categoryPillText}>{category}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
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
  filterRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: colors.white,
  },
  categorySection: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    padding: 20,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: colors.surfaceSoft,
  },
  categoryPillText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
});
