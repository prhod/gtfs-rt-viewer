<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"></v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
        <v-btn small color="primary" @click="doUpdate">GTFS RT</v-btn>
      </v-col>
    </v-row>
<v-row>
      <v-col class="mb-5" cols="12">
        <span>{{ trip }}</span>
        <JsonViewer :value="jsonData"></JsonViewer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
  name: "HelloWorld",
  components: {JsonViewer},

  data: () => ({
    trip: "qjhdfgjdsghds",
    jsonData: {}
  }),
  methods: {
    doUpdate() {
      this.trip = "updated";
      let url = "http://minio-poc-carto.rhod.ovh:81/buckets/sherbrookedata/gtfsrt/20200814/20200814-000004_tripUpdates.pb?format=json";
      let vue = this;
      fetch(url, {method: "GET"})
        .then(response => response.json())
        .then(response => vue.jsonData = response);
   }
  }
};
</script>
