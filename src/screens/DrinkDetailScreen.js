// src/screens/DrinkDetailScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DrinkDetailScreen = ({ route }) => {
    const { drink } = route.params;

    const getIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
        }
        }
        return ingredients;
    };

    const ingredientsList = getIngredients();

    return (
        <ScrollView style={styles.container}>
        <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{drink.strDrink}</Text>

            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes:</Text>
            {ingredientsList.map((ingredient, index) => (
                <Text key={index} style={styles.ingredient}>
                • {ingredient}
                </Text>
            ))}
            </View>

            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modo de Preparo:</Text>
            <Text style={styles.instructions}>{drink.strInstructions}</Text>
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 300 },
    infoContainer: { padding: 20 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 22, fontWeight: '700', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
    ingredient: { fontSize: 16, lineHeight: 24 },
    instructions: { fontSize: 16, lineHeight: 24 },
});

export default DrinkDetailScreen;