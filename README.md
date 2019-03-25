# vue2-leaflet-prunecluster

This is a [prunecluster plugin](https://github.com/SINTEF-9012/PruneCluster) extension for [vue2-leaflet package](https://github.com/KoRiGaN/Vue2Leaflet)

## Install

    npm install --save vue2-leaflet-prunecluster

## Usage

``` javascript
<template>
    <v-map ref="map">

      <v-prune-cluster
      :items="items"
      :mapRef="this.$refs"
      @clickOnItem="doWhateverYouWant"
       />

    </v-map>
</template>

<script>
import PruneCluster from 'vue2-leaflet-prunecluster'

export default {
  components: {
    'v-prune-cluster': PruneCluster
  }
}
</script>
```

### Explanations & options
* You **need** a leaflet map around your _vue2-leaflet-prunecluster_ component with a **ref="map"**

* **items** must be an array like this:
``` javascript
[
 { lng: -1.219482, lat: 47.413220, id: '65y' },
 { lng: -1.219482, lat: 47.413220, id: '65y' }
] ```

* The function _doWhateverYouWant_ can simply be
``` javascript
() => console.log('i just clicked');
```
But _doWhateverYouWant_ can be much more advanced in case you want to use full arguments inherited from pruneCluster:
``` javascript
(item,leafletMarker,pruneCluster) => console.log('i just clicked on this item',item);
```

* In case you want to customize your icon, you can also pass the option _:setIcon=setIcon_
with setIcon beging a Leaflet Icon like:
``` javascript
setIcon(){
    return L.icon({
    iconUrl: '../../static/icons/icon_search_violet.svg',
    iconSize: [29, 29],
  })
} ```


## Develop

### See an example (with hot-reloads)
``` bash
git clone https://github.com/guillim/vue2-leaflet-prunecluster.git vue2prune && cd vue2prune && npm install && npm run example
```
and go to [localhost:8080](http://localhost:8080/)

### Compiles + minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Author

[Guillim](https://guillim.github.io/)

### Contributors

 - [Guillim](https://guillim.github.io/)

## License

MIT


Made with Vue cli with ❤️  
Thanks to [SINTEF](https://github.com/SINTEF-9012) for the awsome [prune package](https://github.com/SINTEF-9012/PruneCluster/tree/master/examples)
