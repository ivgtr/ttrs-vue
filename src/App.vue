<template>
  <div id="app">
    <h1>TETRIS</h1>
    <ttrs />
    <img src="@/assets/logo.png" alt="てとりす" @click="reload" class="main_logo">
  </div>
</template>

<script>
import ttrs from '@/components/ttrs.vue'

export default {
  name: "app",
  components: {
    ttrs
  },
  methods:{
    reload(){
      location.reload(false)
    }
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
}
.main_logo{
  position: fixed;
  bottom: 0; right: 0;
  z-index: -1;
  height: 100px;
}
</style>
