<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col :cols="2">
        <v-select
          :items="buckets"
          label="Bucket"
          outlined
          @change="bucketChange"
        />
        <v-select
          :items="gtfsrt_dates"
          label="Available dates"
          outlined
          @change="dateChange"
        />
        <v-select
          :items="gtfsrt_times"
          label="Instants"
          outlined
          @change="instantChange"
        />
      </v-col>
      <v-col :cols="7">
        <BBoxGlMap />
      </v-col>
      <v-col :cols="3">
        <v-tabs
          v-model="tabs"
        >
          <v-tab key="TU">
            TripUpdates
          </v-tab>
          <v-tab key="VP">
            VehiclePositions
          </v-tab>
          <v-tab-item key="TU">
            <v-card style="max-height: 750px; overflow: scroll">
              <JsonViewer
                :value="gtfsrt_TU"
                :expand-depth="4"
              />
            </v-card>
          </v-tab-item>
          <v-tab-item key="VP">
            <v-card style="max-height: 750px; overflow: scroll">
              <JsonViewer
                :value="gtfsrt_VP"
                :expand-depth="4"
              />
            </v-card>
          </v-tab-item>
        </v-tabs>
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
            tab: false,
            jsonData: {},
            date: new Date().toISOString().substr(0, 10)
        }),
        computed: {
            ...mapState(["buckets", "currentBucket", "gtfsrt_dates", "gtfsrt_times", "gtfsrt_TU", "gtfsrt_VP"])
        },
        created() {
            this.getBuckets();
        },
        methods: {
            ...mapActions(["getBuckets", "getGtfsRTDates", "setCurrentBucket", "setCurrentDate", "setCurrentFile"]),
            doUpdate() {
                let url = "http://minio-poc-carto.rhod.ovh:81/buckets/sherbrookedata/gtfsrt/20200814/20200814-000004_tripUpdates.pb?format=json";
                let vue = this;
                fetch(url, {method: "GET"})
                    .then(response => response.json())
                    .then(response => vue.jsonData = response);
            },
            allowedDates: function(val) {
                console.log(val);
                return true;
            },
            bucketChange: function(val) {
                this.setCurrentBucket(val)
            },
            dateChange: function(val) {
                this.setCurrentDate(val)
            },
            instantChange: function(val){
                this.setCurrentFile(val)
            }
        }
    };
</script>
