<template>
  <div id="app">
    <h1>the end</h1>
    <img alt="Vue logo" src="./assets/logo.png">
    <menu none/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import menu from './components/menu.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
    menu
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
