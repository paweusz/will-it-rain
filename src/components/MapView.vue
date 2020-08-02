<template>
  <div>
    <div>MapView</div>
    <l-map class="map-view"
      :zoom="zoom"
      :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  name: "MapView",
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: [50.033333, 22],
    }    
  },
};
</script>

<style scoped>
</style>
