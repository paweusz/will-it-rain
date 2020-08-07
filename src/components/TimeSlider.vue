<template>
    <div class="map-view__slider-box">
      <v-slider class="map-view__slider" :vertical="true" :tick-labels="hours" :max="maxIndex" 
        v-model="index" @change="sliderChanged()"
        color="#64b5f6" track-color="#2286c3" tick-size="0"></v-slider>
    </div>
</template>

<script>
import moment from "moment"
import { VSlider } from "vuetify/lib"

const DELAY_SEC = 1

export default {
  name: "TimeSlider",
  components: {
    VSlider
  },
  props: {
    timestamps: Array,
  },
  data() {
    return {
      index: 0,
    }
  },
  computed: {
    hours() {
      return this.timestamps.map(ts => this.formatHour(ts))
    },
    maxIndex() {
      return this.timestamps.length > 0 ? this.timestamps.length - 1 : 0
    }
  },
  methods: {
    formatHour(ts) {
      return moment.unix(ts).local().format("HH:mm")
    },
    tick() {
      this.index++
      if (this.index >= this.hours.length) {
        this.index = 0
      }
      this.sliderChanged()
    },
    startTimer() {
      return setInterval(this.tick, DELAY_SEC * 1000);
    },
    sliderChanged() {
      this.$emit("change", this.index)
    }
  },
  async mounted() {
    this.timerHandle = this.startTimer()
  },
  beforeDestroy() {
    clearInterval(this.timerHandle)
  }
};
</script>

<style>
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
</style>
