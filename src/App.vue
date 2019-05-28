<template>
  <div id="app">
    <ttrs />
    <img src="@/assets/logo.png" alt="てとりす" @click="reload" class="main_logo">
  </div>
</template>

<script>
import '@/assets/style.scss'
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
  color: #455A64;
  margin-top: 30px;
}
.main_logo{
  position: fixed;
  top: calc(50% - 70px); left: 0;
  z-index: -1;
  height: 70px;
}
</style>
