<template>
  <div>
    <l-map class="map-view"
      :zoom="zoom"
      :center="center">
      <l-tile-layer :url="mapURL"></l-tile-layer>
      <l-image-overlay v-if="radarURL" :url="radarURL" :bounds="radarBounds"></l-image-overlay>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LImageOverlay } from "vue2-leaflet";
import RadarService from "../services/RadarService"

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
      radarURL: null,
      zoom: 9,
      center: [50.033333, 22],
      radarBounds: [[56.1865, 11.8129], [48.1334, 25.1576]],
    }    
  },
  async mounted() {
    const radarEntries = await RadarService.fetchRadarEntries()
    const radarEntry = radarEntries[radarEntries.length - 1]
    this.radarURL = radarEntry.url
  }
};
</script>

<style scoped>
</style>
