// src/components/DrinkCard.js

import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

// Vamos manter o placeholder para o caso de a imagem da API falhar
const placeholderImage = require('../assets/placeholder.png');

// 1. Receber "imageUrl" como prop
const DrinkCard = ({ name, imageUrl, onPress }) => {
  // 2. Decidir qual imagem usar: a da API ou o placeholder
  const imageSource = imageUrl ? { uri: imageUrl } : placeholderImage;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.86}>
      {/* 3. Usar a imagem correta. Note a sintaxe {{ uri: ... }} para imagens da internet */}
      <Image source={imageSource} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>Colecao da noite</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.chevron}>{'>'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 7,
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 16,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  content: {
    flex: 1,
  },
  eyebrow: {
    color: colors.accentSoft,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  chevron: {
    fontSize: 24,
    color: colors.primary,
    marginLeft: 12,
    marginTop: -2,
  },
});

export default DrinkCard;
