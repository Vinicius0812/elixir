import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const placeholderImage = require('../assets/placeholder.png');

export default function DrinkCard({
  name,
  imageUrl,
  onPress,
  isFavorite,
}) {
  const imageSource = imageUrl ? { uri: imageUrl } : placeholderImage;

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      android_ripple={{ color: colors.surfaceSoft }}
    >
      <View style={styles.mainButton}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.metaRow}>
            <Text style={styles.eyebrow}>Coleção da noite</Text>
            {isFavorite ? (
              <Ionicons
                name="star"
                size={14}
                color={colors.accent}
                style={styles.favoriteIcon}
              />
            ) : null}
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.chevron}>{'>'}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
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
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 58,
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  eyebrow: {
    color: colors.accentSoft,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  favoriteIcon: {
    marginTop: -1,
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
