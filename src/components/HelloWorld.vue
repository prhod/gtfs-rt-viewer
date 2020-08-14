<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
<v-btn small color="primary" @click="doUpdate">GTFS RT</v-btn>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <span>{{ trip }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      trip: "qjhdfgjdsghds",
    }),
    methods: {
      doUpdate() {
        this.trip = "updated"
      }
    }
  }
</script>
