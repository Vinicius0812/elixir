// src/screens/HomeScreen.js

import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TextInput } from 'react-native';
import DrinkCard from '../components/DrinkCard';
import { DRINKS } from '../data/drinkData'; // 1. Importar nosso "banco de dados"
import { colors, gradients } from '../theme/colors';

const HomeScreen = ({ navigation }) => {
  const [allDrinks, setAllDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // 2. Simular uma busca no banco de dados
    const loadDrinks = () => {
      // Usamos um timeout para simular a pequena demora de uma consulta real
      setTimeout(() => {
        setAllDrinks(DRINKS);
        setLoading(false);
      }, 500); // 500ms de atraso
    };

    loadDrinks();
  }, []);

  const filteredDrinks = useMemo(
    () =>
      allDrinks.filter(drink =>
        drink.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, allDrinks]
  );

  const handlePressDrink = (drink) => {
    navigation.navigate('DrinkDetail', { drink: drink });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingGlow} />
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Preparando a carta da noite...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredDrinks}
        renderItem={({ item }) => (
          <DrinkCard
            name={item.strDrink}
            imageUrl={item.strDrinkThumb}
            onPress={() => handlePressDrink(item)}
          />
        )}
        keyExtractor={item => item.idDrink}
        ListHeaderComponent={
          <>
            <View style={styles.hero}>
              <View style={styles.heroGlowPrimary} />
              <View style={styles.heroGlowAccent} />
              <Text style={styles.heroEyebrow}>Biblioteca de coquetelaria</Text>
              <Text style={styles.heroTitle}>Drinks com atmosfera de bar nobre.</Text>
              <Text style={styles.heroDescription}>
                Explore receitas classicas, descubra misturas marcantes e navegue
                por uma carta com clima noturno e elegante.
              </Text>
            </View>

            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchBar}
                placeholder="Buscar um drink..."
                placeholderTextColor={colors.textFaint}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Text style={styles.searchHint}>{filteredDrinks.length} drinks na carta</Text>
            </View>
          </>
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum drink encontrado.</Text>}
      />
    </View>
  );
};

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  loadingGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.primaryDeep,
    opacity: 0.25,
  },
  loadingText: {
    marginTop: 14,
    color: colors.textMuted,
    fontSize: 16,
  },
  hero: {
    margin: 16,
    marginBottom: 12,
    padding: 24,
    borderRadius: 28,
    backgroundColor: gradients.heroBottom,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  heroGlowPrimary: {
    position: 'absolute',
    top: -32,
    right: -18,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.primary,
    opacity: 0.28,
  },
  heroGlowAccent: {
    position: 'absolute',
    bottom: -42,
    left: -22,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.accent,
    opacity: 0.16,
  },
  heroEyebrow: {
    color: colors.accentSoft,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginBottom: 10,
    maxWidth: '88%',
  },
  heroDescription: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: '92%',
  },
  searchWrapper: {
    marginHorizontal: 16,
    marginBottom: 6,
  },
  searchBar: {
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 16,
    backgroundColor: colors.inputBackground,
    color: colors.text,
    fontSize: 16,
  },
  searchHint: {
    color: colors.textFaint,
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textMuted,
  },
});

export default HomeScreen;
