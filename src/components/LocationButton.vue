<template>
  <div class="location-button">
     <v-btn fab color="#64b5f6" @click="locate">
      <v-icon size="x-large">mdi-crosshairs-gps</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { VBtn, VIcon } from 'vuetify/lib'
import { eventBus } from './EventBus'

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

      let locationError
      switch (error.code) {
        case 1: 
          locationError = "Brak pozwolenia na lokalizację. Zmień uprawnienia."
          break
        case 2: 
          locationError = "Lokalizacja niedostępna"
          break
        case 3: 
          locationError = "Lokalizacja niedostępna"
          break
        default:
          locationError = "Błąd lokalizacji"
      }
      eventBus.$emit('error', locationError)
    },
  },
  mounted() {
    this.locate()
  },
}
</script>

<style>
.location-button .v-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
  opacity: 0;
}
</style>
