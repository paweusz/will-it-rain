<template>
  <div class="location-button">
     <v-btn fab depressed color="rgba(0,0,0,.3)" @click="locate">
      <v-icon color="rgba(255, 255, 255, 0.7)" size="x-large">mdi-crosshairs-gps</v-icon>
    </v-btn>
    <v-snackbar v-model="showError" :top="true" :vertical="true" color="error">
      {{ locationError }}
      <template v-slot:action="{ attrs }"> 
        <v-btn dark text v-bind="attrs" @click="showError = false">Zamknij</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { VBtn, VIcon, VSnackbar } from 'vuetify/lib'

export default {
  name: "LocationButton",
  components: {
    VBtn,
    VIcon,
    VSnackbar
  },
  data() {
    return {
      locationError: null,
      showError: false,
    }
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
      switch (error.code) {
        case 1: 
          this.locationError = "Brak pozwolenia na lokalizację. Zmień uprawnienia."
          break
        case 2: 
          this.locationError = "Lokalizacja niedostępna"
          break
        case 3: 
          this.locationError = "Lokalizacja niedostępna"
          break
        default:
          this.locationError = "Błąd lokalizacji"
      }
      this.showError = true
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
