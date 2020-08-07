<template>
  <div class="map-view">
    <l-map
      :zoom="zoom"
      :center="center">
      <l-tile-layer :url="mapURL"></l-tile-layer>
      <l-image-overlay v-if="radarURL" :url="radarURL" :bounds="radarBounds" :opacity="0.5"></l-image-overlay>
    </l-map>
    <time-slider :timestamps="radarHours" @change="onSliderChange($event)"></time-slider>
  </div>
</template>

<script>
import { LMap, LTileLayer, LImageOverlay } from "vue2-leaflet";
import TimeSlider from "./TimeSlider"

const FRAMES_DISPLAYED = 7
const DEFAULT_ZOOM = 9

export default {
  name: "MapView",
  components: {
    LMap,
    LTileLayer,
    LImageOverlay,
    TimeSlider
  },
  data() {
    return {
      mapURL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      radarURL: null,
      zoom: DEFAULT_ZOOM,
      center: [50.033333, 22],
      radarBounds: [[56.1865, 11.8129], [48.1334, 25.1576]],
      radarEntries: [],
      radarFrame: 0,
      radarHours: [],
    }    
  },
  methods: {
    async initRadarData() {
      this.radarEntries = await this.$axios.get('/cmax').then(result => result.data).then(data => data.slice(-FRAMES_DISPLAYED))
      this.radarHours = this.radarEntries.map(entry => entry.date)
    },
    updateRadarImage() {
      const radarEntry = this.radarEntries[this.radarFrame]
      this.radarURL = radarEntry.url
    },
    onSliderChange(event) {
      this.radarFrame = event
      this.updateRadarImage()
    },
  },
  async mounted() {
    await this.initRadarData()
    this.updateRadarImage()
  },
};
</script>

<style>
.map-view {
  position: relative;
}

.leaflet-right {
  display: none;
}
</style>
