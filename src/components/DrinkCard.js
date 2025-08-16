// src/components/DrinkCard.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Por enquanto, usaremos uma imagem de placeholder
const placeholderImage = require('../assets/placeholder.png');

const DrinkCard = ({ name, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={placeholderImage} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        // Sombra para dar profundidade
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25, // Para deixar a imagem redonda
        marginRight: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DrinkCard;