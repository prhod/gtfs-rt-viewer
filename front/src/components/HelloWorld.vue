<template>
  <v-container>
   <v-row>
      <v-col cols="3">
        <v-select
          :items="buckets"
          label="Outlined style"
          outlined
        ></v-select>
    <v-date-picker
      v-model="date"
      :allowed-dates="allowedDates"
      class="mt-4"
      min="2016-06-15"
      max="2018-03-20"
    ></v-date-picker>        
      </v-col>
      <v-col cols="6">
        <BBoxGlMap />
      </v-col>
       <v-col cols="3">
        <JsonViewer :value="jsonData"></JsonViewer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
import BBoxGlMap from "@/components/BBoxGlMap.vue"
import { mapState, mapActions } from "vuex";


export default {
  name: "HelloWorld",
  components: {JsonViewer, BBoxGlMap},

  data: () => ({
    trip: "qjhdfgjdsghds",
    jsonData: {}
  }),
   computed: {
    ...mapState(["buckets"])
  },
  methods: {
    ...mapActions(["getBuckets"]),
    doUpdate() {
      let url = "http://minio-poc-carto.rhod.ovh:81/buckets/sherbrookedata/gtfsrt/20200814/20200814-000004_tripUpdates.pb?format=json";
      let vue = this;
      fetch(url, {method: "GET"})
        .then(response => response.json())
        .then(response => vue.jsonData = response);
    }
  },
  created() {
    this.getBuckets();
  }
};
</script>
