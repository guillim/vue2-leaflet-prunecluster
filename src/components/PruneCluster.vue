<template>
  <p></p>
</template>

<script>
import L from 'leaflet';
import { PruneCluster, PruneClusterForLeaflet } from '../utilsPruneCluster.js'

export default {
  name: "PruneCluster",
  props: [
    'mapRef',
    'items',
    'iconSizeBig',
    'iconSizeNormal',
    'iconUrl'
  ],

  data() {
    return {
      pruneCluster: undefined,
      selectedItem: undefined,
    };
  },
  computed:{
    iconSizeNormalOrDefault(){
      let i = this.iconSizeNormal
      // let i = JSON.parse(JSON.stringify(this.iconSizeNormal))
      return (typeof i === 'number') ? [i, i] : [29, 29]
    },
    iconSizeBigOrDefault(){
      let i = this.iconSizeBig
      // let i = JSON.parse(JSON.stringify(this.iconSizeBig))
      return (typeof i === 'number') ? [i, i] : [49, 49]
    },
    iconUrlOrDefault(){
      let i = this.iconUrl
      // let i = JSON.parse(JSON.stringify(this.iconUrl))
      return (typeof i === 'string') ? i : '/public/default_icon_pin.svg'
    },
  },
  mounted(){
    // console.log(" - - CustomMarkers / mounted... ")
    this.pruneCluster = new PruneClusterForLeaflet();

    const iconNormalSize = this.iconSizeNormalOrDefault
    const iconBigSize = this.iconSizeBigOrDefault

    const emitDataFunction = this.emitItem

    const smallIcon = L.icon({
      iconUrl: this.iconUrlOrDefault,
      iconSize: iconNormalSize,
    })

    const bigIcon = L.icon({
      iconUrl: this.iconUrlOrDefault,
      iconSize: iconBigSize,
    })
console.log(this.iconUrlOrDefault);
    // we configure the onClick option
    this.pruneCluster.PrepareLeafletMarker = function(leafletMarker, data) {
      leafletMarker.setIcon( smallIcon );

      leafletMarker.on('click', function(){
        // console.log("PrepareLeafletMarker / data : ", data);
        // console.log("PrepareLeafletMarker / this : ", this);
        leafletMarker.setIcon( bigIcon )
        emitDataFunction(data)

      });
    };

    //--------------------------------- configuration de l'icon du Cluster
    this.pruneCluster.BuildLeafletClusterIcon = function(cluster) {
         var e = new L.Icon.MarkerCluster();
         e.stats = cluster.stats;
         e.population = cluster.population;
         return e;
     };
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
    //--------------------------------- the end of the Cluster icon configuration

    let map = this.mapRef.map.mapObject;
    map.addLayer(this.pruneCluster);

    // for the example, to show something even though there are no items
    this.reDraw()
  },

  watch: {
    items(){
      if (this.items && this.items.length > 0) {
        this.reDraw()
      }
    }
  },

  methods:{

    emitItem(item){
      this.$emit('clickOnItem', item)
    },

    checkIfStringFloat(value){
      let val = parseFloat(value)
      if(!isNaN(val)){
        return val
      } else {
        return false
      }
    },

    checkIfItemHasLatLng(item){
      return this.checkIfStringFloat(item.lat) && this.checkIfStringFloat(item.lng)
    },

    reDraw(){
      // console.log('------------- redraw -------------');
      // var pruneCluster = new PruneClusterForLeaflet();
      var pruneCluster = this.pruneCluster

      pruneCluster.RemoveMarkers();

      console.log('removed all the markers - number of markers to map: ',this.items.length);
      this.items.forEach((item) => {
        let marker = this.createMarker(item)
        pruneCluster.RegisterMarker(marker);
      })

    },

    // createIcon() {
    //     return L.icon({
    //         iconUrl: this.iconUrlOrDefault,
    //         iconSize: [38, 95],
    //         iconAnchor: [22, 94],
    //         // shadowUrl: 'my-icon-shadow.png',
    //         shadowSize: [68, 95],
    //         shadowAnchor: [22, 94]
    //     });
    // },

    createMarker(obj){
      let parsedObj = JSON.parse(JSON.stringify(obj))
      let marker = new PruneCluster.Marker(parsedObj.lat, parsedObj.lng);
      // marker.data.icon = this.createIcon;
      // marker.data.ID = parsedObj.sd_id;
      marker.data.ID = parsedObj.id;
      marker.data.lat = parsedObj.lat;
      marker.data.lng = parsedObj.lng;
      return marker
    },


  },

}
</script>
