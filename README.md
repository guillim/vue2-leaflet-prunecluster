# vue2-leaflet-prunecluster

This is a [prunecluster plugin](https://github.com/SINTEF-9012/PruneCluster) extension for [vue2-leaflet package](https://github.com/KoRiGaN/Vue2Leaflet)

## Install

    npm install --save vue2-leaflet-prunecluster

## Usage

### In &lt;template&gt;

    <v-map ref="map">
      <v-prune-cluster
      :items="items"
      :mapObject="this.$refs.map"
      @getSelectedItem="handleIconSignal"
      >
      </v-prune-cluster>
    </v-map>

### In &lt;script&gt;

    import Vue2LeafletPruneCluster from 'vue2-leaflet-prunecluster'

    export default {
      components: {
        'v-prune-cluster': Vue2LeafletPruneCluster
        ...
      },
      ...
    }

## Develop

    ### Test: Compiles + hot-reloads
    ```
    npm install
    npm run serve
    ```

    ### Compiles + minifies for production
    ```
    npm run build
    ```

    ### Lints and fixes files
    ```
    npm run lint
    ```

    ### Customize configuration
    See [Configuration Reference](https://cli.vuejs.org/config/).

## Author

[Guillim](https://guillim.github.io/)

### Contributors

 - [Guillim](https://guillim.github.io/)

## License

MIT


Made with Vue cli with ❤️
