import { ADD_FAVORITE_CITY, REMOVE_FAVORITE_CITY, ADD_FAVORITE_LIST } from '../mutation-types.js';

const favorites = {
  state: {
    cities: new Set(),
  },
  getters: {
    isEmptyFavorites: state => !state.cities.size,
    hasFavoriteCity: state => cityName => state.cities.has(cityName),
    favorites: state => [...state.cities].sort(),
  },
  mutations: {
    [ADD_FAVORITE_LIST](state, favorites) {
      state.cities = new Set(favorites);
    },
    [ADD_FAVORITE_CITY](state, cityName) {
      const newFavorites = new Set([...state.cities]);

      newFavorites.add(cityName);
      state.cities = newFavorites;
      localStorage.setItem('favoritesCity', JSON.stringify([...newFavorites]));
    },
    [REMOVE_FAVORITE_CITY](state, cityName) {
      const newFavorites = new Set([...state.cities]);

      newFavorites.delete(cityName);
      state.cities = newFavorites;
      localStorage.setItem('favoritesCity', JSON.stringify([...newFavorites]));
    },
  },
};

export default favorites;