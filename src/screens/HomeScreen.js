// src/screens/HomeScreen.js

import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import DrinkCard from '../components/DrinkCard'; // Importando nosso componente

// Nossos dados de exemplo (mock data)
const mockDrinks = [
    { id: '1', name: 'Mojito' },
    { id: '2', name: 'Caipirinha' },
    { id: '3', name: 'Margarita' },
    { id: '4', name: 'Dry Martini' },
    { id: '5', name: 'Cosmopolitan' },
];

const HomeScreen = () => {
    return (
        <View style={styles.container}>
        <FlatList
            data={mockDrinks}
            renderItem={({ item }) => <DrinkCard name={item.name} />}
            keyExtractor={item => item.id}
            ListHeaderComponent={<Text style={styles.header}>Drinks Famosos</Text>}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 16,
        marginTop: 24,
    }
});

export default HomeScreen;