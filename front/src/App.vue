<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

    <v-spacer></v-spacer>
        <h1 class="display-2 font-weight-bold mb-3">GTFS-RT viewer</h1>
    <v-spacer></v-spacer>

   </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
