<template>
  <div id="app">
    <h1>TETRIS</h1>
    <ttrs />
  </div>
</template>

<script>
import ttrs from '@/components/ttrs.vue'

export default {
  name: "app",
  components: {
    ttrs
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  &::after{
    content: "";
    background: url(assets/logo.png) 0 0 no-repeat;
    background-size: contain;
    height: 100px; width: 100px;
    position: fixed;
    bottom: 0; right: 0;
    z-index: -1;
  }
}
</style>
