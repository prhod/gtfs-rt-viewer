<template>
  <v-dialog v-model="active" persistent max-width="800px">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>BBox edition</v-card-title>
      <div style="min-heigth:500px,  width:500px">
        <MglMap
          :accessToken="MapBoxToken"
          :mapStyle="MapGlStyle"
          class="map"
          @load="onMapLoaded"
          @moveend="onMapChange"
        />
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="onBboxCancel">Cancel</v-btn>
        <v-btn color="primary" @click="onBboxSave">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { MglMap } from "vue-mapbox";

export default {
  components: {
    MglMap
  },
  props: ["active", "bbox"],
  data() {
    return {
      l_bbox: false,
      MapGlStyle: "mapbox://styles/mapbox/streets-v11"
    };
  },
  methods: {
    onMapChange() {
      this.l_bbox = this.map.getBounds();
    },
    onMapLoaded(event) {
      this.map = event.map;
      this.refreshMap();
      this.l_bbox = this.map.getBounds();
    },
    onBboxSave: function() {
      this.$emit("update", this.l_bbox.toArray());
    },
    onBboxCancel: function() {
      this.$emit("close");
    },
    refreshMap: function(){
      if (this.bbox &&this.map) {
        var sourceObject = this.map.getSource('bbox');
        var data = {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [[
                  [this.bbox[0][0], this.bbox[0][1]],
                  [this.bbox[1][0], this.bbox[0][1]],
                  [this.bbox[1][0], this.bbox[1][1]],
                  [this.bbox[0][0], this.bbox[1][1]],
                  [this.bbox[0][0], this.bbox[0][1]]
                ]]
              }
            };
        if (!sourceObject) {
          let source = {
            type: "geojson",
            data: data
          };
          this.map.addSource("bbox", source);
          this.map.addLayer({
            id: "bbox",
            type: "fill",
            source: "bbox",
            layout: {},
            paint: {
              "fill-color": "#088",
              "fill-opacity": 0.8
            }
          });
        } else {
          sourceObject.setData(data);
        }
        this.map.fitBounds(this.bbox);
      }      
    }
  },
  created() {
    this.map = null;
  },
  watch: {
    bbox: function() {
      this.refreshMap();
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
