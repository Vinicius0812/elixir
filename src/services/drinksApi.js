import { DRINKS } from '../data/drinkData';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL?.trim();

const normalizeApiUrl = (value) => value?.replace(/\/+$/, '');

const formatMeasure = (ingredient) => {
  if (!ingredient.amount && !ingredient.unit) {
    return '';
  }

  return `${ingredient.amount ?? ''} ${ingredient.unit ?? ''}`.trim();
};

const mapApiDrinkToAppDrink = (drink) => {
  const baseDrink = {
    idDrink: drink.id,
    strDrink: drink.name,
    strDrinkThumb: drink.imageUrl ?? null,
    strInstructions: drink.instructions,
    strCategory: drink.category?.name ?? '',
    strAlcoholic: drink.isAlcoholic ? 'Alcoholic' : 'Non alcoholic',
  };

  const ingredientFields = {};

  drink.ingredients?.forEach((ingredient, index) => {
    const slot = index + 1;
    ingredientFields[`strIngredient${slot}`] = ingredient.name;
    ingredientFields[`strMeasure${slot}`] = formatMeasure(ingredient);
  });

  return {
    ...baseDrink,
    ...ingredientFields,
  };
};

export async function loadDrinksCatalog() {
  if (!API_BASE_URL) {
    return {
      drinks: DRINKS,
      source: 'mock',
      statusMessage: 'Usando catálogo local. Defina EXPO_PUBLIC_API_URL para integrar com a API.',
    };
  }

  try {
    const response = await fetch(`${normalizeApiUrl(API_BASE_URL)}/drinks`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const remoteDrinks = Array.isArray(payload)
      ? payload.map(mapApiDrinkToAppDrink)
      : [];

    if (remoteDrinks.length === 0) {
      return {
        drinks: DRINKS,
        source: 'mock',
        statusMessage: 'A API respondeu sem drinks publicados. O app voltou para o catálogo local.',
      };
    }

    return {
      drinks: remoteDrinks,
      source: 'api',
      statusMessage: 'Catálogo carregado pela API.',
    };
  } catch (error) {
    return {
      drinks: DRINKS,
      source: 'mock',
      statusMessage: 'Não foi possível alcançar a API. O app continuou com o catálogo local.',
    };
  }
}
