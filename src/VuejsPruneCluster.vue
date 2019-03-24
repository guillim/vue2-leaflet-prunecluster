<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <PruneCluster
    :items=items
    :mapRef=mapRef
    :setIcon=setIcon
    @clickOnItem="handleClick"
    />
  </div>
</template>

<script>
import PruneCluster from './components/PruneCluster.vue'

export default {
  name: 'app',
  components: {
    PruneCluster
  },
  props:[
    'items',
    'mapRef',
    'setIcon',
    'handleClick'
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
