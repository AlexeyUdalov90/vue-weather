import Vue from 'vue';
import Vuex from 'vuex';

import favorites from './modules/favorites.js';
import weatherRequest from '../weatherApi.js';
import {
  CHANGE_WEATHER_LIST,
  ADD_ERROR,
  REMOVE_ERROR,
  CHANGE_CITY_NAME,
  CHANGE_SUNRISE,
  CHANGE_SUNSET,
  CHANGE_FAVORITE_STATE
} from './mutation-types.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cityName: '',
    sunrise: 0,
    sunset: 0,
    weatherList: [],
    isFavorite: false,
    error: '',
  },
  getters: {
    sunset: state => state.sunset * 1000,
    sunrise: state => state.sunrise * 1000,
  },
  mutations: {
    [CHANGE_CITY_NAME](state, cityName) {
      state.cityName = cityName;
    },
    [CHANGE_SUNRISE](state, sunrise) {
      state.sunrise = sunrise;
    },
    [CHANGE_SUNSET](state, sunset) {
      state.sunset = sunset;
    },
    [CHANGE_WEATHER_LIST](state, weatherList) {
      state.weatherList = weatherList;
    },
    [CHANGE_FAVORITE_STATE](state, isFavorite) {
      state.isFavorite = isFavorite;
    },
    [ADD_ERROR](state, error) {
      state.error = error;
    },
    [REMOVE_ERROR](state) {
      state.error = '';
    },
  },
  actions: {
    async getWeather({ commit, state }, cityName) {
      await weatherRequest(cityName)
        .then((data) => {
          const { city: { name, sunrise, sunset }, list } = data;

          commit(CHANGE_CITY_NAME, name);
          commit(CHANGE_SUNRISE, sunrise);
          commit(CHANGE_SUNSET, sunset);
          commit(CHANGE_WEATHER_LIST, list.slice(0, 5));
          if (state.error) {
            commit(REMOVE_ERROR);
          }
        })
        .catch((err) => {
          commit(ADD_ERROR, err.message);
        });
    },
  },
  modules: {
    favorites,
  },
});

export default store;