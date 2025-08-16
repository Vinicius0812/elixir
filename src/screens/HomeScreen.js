// src/screens/HomeScreen.js

import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TextInput } from 'react-native';
import DrinkCard from '../components/DrinkCard';
import { DRINKS } from '../data/drinkData'; // 1. Importar nosso "banco de dados"

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

    const filteredDrinks = useMemo(() => 
        allDrinks.filter(drink =>
        drink.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
        ), [searchQuery, allDrinks]);


    const handlePressDrink = (drink) => {
        navigation.navigate('DrinkDetail', { drink: drink });
    };

    if (loading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text>Carregando drinks...</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
        <TextInput
            style={styles.searchBar}
            placeholder="Buscar um drink..."
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
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
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum drink encontrado.</Text>}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    searchBar: { height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 15, marginHorizontal: 16, marginTop: 16, marginBottom: 8, backgroundColor: '#fff', fontSize: 16 },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' }
});

export default HomeScreen;