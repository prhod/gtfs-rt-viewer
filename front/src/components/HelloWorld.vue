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
var Minio = require("minio");
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
      var minioClient = new Minio.Client({
        endPoint: "minio-poc-carto.rhod.ovh",
        port: 81,
        useSSL: false,
        accessKey: "minioaccess",
        secretKey: "miniosecret"
      });
      minioClient.listBuckets(function(err, buckets) {
        if (err) return console.log(err);
        console.log("buckets :", buckets);
      });
      var size = 0;
      var content = "";
      var vue_context = this;
      minioClient.getObject("sherbrookedata", "gtfsrt/20200815-161502_vehiclePositions.json", function(err, dataStream) {
        if (err) {
          return console.log(err);
        }
        dataStream.on("data", function(chunk) {
          size += chunk.length;
          content += chunk.toString('ascii');
        });
        dataStream.on("end", function() {
          vue_context.jsonData = JSON.parse(content);
          console.log(this.jsonData);
          vue_context.trip = "updated avec le JSON";
         console.log("End. Total size = " + size);
        });
        dataStream.on("error", function(err) {
          console.log(err);
        });
      });
    }
  }
};
</script>
