<template>
  <div class="weather-list">
    <div class="weather-list__item weather-list__item--big">
      <BigWeatherCard :weatherInfo="firstWeatherValue" />
    </div>
    <div class="weather-list__item weather-list__item--small" 
         v-for="(item, index) in otherWeatherValue"
         :key="index">
      <SmallWeatherCard :info="item" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BigWeatherCard from './BigWeatherCard';
import SmallWeatherCard from './SmallWeatherCard';

export default {
  name: 'WeatherList',
  components: {
    BigWeatherCard,
    SmallWeatherCard,
  },
  computed: {
    ...mapState(['weatherList']),
    firstWeatherValue() {
      return this.weatherList[0];
    },
    otherWeatherValue() {
      return this.weatherList.slice(1);
    },
  }
}
</script>

<style lang="scss">
  .weather-list {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 295px 155px;
  }
  .weather-list__item {
    &--big {
      grid-column: span 2;
    }
  }
</style>