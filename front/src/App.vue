<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer />
      <h1 class="display-2 font-weight-bold mb-3">
        GTFS-RT viewer
      </h1>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
    import Home from './components/Home'

    export default {
        name: 'App',

        components: {
            Home
        },

        data: () => ({
            //
        })
    };
</script>
