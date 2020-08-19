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

    const ctrlPoint = new MapboxGLButtonControl({
        className: "mapbox-gl-draw_point",
        title: "Draw Point",
        eventHandler: one
    });
    class MapboxGLButtonControl {
        constructor({
            className = "",
            title = "",
            eventHandler = evtHndlr
        }) {
            this._className = className;
            this._title = title;
            this._eventHandler = eventHandler;
        }

        onAdd() {
            this._btn = document.createElement("button");
            this._btn.className = "mapboxgl-ctrl-icon" + " " + this._className;
            this._btn.type = "button";
            this._btn.title = this._title;
            this._btn.onclick = this._eventHandler;

            this._container = document.createElement("div");
            this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
            this._container.appendChild(this._btn);

            return this._container;
        }

        onRemove() {
            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
        }
    }

function one(event) {
  alert("Event handler when clicking on \r\n" + event.target.className);
  console.log("event number 1", event);
}

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
                this.map.addControl(ctrlPoint, "bottom-left");
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
