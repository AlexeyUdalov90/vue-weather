<template>
  <div id="app">
    <WeatherApp/>
  </div>
</template>

<script>
import WeatherApp from './components/WeatherApp.vue'

export default {
  name: 'App',
  components: {
    WeatherApp
  }
}
</script>

<style lang="scss">
  :root {
    --background-color: #87D68D;
    --light-color: #F7FFF6;
    --list-color: #809BCE;
    --text-color: #1F2232;
    --error-color: #C3423F;
    --favorite-color: #DF928E;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    font-family: 'Raleway', sans-serif;
    font-style: 16px;
    line-height: 1.125;
    color: var(--color-text);
  }
  .visually-hidden {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    padding:0 !important;
    border:0 !important;
    height: 1px !important; 
    width: 1px !important; 
    overflow: hidden;
  }
</style>
