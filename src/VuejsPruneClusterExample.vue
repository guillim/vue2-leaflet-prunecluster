<template>
  <div id="app" class="map">
    <div class="container" style="height: 20%; background-color:yellow">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App EXAMPLE"/>
    </div>

    <l-map
    ref='map'
    style="height: 80%; background-color:black"
    :zoom="zoom"
    :center="center"
    >

    <l-tile-layer
       :url="url"
       :attribution="attribution"
       :name="name"
       :visible="visible"
      layer-type="base"
     />

    <PruneCluster
    :items=itemsOrDefault
    :mapRef="this.$refs"
    :setIcon=setIcon
    @clickOnItem="handleClick"
    />

    </l-map>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import PruneCluster from './components/PruneCluster.vue'
import { LMap, LTileLayer } from 'vue2-leaflet';
import L from 'leaflet';
import iconFile from 'leaflet/dist/images/marker-icon.png';

export default {
  name: 'app',
  components: {
    HelloWorld,
    PruneCluster,
    LMap,
    LTileLayer
  },
  props:[
    'items',
    'mapRef'
  ],
  data(){
    return {
      name: 'OpenStreetMap',
      visible: true,
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 7,
      center: L.latLng(47.413220, -0.919482),
      // bounds: L.latLngBounds({ 'lat': 51.476483373501964, 'lng': -0.14668464136775586 }, { 'lat': 51.52948330894063, 'lng': -0.019140238291583955 }),
      itemsOrDefault: undefined,
    }
  },
  mounted(){
    this.itemsOrDefault = (!this.items)
    ? [
      { lng: -1.219482, lat: 47.413220, id: '65y' },
      { lng: -1.571045, lat: 47.457809, id: '65y' },
      { lng: -1.560059, lat: 47.739323, id: '65y' },
      { lng: -0.922852, lat: 47.886881, id: '65y' },
      { lng: 0.439453, lat: 47.613570, id: '65y' },
      { lng: -0.571289, lat: 47.487513, id: '65y' },
      { lng: -0.615234, lat: 47.680183, id: '65y' },
      { lng: -0.812988, lat: 47.724545, id: '65y' },
      { lng: -1.054688, lat: 47.680183, id: '65y' },
      { lng: -1.219482, lat: 47.413220, id: '65y' }
    ]
    : this.items

  },
  computed:{
    setIcon() {
        return L.icon({
        iconUrl: iconFile,
        iconSize: [29, 29],
      })
    }
  },
  methods: {
    handleClick(item,leafletMarker,pruneCluster){
      console.log('clicked',item);
      leafletMarker.setIcon( this.bigIcon() )
    },
    bigIcon(){
      return L.icon({
        iconUrl: iconFile,
        iconSize: [49, 49],
      })
    }
  }
}
</script>

<style>

@import "../node_modules/leaflet/dist/leaflet.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.map {
  height: calc(100vh - 120px);
  width: 100%;
}

</style>
