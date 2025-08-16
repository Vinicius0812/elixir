// src/components/DrinkCard.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Vamos manter o placeholder para o caso de a imagem da API falhar
const placeholderImage = require('../assets/placeholder.png');

// 1. Receber "imageUrl" como prop
const DrinkCard = ({ name, imageUrl, onPress }) => {
    // 2. Decidir qual imagem usar: a da API ou o placeholder
    const imageSource = imageUrl ? { uri: imageUrl } : placeholderImage;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
        {/* 3. Usar a imagem correta. Note a sintaxe {{ uri: ... }} para imagens da internet */}
        <Image source={imageSource} style={styles.image} />
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
        borderRadius: 25,
        marginRight: 16,
        backgroundColor: '#eee', // Um fundo cinza para o caso da imagem demorar a carregar
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DrinkCard;