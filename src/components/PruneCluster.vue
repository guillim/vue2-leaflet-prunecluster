<template>
  <p></p>
</template>

<script>
import L from 'leaflet';
import { PruneCluster, PruneClusterForLeaflet } from '../utilsPruneCluster.js'
import iconFileDefault from 'leaflet/dist/images/marker-icon.png';

const props = [
  'mapRef',
  'items',
  'setIcon',
];
export default {
  name: "PruneCluster",
  props,
  data() {
    return {
      itemsOrDefault: [],
      pruneCluster: undefined,
      selectedItem: undefined,
    };
  },
  computed:{
    setIconOrDefault(){
      let i = this.setIcon
      let defaultIcon = L.icon({
        iconUrl: iconFileDefault,
        iconSize: [29, 29],
      })
      return (i) ? i : defaultIcon
    },
    setIconMarkerClusterOrDefault(){
      let i = this.setIconMarkerCluster


      var colors = ['#ff4b00', '#bac900', '#EC1813', '#55BCBE', '#D2204C', '#FF0000', '#ada59a', '#3e647e'],
      pi2 = Math.PI * 2;
      L.Icon.MarkerCluster = L.Icon.extend({
          options: {
              // iconUrl: '/static/icons/icon_cluster_yellow.svg',
              iconSize: new L.Point(44, 44),
              className: 'prunecluster leaflet-markercluster-icon'
          },
          createIcon: function () {
              // based on L.Icon.Canvas from shramov/leaflet-plugins (BSD licence)
              var e = document.createElement('canvas');
              this._setIconStyles(e, 'icon');
              var s = this.options.iconSize;
              e.width = s.x;
              e.height = s.y;
              this.draw(e.getContext('2d'), s.x, s.y);
              return e;
          },
          createShadow: function () {
              return null;
          },
          draw: function(canvas) {
              var start = 0;
              for (var i = 0, l = colors.length; i < l; ++i) {
                  var size = this.stats[i] / this.population;
                  if (size > 0) {
                      canvas.beginPath();
                      canvas.moveTo(22, 22);
                      canvas.fillStyle = colors[i];
                      var from = start + 0.14,
                          to = start + size * pi2;
                      if (to < from) {
                          from = start;
                      }
                      canvas.arc(22,22,22, from, to);
                      start = start + size*pi2;
                      canvas.lineTo(22,22);
                      canvas.fill();
                      canvas.closePath();
                  }
              }
              canvas.beginPath();
              canvas.fillStyle = '#a174ac';
              canvas.arc(22, 22, 18, 0, Math.PI*2);
              canvas.fill();
              canvas.closePath();
              canvas.fillStyle = 'white';
              canvas.textAlign = 'center';
              canvas.textBaseline = 'middle';
              canvas.font = 'bold 12px sans-serif';
              canvas.fillText(this.population, 22, 22, 40);
          }
      });

      return (i) ? i : new L.Icon.MarkerCluster()
    },
  },
  mounted(){
    this.pruneCluster = new PruneClusterForLeaflet();

    const emitDataFunction = this.emitItem

    //trick to be able to access this inside the leaflet function
    let thisVue = this

    //--------------------------------- icon Cluster configuration
    this.pruneCluster.PrepareLeafletMarker = function(leafletMarker, data) {
      leafletMarker.setIcon( thisVue.setIconOrDefault );
      // we configure the onClick option
      leafletMarker.on('click', function(){
        emitDataFunction(data,leafletMarker,thisVue.pruneCluster)

      });
    };

    //--------------------------------- icon Cluster configuration
    this.pruneCluster.BuildLeafletClusterIcon = function(cluster) {
         var e = thisVue.setIconMarkerClusterOrDefault
         e.stats = cluster.stats;
         e.population = cluster.population;
         return e;
     };

    let map = this.mapRef.map.mapObject;
    map.addLayer(this.pruneCluster);

    this.reDraw()
  },

  watch: {
    items(){
      if (this.items && Array.isArray(this.items)) {
        this.itemsOrDefault = this.items
        this.reDraw()
      }
    }
  },

  methods:{

    emitItem(item,leafletMarker,pruneCluster){
      this.$emit('clickOnItem', JSON.parse(JSON.stringify(item)),leafletMarker,pruneCluster)
    },


    reDraw(){
      // console.log('------------- redraw -------------');
      // var pruneCluster = new PruneClusterForLeaflet();
      var pruneCluster = this.pruneCluster

      pruneCluster.RemoveMarkers();

      // console.log('removed all the markers - number of markers to map: ',this.items.length);
      if(this.itemsOrDefault && Array.isArray(this.itemsOrDefault)){
          this.itemsOrDefault.forEach((item) => {
            let marker = this.createMarker(item)
            pruneCluster.RegisterMarker(marker);
          })
      }

    },

    createMarker(obj){
      let parsedObj = JSON.parse(JSON.stringify(obj))
      let marker = new PruneCluster.Marker(parsedObj[this.findLat(parsedObj)], parsedObj[this.findLng(parsedObj)]);
      marker.data = parsedObj;
      return marker
    },

    findLat(obj){
      return Object.keys(obj).find( (o) => /lat|LAT|lati|latitude|Latitude/g.test(o) )
    },

    findLng(obj){
      return Object.keys(obj).find( (o) => /lng|lon|LON|LNG|long|longitude|Longitude/g.test(o) )
    },


  },

}
</script>
