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
    msg="Welcome to Your Vue.js App"
    :items=itemsOrDefault
    :mapRef="this.$refs"
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
      zoom: 6,
      center: L.latLng(47.413220, -0.919482),
      bounds: L.latLngBounds({ 'lat': 51.476483373501964, 'lng': -0.14668464136775586 }, { 'lat': 51.52948330894063, 'lng': -0.019140238291583955 }),
      itemsOrDefault: undefined
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
  methods: {
    handleClick(){
      console.log('clicked');
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







<style>

  /* LOADERS */
  .floating {
    position: absolute;
    z-index:200;
    top: 50%;
    left: 50%;
  }

  /* from : https://github.com/stefanocudini/leaflet-loader */
  .leaflet-control-loader {
    /* position: absolute;
    z-index:200;
    top: 50%;
    left: 50%; */
    margin-top: -40px;
    margin-left: -50px;
    height: 80px;
    width: 100px;
    border-radius: 10px;
    background: url('/static/illustrations/leaflet-loader.gif') center center no-repeat rgba(255,255,255,0.8);
  }

  /* from : https://loading.io/css/ */
  .lds-roller {
    display: inline-block;
    /* position: absolute;
    z-index:200;
    top: 50%;
    left: 50%; */
    /* margin-top: -40px; */
    margin-left: 30px;
    height: 80px;
    width: 100px;
    border-radius: 10px;
  }
  .lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 32px 32px;
  }
  .lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background:  #513085;
    margin: -3px 0 0 -3px;
  }
  .lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
  }
  .lds-roller div:nth-child(1):after {
    top: 50px;
    left: 50px;
  }
  .lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
  }
  .lds-roller div:nth-child(2):after {
    top: 54px;
    left: 45px;
  }
  .lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
  }
  .lds-roller div:nth-child(3):after {
    top: 57px;
    left: 39px;
  }
  .lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
  }
  .lds-roller div:nth-child(4):after {
    top: 58px;
    left: 32px;
  }
  .lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
  }
  .lds-roller div:nth-child(5):after {
    top: 57px;
    left: 25px;
  }
  .lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
  }
  .lds-roller div:nth-child(6):after {
    top: 54px;
    left: 19px;
  }
  .lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
  }
  .lds-roller div:nth-child(7):after {
    top: 50px;
    left: 14px;
  }
  .lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
  }
  .lds-roller div:nth-child(8):after {
    top: 45px;
    left: 10px;
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


  .app-loader {
    margin: 1.5em;
    padding: 1.5em
  }
  .map {
    height: calc(100vh - 120px);
    width: 100%;
  }

  /*
    Leaflet adds its own z-index to a bunch of elements which makes the map appear on top of
    other elements with no good reason
    This line allows for the map to be usable without known limit yet while leaving the map below
    other elements
  */
  .map .leaflet-container *{
    z-index: 1;
  }


  .map{
    position: relative;
  }
  .map .count-and-tabs-container{
    position: absolute;
    top: 1rem;
    width: 100%;
  }

  .map .count-and-tabs-container .result-count-parent,
  .map .count-and-tabs-container .buttons{
    z-index: 2;
  }

  .map .cis-marker-cluster{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: #a174ac;
    color: white;

    font-size: 16px;
    font-weight: bold;

    border-radius: 50%;
  }

  .highlighted-project{
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }

  .highlighted-project button.close{
    margin: 0.5em 0;
    background-color: transparent;
    border: 0;

    align-self: flex-end;
  }

  .highlighted-project .card{
    font-size: 0.9em;

    box-shadow: none;
  }

  .highlighted-project .card .card-content{
    padding: 0.2em 0.5em;
  }

  .highlighted-project .card .card-content:first-of-type{
    padding-top: 0.5em;
  }
  .highlighted-project .card .card-content:last-of-type{
    padding-bottom: 0.5em;
  }

  .highlighted-project .card .card-content h1{
    font-size: 1.1em;
    font-weight: bold;
  }

  /* TODO SASS : share this style with search result project card tag style */
  .highlighted-project .tag{
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0.2em 1em;
    background-color: #767676;
    color: white;
  }

</style>
