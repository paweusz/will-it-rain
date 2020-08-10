<template>
  <div class="location-button">
     <v-btn fab color="#9be7ff" @click="locate()">
      <v-icon size="x-large">mdi-crosshairs-gps</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { VBtn, VIcon } from 'vuetify/lib'

export default {
  name: "LocationButton",
  components: {
    VBtn,
    VIcon,
  },
  methods: {
    locate() {
      navigator.geolocation.getCurrentPosition(this.onLocationSuccess, this.onLocationError)
    },
    onLocationSuccess(position) {
      this.$emit('located', position.coords)
    },
    onLocationError(error) {
      console.log("Error locating", error)
    },
  },
  mounted() {
    this.locate()
  },
}
</script>

<style>
</style>
