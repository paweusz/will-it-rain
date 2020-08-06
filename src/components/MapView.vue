<template>
  <div class="map-view">
    <l-map
      :zoom="zoom"
      :center="center">
      <l-tile-layer :url="mapURL"></l-tile-layer>
      <l-image-overlay v-if="radarURL" :url="radarURL" :bounds="radarBounds" :opacity="0.5"></l-image-overlay>
    </l-map>
    <div class="map-view__slider-box">
      <v-slider class="map-view__slider" :vertical="true" :tick-labels="radarHours" :max="radarEntries.length - 1" v-model="radarFrame" 
        color="#64b5f6" track-color="#2286c3" tick-size="0"></v-slider>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LImageOverlay } from "vue2-leaflet";
import moment from "moment"
import { VSlider } from "vuetify/lib"

const FRAMES_DISPLAYED = 7
const FRAME_DELAY_SEC = 1
const DEFAULT_ZOOM = 9

export default {
  name: "MapView",
  components: {
    LMap,
    LTileLayer,
    LImageOverlay,
    VSlider
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
    formatHour(ts) {
      return moment.unix(ts).local().format("HH:mm")
    },
    async initCMaxData() {
      this.radarEntries = await this.$axios.get("/cmax").then(result => result.data).then(data => data.slice(-FRAMES_DISPLAYED))
      this.radarFrame = 0
      this.radarHours = this.radarEntries.map(entry => this.formatHour(entry.date))
    },
    updateRadarImage() {
      const radarEntry = this.radarEntries[this.radarFrame]
      this.radarURL = radarEntry.url
      // console.log("Radar ts =", this.formatHour(radarEntry.date))
    },
    startTimer() {
      return setInterval(() => {
        this.radarFrame++
        if (this.radarFrame == this.radarEntries.length) {
          this.radarFrame = 0
        }
        this.updateRadarImage()
      }, FRAME_DELAY_SEC * 1000);
    }
  },
  async mounted() {
    await this.initCMaxData()
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

.map-view__slider {
  padding-right: 48px;
}

.map-view__slider .v-slider__tick-label {
  color: rgb(255,255,255,0.87);
}

.map-view__slider-box {
  position: fixed;
  border-radius: 8px;
  background-color: rgba(0,0,0,.3);
  right: 8px;
  bottom: 8px;
  z-index: 400;
  width: 80px;
  height: 192px;
  display: flex;
  align-items: center;
}

.leaflet-right {
  display: none;
}

</style>
