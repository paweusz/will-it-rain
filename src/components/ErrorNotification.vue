<template>
  <v-snackbar v-model="showError" :top="true" :vertical="true" color="error">
    {{ errorMessage }}
    <template v-slot:action="{ attrs }"> 
      <v-btn dark text v-bind="attrs" @click="showError = false">Zamknij</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { VBtn, VSnackbar } from 'vuetify/lib'
import { eventBus } from './EventBus'

export default {
  name: "ErrorNotification",
  components: {
    VBtn,
    VSnackbar
  },
  data() {
    return {
      errorMessage: null,
      showError: false,
    }
  },
  methods: {
    onError(error) {
      this.errorMessage = error
      this.showError = true
    },
  },
  mounted() {
    eventBus.$on('error', this.onError)
  },
}
</script>

<style>
</style>
