import * as SecureStore from 'expo-secure-store';
import { mapApiDrinkToAppDrink } from './drinksApi';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL?.trim();
const FAVORITES_STORAGE_PREFIX = 'elixir.favorites';

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error('Defina EXPO_PUBLIC_API_URL para usar favoritos no app.');
  }

  return API_BASE_URL.replace(/\/+$/, '');
}

async function request(path, token, options = {}) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
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

    throw new Error(message ?? 'Não foi possível concluir a requisição.');
  }

  return data;
}

export async function fetchFavorites(token) {
  const data = await request('/favorites', token);

  return {
    items: Array.isArray(data.items)
      ? data.items.map((item) => ({
          ...item,
          drink: mapApiDrinkToAppDrink(item.drink),
        }))
      : [],
  };
}

export function addFavorite(token, drinkId) {
  return request(`/favorites/${drinkId}`, token, {
    method: 'POST',
  });
}

export function removeFavorite(token, drinkId) {
  return request(`/favorites/${drinkId}`, token, {
    method: 'DELETE',
  });
}

function getFavoritesStorageKey(userId) {
  return `${FAVORITES_STORAGE_PREFIX}.${userId}`;
}

export async function loadLocalFavorites(userId) {
  if (!userId) {
    return [];
  }

  const value = await SecureStore.getItemAsync(getFavoritesStorageKey(userId));

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function saveLocalFavorites(userId, drinks) {
  if (!userId) {
    return Promise.resolve();
  }

  return SecureStore.setItemAsync(
    getFavoritesStorageKey(userId),
    JSON.stringify(drinks ?? []),
  );
}
