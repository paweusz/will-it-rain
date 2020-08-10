<template>
  <div class="map-view">
    <l-map
      :zoom="zoom"
      :center="center"
      @update:center="onCenterUpdated"
      @update:zoom="onZoomUpdated">
      <l-tile-layer :url="mapURL"></l-tile-layer>
      <l-image-overlay v-if="radarURL" :url="radarURL" :bounds="radarBounds" :opacity="0.5"></l-image-overlay>
    </l-map>
    <div class='map-view__hold'>
      <location-button class="map-view__location-button" @located="onLocated($event)"></location-button>
      <time-slider :timestamps="radarHours" @change="onSliderChange($event)"></time-slider>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LImageOverlay } from 'vue2-leaflet';
import TimeSlider from './TimeSlider'
import LocationButton from './LocationButton'

const FRAMES_DISPLAYED = 7
const DEFAULT_ZOOM = 9
const UPDATE_FREQUENCY = 60

export default {
  name: 'MapView',
  components: {
    LMap,
    LTileLayer,
    LImageOverlay,
    TimeSlider,
    LocationButton,
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
    onLocated(event) {
      this.center = [event.latitude, event.longitude]
      this.zoom = DEFAULT_ZOOM
    },
    onCenterUpdated(newCenter) {
      this.center = newCenter
    },
    onZoomUpdated(newZoom) {
      this.zoom = newZoom
    },
    startTimer() {
      return setInterval(this.initRadarData, UPDATE_FREQUENCY * 1000);
    },
  },
  async mounted() {
    await this.initRadarData()
    this.updateRadarImage()
    this.timerHandle = this.startTimer()
  },
  beforeDestroy() {
    clearInterval(this.timerHandle)
  }
};
</script>

<style>

.map-view {
  position: relative;
}

.leaflet-right {
  display: none;
}

.map-view__hold {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 400;
}
</style>
