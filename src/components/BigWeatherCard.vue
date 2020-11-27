<template>
  <div class="weatherInfo">
    <span class="weatherInfo__icon">
      <img :src="icon" alt="">
    </span>
    <span class="weatherInfo__description">{{ description }}</span>
    <div class="weatherInfo__wrapper">
      <span class="weatherInfo__city">{{ cityName }}</span>
      <span class="weatherInfo__temp">{{ temperature | roundToWhole }}</span>
    </div>
    <div class="weatherInfo__wrapper">
      <span class="weatherInfo__sunrise">
        <img src="../assets/sunrise.svg" alt="" width="16">
        Восход {{ sunrise | dateFilter('time') }}
      </span>
      <span class="weatherInfo__sunset">
        <img src="../assets/sunset.svg" alt="" width="16">
        Закат {{ sunset | dateFilter('time') }}
      </span>
    </div>
    <button :class="['weatherInfo__button', {favorite: isFavorite}]" @click.prevent="favoriteButtonClickHandler">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M376 30c-27.783 0-53.255 8.804-75.707 26.168-21.525 16.647-35.856 37.85-44.293 53.268-8.437-15.419-22.768-36.621-44.293-53.268C189.255 38.804 163.783 30 136 30 58.468 30 0 93.417 0 177.514c0 90.854 72.943 153.015 183.369 247.118 18.752 15.981 40.007 34.095 62.099 53.414C248.38 480.596 252.12 482 256 482s7.62-1.404 10.532-3.953c22.094-19.322 43.348-37.435 62.111-53.425C439.057 330.529 512 268.368 512 177.514 512 93.417 453.532 30 376 30z"/></svg>
    </button>
  </div>
</template>

<script>
import { ADD_FAVORITE_CITY, REMOVE_FAVORITE_CITY, CHANGE_FAVORITE_STATE } from '../store/mutation-types';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'BigWeatherCard',
  props: {
    weatherInfo: Object,
  },
  computed: {
    ...mapState(['cityName', 'isFavorite']),
    ...mapGetters(['sunset', 'sunrise']),
    icon() {
      return `img/icons/${this.weatherInfo.weather[0].icon.match(/\d*/)[0]}.svg`;
    },
    description() {
      return this.weatherInfo.weather[0].description;
    },
    temperature() {
      return this.weatherInfo.main.temp;
    },
  },
  methods: {
    ...mapMutations({
      addFavoriteCity: ADD_FAVORITE_CITY,
      deleteFavoriteCity: REMOVE_FAVORITE_CITY,
      changeFavoriteState: CHANGE_FAVORITE_STATE,
    }),
    favoriteButtonClickHandler() {
      if (this.isFavorite) {
        this.deleteFavoriteCity({ cityName: this.cityName });
        this.changeFavoriteState({ isFavorite: false });
      } else {
        this.addFavoriteCity({ cityName: this.cityName });
        this.changeFavoriteState({ isFavorite: true });
      }
    },
  },
}
</script>

<style lang="scss">
  .weatherInfo {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background-color: var(--light-color);
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    &__icon {
      width: 149px;
      img {
        width: 100%;
        height: auto;
      }
    }
    &__temp {
      position: relative;
      padding-right: 10px;
      font-size: 45px;
      line-height: 1;
      &::before {
        content: "";
        position: absolute;
        top: 5px;
        right: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 3px solid var(--text-color);
      }
    }
    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 10px;
      width: 100%;
    }
    &__description {
      margin-bottom: 10px;
    }
    &__city {
      margin-right: auto;
      font-size: 22px;
    }
    &__sunrise {
      margin-right: 15px;
      img {
        margin-right: 5px;
      }
    }
    &__sunset {
      img {
        margin-right: 5px;
      }
    }
    &__button {
      position: absolute;
      top: 5px;
      left: 5px;
      display: flex;
      padding: 0;
      width: 40px;
      height: 40px;
      background-color: transparent;
      border-radius: 0;
      border: none;
      outline: none;
      svg {
        margin: auto;
        width: 20px;
        transition: 0.3s ease
      }
      &.favorite svg {
        fill: var(--favorite-color);
      }
    }
  }
</style>