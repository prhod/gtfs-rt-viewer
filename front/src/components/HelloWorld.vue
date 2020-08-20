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
          v-model="selectedTime"
          outlined
        />
        <v-row>
          <v-col>
            <v-btn style="width: 100%;" @click="goToPrevFile">Previous</v-btn>
          </v-col>
           <v-col>
            <v-btn style="width: 100%;" @click="goToNextFile">Next</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="7">
        <BBoxGlMap />
      </v-col>
      <v-col :cols="3">
        <v-tabs
          v-model="tab"
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
    import BBoxGlMap from '@/components/BBoxGlMap.vue'
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'HelloWorld',
        components: { JsonViewer, BBoxGlMap },

        data: () => ({
            tab: false,
            jsonData: {},
            selectedTime: "",
            date: new Date().toISOString().substr(0, 10)
        }),
        computed: {
            ...mapState(['buckets', 'currentBucket', 'currentTime', 'gtfsrt_dates', 'gtfsrt_times', 'gtfsrt_TU', 'gtfsrt_VP'])
        },
        watch: {
            selectedTime: function(val) {
                if (val != "") {
                    this.setCurrentFile(val);
                }
            }
        },
        created () {
            this.getBuckets()
        },
        methods: {
            ...mapActions(['getBuckets', 'getGtfsRTDates', 'setCurrentBucket', 'setCurrentDate', 'setCurrentFile']),
            bucketChange: function (val) {
                this.setCurrentBucket(val)
            },
            dateChange: function (val) {
                this.setCurrentDate(val)
            },
            goToPrevFile: function() {
                let idx = this.gtfsrt_times.indexOf(this.currentTime);
                if (idx > 0) {
                    this.selectedTime = this.gtfsrt_times[idx-1];
                }
            },
            goToNextFile: function() {
                let idx = this.gtfsrt_times.indexOf(this.currentTime);
                if (idx < this.gtfsrt_times.length) {
                    this.selectedTime = this.gtfsrt_times[idx+1];
                }
            }
        }
    };
</script>
