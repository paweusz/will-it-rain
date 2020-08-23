<template>
  <div id="app">
    <v-app>
      <error-notification></error-notification>
      <map-view class="app__map-view"/>
    </v-app>
  </div>
</template>

<script>
import MapView from './components/MapView.vue'
import ErrorNotification from './components/ErrorNotification'
import { VApp } from "vuetify/lib"

export default {
  name: 'App',
  components: {
    MapView,
    VApp,
    ErrorNotification,
  }
}
</script>

<style>
.app__map-view {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
