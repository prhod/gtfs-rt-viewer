<template>
  <div style="height:100%; width:100%; min-height: 800px">
    <MglMap
      :access-token="MapBoxToken"
      :map-style="MapGlStyle"
      @load="onMapLoaded"
      @moveend="onMapChange"
    >
      <MglNavigationControl position="top-right" />
      <MglMarker
        v-for="item in gtfsrt_VP.entity"
        :key="item.id"
        :coordinates="[item.vehicle.position.longitude, item.vehicle.position.latitude]"
        color="blue"
      />
    </MglMap>
  </div>
</template>

<script>
    import { MglMap, MglNavigationControl, MglMarker } from "vue-mapbox";
    import Mapbox from "mapbox-gl";
    import { mapState } from "vuex";

    export default {
        components: {
            MglMap,
            MglNavigationControl,
            MglMarker
        },
        data: () => ({
            bounds : false,
        }),
        computed: {
            ...mapState(["MapBoxToken", "MapGlStyle", "gtfsrt_VP"])
        },
        watch: {
            bbox: function() {
                this.refreshMap();
            },
            gtfsrt_VP: function() {
                var coordinates = this.gtfsrt_VP.entity.map(e => [e.vehicle.position.longitude, e.vehicle.position.latitude]);
                var bounds = coordinates.reduce(function(bounds, coord) {
                    return bounds.extend(coord);
                }, new Mapbox.LngLatBounds(coordinates[0], coordinates[0]));
                this.bounds = bounds;
                this.map.fitBounds(bounds, {padding: 20});
            }
        },
        created() {
            this.map = null;
        },
        methods: {
            onMapChange() {
            },
            onMapLoaded(event) {
                this.map = event.map;
                this.refreshMap();
            },
            refreshMap: function() {
            }
        }
    };
</script>

<style lang="scss" scoped>
.map {
  width: 500px;
  height: 500px;
}
</style>
