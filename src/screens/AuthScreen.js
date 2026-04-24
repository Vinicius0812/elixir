import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import {
  getAuthConfigurationMessage,
  isStrongPassword,
} from '../services/authApi';
import { colors } from '../theme/colors';

const modeConfig = {
  login: {
    title: 'Entre na sua conta',
    subtitle: 'Salve seus proximos favoritos e continue de onde parou.',
    submitLabel: 'Entrar',
    switchLabel: 'Ainda nao tem conta? Cadastre-se',
    switchScreen: 'Register',
  },
  register: {
    title: 'Crie sua conta',
    subtitle: 'Comece sua biblioteca pessoal de drinks com sincronizacao por conta.',
    submitLabel: 'Criar conta',
    switchLabel: 'Ja tem conta? Entrar',
    switchScreen: 'Login',
  },
};

export default function AuthScreen({ navigation, mode = 'login' }) {
  const config = modeConfig[mode];
  const { signIn, signUp, busy, authConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hintMessage, setHintMessage] = useState('');
  const requiresStrongPassword = mode === 'register';
  const passwordIsValid = requiresStrongPassword
    ? isStrongPassword(password)
    : password.length >= 8;

  const disabled = useMemo(
    () => busy || !email.trim() || !passwordIsValid,
    [busy, email, passwordIsValid],
  );

  const handleSubmit = async () => {
    setErrorMessage('');
    setHintMessage('');

    if (!authConfigured) {
      setErrorMessage(getAuthConfigurationMessage());
      return;
    }

    if (!passwordIsValid) {
      setHintMessage(
        requiresStrongPassword
          ? 'Use pelo menos 8 caracteres com letra maiuscula, minuscula, numero e caractere especial.'
          : 'Use pelo menos 8 caracteres.',
      );
      return;
    }

    try {
      if (mode === 'login') {
        await signIn({ email, password });
        return;
      }

      await signUp({ email, password });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.hero}>
        <View style={styles.heroGlowPrimary} />
        <View style={styles.heroGlowAccent} />
        <Text style={styles.eyebrow}>Elixir account</Text>
        <Text style={styles.title}>{config.title}</Text>
        <Text style={styles.subtitle}>{config.subtitle}</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="voce@exemplo.com"
          placeholderTextColor={colors.textFaint}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          secureTextEntry
          placeholder={
            requiresStrongPassword
              ? '8+ chars com maiuscula, minuscula, numero e simbolo'
              : 'No minimo 8 caracteres'
          }
          placeholderTextColor={colors.textFaint}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {!authConfigured ? (
          <Text style={styles.warning}>{getAuthConfigurationMessage()}</Text>
        ) : null}

        {requiresStrongPassword ? (
          <Text style={styles.passwordRule}>
            A senha do cadastro precisa ter 8+ caracteres com letra maiuscula,
            minuscula, numero e caractere especial.
          </Text>
        ) : null}

        {hintMessage ? <Text style={styles.warning}>{hintMessage}</Text> : null}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <Pressable
          disabled={disabled}
          onPress={handleSubmit}
          style={[styles.submitButton, disabled && styles.submitButtonDisabled]}
        >
          {busy ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>{config.submitLabel}</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate(config.switchScreen)}
          style={styles.switchButton}
        >
          <Text style={styles.switchButtonText}>{config.switchLabel}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    justifyContent: 'center',
  },
  hero: {
    padding: 24,
    borderRadius: 28,
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  heroGlowPrimary: {
    position: 'absolute',
    top: -28,
    right: -24,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.primary,
    opacity: 0.24,
  },
  heroGlowAccent: {
    position: 'absolute',
    bottom: -34,
    left: -18,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.accent,
    opacity: 0.14,
  },
  eyebrow: {
    color: colors.accentSoft,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
  },
  warning: {
    color: colors.accentSoft,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  passwordRule: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  error: {
    color: '#FCA5A5',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  submitButton: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  switchButton: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  switchButtonText: {
    color: colors.accentSoft,
    fontSize: 14,
    fontWeight: '600',
  },
});
