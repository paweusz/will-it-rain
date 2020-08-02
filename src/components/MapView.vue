<template>
  <div>
    <l-map class="map-view"
      :zoom="zoom"
      :center="center">
      <l-tile-layer :url="mapURL"></l-tile-layer>
      <l-image-overlay :url="radarURL" :bounds="radarBounds"></l-image-overlay>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LImageOverlay } from "vue2-leaflet";

export default {
  name: "MapView",
  components: {
    LMap,
    LTileLayer,
    LImageOverlay,
  },
  data() {
    return {
      mapURL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      radarURL: "http://res4.imgw.pl/products/radars/img/pl/cmax/900-watermark/epsg-3857/2020080213000000.png",
      zoom: 9,
      center: [50.033333, 22],
      radarBounds: [[56.1865, 11.8129], [48.1334, 25.1576]],
    }    
  },
};
</script>

<style scoped>
</style>
