import Vue from 'vue'
import VuejsPruneCluster from './VuejsPruneCluster.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(VuejsPruneCluster),
}).$mount('#app')
