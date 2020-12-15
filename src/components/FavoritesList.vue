<template>
  <div :class="['favorites', {open: isOpen}]">
    <button class="favorites__toggle" @click.prevent="toggleList" :disabled="isEmptyFavorites">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M376 30c-27.783 0-53.255 8.804-75.707 26.168-21.525 16.647-35.856 37.85-44.293 53.268-8.437-15.419-22.768-36.621-44.293-53.268C189.255 38.804 163.783 30 136 30 58.468 30 0 93.417 0 177.514c0 90.854 72.943 153.015 183.369 247.118 18.752 15.981 40.007 34.095 62.099 53.414C248.38 480.596 252.12 482 256 482s7.62-1.404 10.532-3.953c22.094-19.322 43.348-37.435 62.111-53.425C439.057 330.529 512 268.368 512 177.514 512 93.417 453.532 30 376 30z"/></svg>
    </button>
    <ul class="favorites__list">
      <li class="favorites__item" v-for="(city, index) in favorites" :key="index">
        <button class="favorites__button" @click.prevent="selectCity(city)">{{ city }}</button>
        <button class="favorites__delete" @click.prevent="deleteFavoriteCity(city)"></button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex';
import { CHANGE_FAVORITE_STATE, REMOVE_FAVORITE_CITY } from '../store/mutation-types.js';

export default {
  name: 'FavoritesList',
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState(['cityName']),
    ...mapGetters(['isEmptyFavorites', 'favorites']),
  },
  methods: {
    ...mapMutations({
      removeFavoriteCity: REMOVE_FAVORITE_CITY,
      changeFavoriteState: CHANGE_FAVORITE_STATE,
    }),
    ...mapActions(['getWeather']),
    toggleList() {
      this.isOpen = !this.isOpen;
    },
    selectCity(cityName) {
      this.isOpen = !this.isOpen;
      this.getWeather(cityName).then(() => {
        this.changeFavoriteState(true);
        localStorage.setItem('lastCity', cityName);
      });
    },
    deleteFavoriteCity(cityName) {
      this.removeFavoriteCity(cityName);

      if (cityName.toLowerCase() === this.cityName.toLowerCase()) {
        this.changeFavoriteState(false);
      }

      if (this.isEmptyFavorites && this.isOpen) {
        this.isOpen = !this.isOpen;
      }
    },
  },
}
</script>

<style lang="scss">
  .favorites {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s ease;
    }
    &.open::before {
        opacity: 1;
        visibility: visible;
      }
    &__toggle {
      position: relative;
      z-index: 2;
      display: flex;
      padding: 0;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 10px;
      background-color: var(--light-color);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      transition-property: all, transform;
      transition-duration: 0.3s, 0.4s;
      transition-timing-function: ease, ease-out;
      outline: none;
      cursor: pointer;
      &:active {
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
      }
      &:disabled {
        opacity: 0.6;
        box-shadow: none;
        cursor: default;
      }
      svg {
        margin: auto;
        width: 20px;
        fill: var(--favorite-color);
      }
      .open & {
        transform: translate3d(-305px, 0, 0);
        transition-timing-function: ease, ease-in;
      }
    }
    &__list {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      margin: 0;
      padding: 15px;
      width: 305px;
      height: 100%;
      list-style: none;
      background-color: var(--list-color);
      border-radius: 15px;
      overflow-y: auto;
      transition-duration: 0.4s;
      transition-property: transform;
      transition-timing-function: ease-out;
      transform: translate3d(100%, 0, 0);
      .open & {
        transition-timing-function: ease-in;
        transform: translate3d(0, 0, 0);
      }
    }
    &__item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--text-color);
    }
    &__button {
      padding: 10px;
      flex-grow: 1;
      text-align: left;
      background-color: transparent;
      border: none;
      border-radius: 0;
      outline: none;
      cursor: pointer;
    }
    &__delete {
      position: relative;
      padding: 0;
      width: 30px;
      height: 30px;
      color: var(--error-color);
      background-color: transparent;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 18px;
        height: 3px;
        background-color: currentColor;
        border-radius: 4px;
      }
      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
</style>