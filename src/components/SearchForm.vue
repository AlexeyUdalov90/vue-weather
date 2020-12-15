<template>
  <form class="searchForm" @submit.prevent="searchFormSubmitHandler">
    <label class="visually-hidden" for="search">Название гоорода</label>
    <input class="searchForm__field" 
           type="text"
           name="search"
           id="search"
           placeholder="Введите название города"
           autocomplete="off"
           v-model="cityName">
    <button class="searchForm__button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M225.474 0C101.151 0 0 101.151 0 225.474c0 124.33 101.151 225.474 225.474 225.474 124.33 0 225.474-101.144 225.474-225.474C450.948 101.151 349.804 0 225.474 0zm0 409.323c-101.373 0-183.848-82.475-183.848-183.848S124.101 41.626 225.474 41.626s183.848 82.475 183.848 183.848-82.475 183.849-183.848 183.849z"/><path d="M505.902 476.472L386.574 357.144c-8.131-8.131-21.299-8.131-29.43 0-8.131 8.124-8.131 21.306 0 29.43l119.328 119.328A20.74 20.74 0 00491.187 512a20.754 20.754 0 0014.715-6.098c8.131-8.124 8.131-21.306 0-29.43z"/></svg>
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { CHANGE_FAVORITE_STATE } from '../store/mutation-types.js';

export default {
  name: 'SearchForm',
  data() {
    return {
      cityName: '',
    };
  },
  computed: {
    ...mapGetters(['hasFavoriteCity']),
  },
  methods: {
    ...mapMutations({
      changeFavoriteState: CHANGE_FAVORITE_STATE,
    }),
    ...mapActions(['getWeather']),
    searchFormSubmitHandler() {
      const cityName = this.cityName;
      this.getWeather(cityName)
        .then(() => {
          localStorage.setItem('lastCity', cityName);
          this.changeFavoriteState(this.hasFavoriteCity(cityName));
        });
    },
  },
}
</script>

<style lang="scss">
  .searchForm {
    position: relative;
    width: 100%;
    background-color: var(--light-color);
    border-radius: 10px;
    &__field {
      padding: 10px 50px 10px 10px;
      width: 100%;
      font: inherit;
      background-color: transparent;
      border: 1px solid var(--light-color);
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      transition: 0.3s ease;
      &:focus {
        outline: none;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
    }
    &__button {
      position: absolute;
      right: 0;
      top: 0;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: none;
      background-color: transparent;
      cursor: pointer;
      svg {
        width: 16px;
        fill: var(--text-color);
      }
    }
  }
</style>