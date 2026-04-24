import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL?.trim();
const SESSION_TOKEN_KEY = 'elixir.session.token';
export const REGISTER_PASSWORD_RULE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      'Defina EXPO_PUBLIC_API_URL para habilitar login e cadastro no app.',
    );
  }

  return API_BASE_URL.replace(/\/+$/, '');
}

async function request(path, options = {}) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join(' ')
      : data.message;

    throw new Error(message ?? 'Nao foi possivel concluir a requisicao.');
  }

  return data;
}

export async function registerAccount(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginAccount(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchCurrentUser(token) {
  return request('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function isAuthApiConfigured() {
  return Boolean(API_BASE_URL);
}

export function getAuthConfigurationMessage() {
  if (isAuthApiConfigured()) {
    return '';
  }

  return 'A URL da API nao esta configurada. Reinicie o Expo depois de ajustar EXPO_PUBLIC_API_URL.';
}

export function isStrongPassword(password) {
  return REGISTER_PASSWORD_RULE.test(password);
}

export function saveSessionToken(token) {
  return SecureStore.setItemAsync(SESSION_TOKEN_KEY, token);
}

export function loadSessionToken() {
  return SecureStore.getItemAsync(SESSION_TOKEN_KEY);
}

export function clearSessionToken() {
  return SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
}
