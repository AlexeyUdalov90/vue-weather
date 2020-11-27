<template>
  <div class="weatherItem">
    <span class="weatherItem__icon">
      <img :src="icon" alt="">
    </span>
    <span class="weatherItem__temp">{{ temperature | roundToWhole }}</span>
    <div class="weatherItem__wrapper">
      <span class="weatherItem__date">{{ this.date | dateFilter }}</span>
      <span class="weatherItem__time">{{ this.date | dateFilter('time') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherListItem',
  props: {
    info: Object,
  },
  computed: {
    icon() {
      return `img/icons/${this.info.weather[0].icon.match(/\d*/)[0]}.svg`;
    },
    temperature() {
      return this.info.main.temp;
    },
    date() {
      return this.info.dt * 1000;
    },
  },
}
</script>

<style lang="scss">
  .weatherItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: var(--light-color);
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    &__icon {
      width: 79px;
      img {
        width: 100%;
        height: auto;
      }
    }
    &__temp {
      position: relative;
      margin-bottom: 10px;
      padding-right: 10px;
      font-size: 25px;
      line-height: 1;
      &::before {
        content: "";
        position: absolute;
        top: 5px;
        right: 0;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        border: 2px solid var(--text-color);
      }
    }
    &__wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
</style>