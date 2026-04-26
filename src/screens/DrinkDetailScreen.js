import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';

export default function DrinkDetailScreen({ route }) {
  const { drink } = route.params;
  const { isFavorite, isFavoriteBusy, toggleFavorite } = useAuth();

  const getIngredients = () => {
    const ingredients = [];

    for (let i = 1; i <= 15; i += 1) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push(
          `${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim(),
        );
      }
    }

    return ingredients;
  };

  const ingredientsList = getIngredients();
  const favoriteActive = isFavorite(drink.idDrink);
  const favoriteBusy = isFavoriteBusy(drink.idDrink);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.hero}>
        <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
        <View style={styles.heroOverlay} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.eyebrow}>Receita selecionada</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{drink.strDrink}</Text>
          <Pressable
            onPress={() => toggleFavorite(drink)}
            disabled={favoriteBusy}
            style={[
              styles.favoriteButton,
              favoriteBusy && styles.favoriteButtonDisabled,
            ]}
          >
            {favoriteBusy ? (
              <ActivityIndicator size="small" color={colors.accent} />
            ) : (
              <Ionicons
                name={favoriteActive ? 'star' : 'star-outline'}
                size={22}
                color={favoriteActive ? colors.accent : colors.textMuted}
              />
            )}
          </Pressable>
        </View>
        <Text style={styles.subtitle}>
          Uma ficha pensada para consulta rápida, preparo e inspiração.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          {ingredientsList.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <View style={styles.bullet} />
              <Text style={styles.ingredient}>{ingredient}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modo de preparo</Text>
          <Text style={styles.instructions}>{drink.strInstructions}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  hero: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: 300,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryDeep,
    opacity: 0.16,
  },
  infoContainer: {
    padding: 20,
  },
  eyebrow: {
    color: colors.accentSoft,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
    color: colors.text,
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  favoriteButtonDisabled: {
    opacity: 0.7,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    marginBottom: 18,
  },
  section: {
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.accentSoft,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginTop: 8,
    marginRight: 12,
  },
  ingredient: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.text,
  },
});
