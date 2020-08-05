<template>
  <div>
    <l-map class="map-view"
      :zoom="zoom"
      :center="center">
      <l-tile-layer :url="mapURL"></l-tile-layer>
      <l-image-overlay v-if="radarURL" :url="radarURL" :bounds="radarBounds" :opacity="0.5"></l-image-overlay>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LImageOverlay } from "vue2-leaflet";
import RadarService from "../services/RadarService"
import moment from "moment"

const FRAMES_DISPLAYED = 6
const FRAME_DELAY_SEC = 1
const DEFAULT_ZOOM = 9

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
      zoom: DEFAULT_ZOOM,
      center: [50.033333, 22],
      radarBounds: [[56.1865, 11.8129], [48.1334, 25.1576]],
      radarEntries: [],
      radarFrame: 1
    }    
  },
  methods: {
    async initCMaxData() {
      this.radarEntries = await RadarService.fetchRadarEntries()
      this.radarFrame = FRAMES_DISPLAYED
    },
    updateRadarURL() {
      const radarEntry = this.radarEntries[this.radarEntries.length - this.radarFrame]
      this.radarURL = radarEntry.url
      const ts = moment.unix(radarEntry.date)
      console.log("Radar ts =", ts.format())
    },
    startTimer() {
      setInterval(() => {
        this.radarFrame--
        if (this.radarFrame == 0) {
          this.radarFrame = FRAMES_DISPLAYED
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
