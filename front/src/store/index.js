import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MapBoxToken: "pk.eyJ1IjoicHJob2QiLCJhIjoiY2o2Njh6dGl0MHV6azJxcXhmaTdhdnJ0dyJ9.mSLMtT6tbazdkZGcu3-gCA",
    MapGlStyle: "mapbox://styles/mapbox/streets-v11",
    Minio: "http://minio-poc-carto.rhod.ovh:81/",
    buckets: []
  },
  actions: {
    getBuckets({ state }) {
      fetch(state.Minio + `buckets`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(function (resp) {
          state.buckets = resp;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
})
