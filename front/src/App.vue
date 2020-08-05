<template>
  <div id="app">
    <map-view class="app__map-view"/>
  </div>
</template>

<script>
import MapView from './components/MapView.vue'

export default {
  name: 'Chmurki',
  components: {
    MapView
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
