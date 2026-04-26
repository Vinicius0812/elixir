import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  const { user, favorites, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Conta do usuário</Text>
        <Text style={styles.title}>{user?.name?.trim() || 'Perfil Elixir'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo rápido</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Favoritos salvos</Text>
          <Text style={styles.statValue}>{favorites.length}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Conta autenticada</Text>
          <Text style={styles.statValue}>Ativa</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gerenciar conta</Text>
        <Text style={styles.cardDescription}>
          Este espaço pode crescer depois com troca de senha, edição de perfil e
          preferências da experiência.
        </Text>

        <Pressable onPress={signOut} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sair da conta</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    gap: 16,
  },
  hero: {
    padding: 24,
    borderRadius: 28,
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eyebrow: {
    color: colors.accentSoft,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginBottom: 8,
  },
  email: {
    color: colors.textMuted,
    fontSize: 15,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  cardDescription: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 15,
  },
  statValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
