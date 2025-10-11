const BASE_URL = 'http://localhost:3000';

export const FOODS_URL = `${BASE_URL}/api/foods`;
export const TAGS_URL = `${BASE_URL}/api/foods/tags`;
export const FOOD_BY_ID_URL = (foodId: string) => `${BASE_URL}/api/food/${foodId}`; 
export const FOODS_BY_TAG_URL = (tag: string) => `${BASE_URL}/api/foods/tag/${tag}`;
export const SEARCH_FOODS_URL = (searchTerm: string) => `${BASE_URL}/api/foods/search/${searchTerm}`;
