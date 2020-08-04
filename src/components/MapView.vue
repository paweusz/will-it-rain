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

const FRAMES_DISPLAYED = 6;
const FRAME_DELAY_SEC = 1;

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
      radarEntries: [],
      radarFrame: 1
    }    
  },
  methods: {
    async initCMaxData() {
      this.radarEntries = await RadarService.fetchRadarEntries()
      this.radarFrame = 1
    },
    updateRadarURL() {
      this.radarURL = this.radarEntries[this.radarEntries.length - this.radarFrame].url
    },
    startTimer() {
      setInterval(() => {
        this.radarFrame++
        if (this.radarFrame > FRAMES_DISPLAYED) {
          this.radarFrame = 1
        }
        this.updateRadarURL()
      }, FRAME_DELAY_SEC * 1000);
    }
  },
  async mounted() {
    await this.initCMaxData()
    this.updateRadarURL()
    this.startTimer()
  }
};
</script>

<style scoped>
</style>
