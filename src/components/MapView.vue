<template>
  <div class="map-view">
    <v-overlay :value="!isOverlayLoaded" opacity="0.4" :z-index="500">
      <v-progress-circular :width="15" color="#9be7ff" size='100' :indeterminate='true'></v-progress-circular>
    </v-overlay>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="{zoomControl: false, attributionControl: false}"
      :maxBounds="maxBounds"
      :minZoom="6"
      @update:center="onCenterUpdated"
      @update:zoom="onZoomUpdated">
      <l-tile-layer :url="mapURL"></l-tile-layer>
      <l-image-overlay @ready="hideOverlay" v-if="radarURL" :url="radarURL" :bounds="radarBounds" :opacity="0.5"></l-image-overlay>
      <l-control-attribution position="bottomleft"></l-control-attribution>
      <l-control-scale position="topright" :imperial="false" :metric="true"></l-control-scale>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>
    <div class='map-view__hold'>
      <location-button class="map-view__location-button" @located="onLocated($event)"></location-button>
      <time-slider :timestamps="radarHours" @change="onSliderChange($event)"></time-slider>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LImageOverlay, LControlAttribution, LControlScale, LMarker } from 'vue2-leaflet';
import TimeSlider from './TimeSlider'
import LocationButton from './LocationButton'
import { eventBus } from './EventBus'

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
    LControlAttribution,
    LControlScale,
    LMarker,
  },
  data() {
    return {
      mapURL: 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png',
      radarURL: null,
      zoom: DEFAULT_ZOOM,
      center: [52.2297, 21.0122],
      radarBounds: [[56.1865, 11.8129], [48.1334, 25.1576]],
      maxBounds: this.radarBounds,
      radarEntries: [],
      radarFrame: 0,
      radarHours: [],
      markerLatLng: { lat: 52.2297, lon: 21.0122 },
      isOverlayLoaded: false
    }    
  },
  methods: {
    async initRadarData() {
      try {
        this.radarEntries = await this.$axios.get('/sri').then(result => result.data).then(data => data.slice(-FRAMES_DISPLAYED))
        this.radarEntries.map(entry => new Image().src = this.getRadarURL(entry))
        this.radarHours = this.radarEntries.map(entry => entry.date)
      } catch (error) {
        console.log('Error loading radar data', error)
        eventBus.$emit('error', 'Nie udało się skontaktować z serwerem map radarowych. Spróbuj później.')
      }
    },
    updateRadarImage() {
      const radarEntry = this.radarEntries[this.radarFrame]
      if (radarEntry) {
        this.radarURL = this.getRadarURL(radarEntry)
      }
    },
    getRadarURL(radarEntry) {
      return radarEntry.url.replace(/^http:/, 'https:')
    },
    onSliderChange(event) {
      this.radarFrame = event
      this.updateRadarImage()
    },
    onLocated(event) {
      const that = this
      this.maxBounds = null

      setTimeout(() => {
        this.center = [event.latitude, event.longitude]
        this.markerLatLng = { lat: event.latitude, lon: event.longitude }
      }, 0)
      
      setTimeout(() => {
        that.zoom = DEFAULT_ZOOM
      }, 500)

      setTimeout(() => {
        that.maxBounds = that.radarBounds
      }, 1000)
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
    onVisibilityChange() {
      const visible = !document.hidden
      if (visible) {
        this.initRadarData()
      }
    },
    hideOverlay() {
        this.isOverlayLoaded = true
    }
  },
  async mounted() {
    await this.initRadarData()
    this.updateRadarImage()
    this.timerHandle = this.startTimer()
    document.addEventListener("visibilitychange", this.onVisibilityChange, false);
  },
  beforeDestroy() {
    document.removeEventListener("visibilitychange", this.onVisibilityChange)
    clearInterval(this.timerHandle)
  }
};
</script>

<style>

.map-view {
  position: relative;
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
