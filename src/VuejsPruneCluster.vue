<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <PruneCluster
    msg="Welcome to Your Vue.js App"
    items=items
    mapRef=mapRef
    />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import PruneCluster from './components/PruneCluster.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    PruneCluster
  },
  props:[
    'items',
    'mapRef'
  ],
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
