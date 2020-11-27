<template>
  <div class="weatherApp">
    <div class="weatherApp__top">
      <div class="weatherApp__search">
        <SearchForm />
      </div>
      <div class="weatherApp__fetures">
        <FavoritesList />
      </div>
    </div>
    <div class="weatherApp__content">
      <div v-if="cityName && !error" class="weatherApp__info">
        <WeatherList />
      </div>
      <div v-if="error" class="weatherApp__error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex';
import SearchForm from './SearchForm.vue';
import FavoritesList from './FavoritesList.vue';
import WeatherList from './WeatherList.vue';

import { ADD_FAVORITE_LIST, CHANGE_FAVORITE_STATE } from '../store/mutation-types.js';

export default {
  name: 'WeatherApp',
  components: {
    SearchForm,
    FavoritesList,
    WeatherList,
  },
  computed: {
    ...mapState(['error', 'cityName']),
    ...mapGetters(['isEmptyCurrentCity', 'hasFavoriteCity']),
  },
  methods: {
    ...mapMutations({
      addFavoriteList: ADD_FAVORITE_LIST,
      changeFavoriteState: CHANGE_FAVORITE_STATE,
    }),
    ...mapActions(['getWeather']),
  },
  mounted: function() {
    const lastCity = localStorage.getItem('lastCity');
    const favoritesCity = JSON.parse(localStorage.getItem('favoritesCity'));
    if (lastCity) {
      this.getWeather({ cityName: lastCity })
        .then(() => {
          this.changeFavoriteState({ isFavorite: this.hasFavoriteCity(lastCity) });
        });
    }
    if (favoritesCity) {
      this.addFavoriteList({ favorites: favoritesCity });
    }
  },
}
</script>

<style lang="scss">
  .weatherApp {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
    max-width: 375px;
    height: 726px;
    background-color: var(--background-color);
    border-radius: 15px;
    overflow: hidden;
    &__top {
      display: flex;
      flex-shrink: 0;
      margin-bottom: 15px;
    }
    &__search {
      flex-grow: 1;
      margin-right: 15px;
    }
    &__features {
      flex-shrink: 0;
    }
    &__content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__list {
      display: grid;
      grid-gap: 15px;
      grid-template-columns: repeat(2, 1fr);
    }
    &__error {
      font-size: 24px;
      color: var(--error-color);
      text-align: center;
      &::before {
        content: '!';
        display: block;
        margin: 0 auto 20px;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-weight: 700;
        border-radius: 50%;
        border: 2px solid currentColor;
      }
    }
  }
</style>