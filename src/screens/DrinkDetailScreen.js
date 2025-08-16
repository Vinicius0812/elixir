// src/screens/DrinkDetailScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DrinkDetailScreen = ({ route }) => {
  // Recebemos os dados passados pela navegação através do objeto 'route.params'
    const { drinkName } = route.params;

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{drinkName}</Text>
        {/* Aqui no futuro entrarão os ingredientes, modo de preparo, etc. */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default DrinkDetailScreen;