<template>
    <div class="map-view__slider-box">
      <v-slider class="map-view__slider" :vertical="true" :tick-labels="hours" :max="maxIndex" :disabled="!valid"
        v-model="index" @start="onMouseDown()" @mouseup="onMouseUp()"
        color="#64b5f6" track-color="#b6b6b7" tick-size="0" thumb-color="#9be7ff"></v-slider>
    </div>
</template>

<script>
import moment from 'moment'
import { VSlider } from 'vuetify/lib'

const DELAY_SEC = 1

export default {
  name: 'TimeSlider',
  components: {
    VSlider
  },
  props: {
    timestamps: Array,
  },
  data() {
    return {
      index: 0,
      timerOn: true
    }
  },
  computed: {
    valid() {
      return this.timestamps.length != 0
    },
    hours() {
      const timestamps = this.valid ? this.timestamps : this.calculateTimestamps(moment())
      return timestamps.map(ts => this.formatHour(ts))
    },
    maxIndex() {
      return this.hours.length - 1
    }
  },
  watch: {
    index() {
      this.sliderChanged()
    },
  },
  methods: {
    formatHour(ts) {
      return moment.unix(ts).local().format('HH:mm')
    },
    tick() {
      if (!this.timerOn || !this.valid) {
        return
      }

      this.index++
      if (this.index >= this.hours.length) {
        this.index = 0
      }
    },
    startTimer() {
      return setInterval(this.tick, DELAY_SEC * 1000);
    },
    sliderChanged() {
      this.$emit('change', this.index)
    },
    onMouseDown() {
      this.timerOn = false
    },
    onMouseUp() {
      this.timerOn = true
    },
    calculateTimestamps(ts) {
      const result = []

      const now = moment(ts)
      const before = now.startOf('minute').subtract(now.minute() % 10, 'minutes')
      for (let i = 0; i < 7; i++) {
        result.push(before.unix())
        before.subtract(10, 'minutes')
      }

      return result.reverse()
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

.map-view__slider-box {
  margin-top: 12px;
  border-radius: 8px;
  background-color: #f5f5f6;
  width: 80px;
  height: 192px;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
</style>
