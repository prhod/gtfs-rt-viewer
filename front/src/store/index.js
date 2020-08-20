import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MapBoxToken: "pk.eyJ1IjoicHJob2QiLCJhIjoiY2o2Njh6dGl0MHV6azJxcXhmaTdhdnJ0dyJ9.mSLMtT6tbazdkZGcu3-gCA",
    MapGlStyle: "mapbox://styles/mapbox/streets-v11",
    Minio: "http://minio-poc-carto.rhod.ovh:81/",
    buckets: [],
    currentBucket: "",
    currentDate: "",
    currentTime: "",
    gtfsrt_dates: [],
    gtfsrt_times: [],
    gtfsrt_TU : "",
    gtfsrt_VP : "",
    previous_gtfsrt_VP : "",
    movements: []
  },
  mutations: {
    setCurrentBucket(state, val) {
        state.currentBucket = val;
    },
    setCurrentDate(state, val) {
        state.currentDate = val;
    },
    setCurrentFile(state, val) {
        state.currentTime = val;
    }
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
    },
    setCurrentBucket({ commit, dispatch }, val) {
        commit('setCurrentBucket', val);
        dispatch('getGtfsRTDates');
    },
    setCurrentDate({ commit, dispatch }, val) {
        commit('setCurrentDate', val);
        if (val != "") {
            dispatch('getGtfsRTTimes');
        }
    },
    setCurrentFile({ commit, dispatch }, val) {
        commit('setCurrentFile', val);
        if (val != "") {
            dispatch('getSelectedGtfsRT');
        }
    },
    getGtfsRTDates({ state }) {
      fetch(state.Minio + `buckets/${state.currentBucket}/gtfsrt/`)
        .then(response => response.json())
        .then(response => {
          state.gtfsrt_dates = response.map(o => o.name.split('/')[1]);
       })
    },
    getGtfsRTTimes({ state }) {
      if (state.currentBucket && state.currentDate) {
        fetch(state.Minio + `buckets/${state.currentBucket}/gtfsrt/${state.currentDate}/`)
          .then(response => response.json())
          .then(response => {
            state.gtfsrt_times = response.map(o => o.name.split('/')[2].substring(9, 15));
            state.gtfsrt_times = [...new Set(state.gtfsrt_times)];
         })
      }
    },
    getSelectedGtfsRT({ state, dispatch }) {
      state.gtfsrt_TU = "";
      state.gtfsrt_VP = "";
      if (state.currentBucket && state.currentDate) {
        fetch(state.Minio + `buckets/${state.currentBucket}/gtfsrt/${state.currentDate}/${state.currentDate}-${state.currentTime}_vehiclePositions.pb?format=json`)
          .then(response => response.json())
          .then(response => {
            state.gtfsrt_VP = response;
          });
        fetch(state.Minio + `buckets/${state.currentBucket}/gtfsrt/${state.currentDate}/${state.currentDate}-${state.currentTime}_tripUpdates.pb?format=json`)
          .then(response => response.json())
          .then(response => {
            state.gtfsrt_TU = response;
        });
        dispatch('getPreviousGtfsRT');
      }
    },
    getPreviousGtfsRT({ state, dispatch }) {
      state.previous_gtfsrt_VP = "";
      let idx = state.gtfsrt_times.indexOf(state.currentTime);
      idx -= 1;
      if (idx >= 0) {
        let previousTime = state.gtfsrt_times[idx];
        fetch(state.Minio + `buckets/${state.currentBucket}/gtfsrt/${state.currentDate}/${state.currentDate}-${previousTime}_vehiclePositions.pb?format=json`)
          .then(response => response.json())
          .then(response => {
            state.previous_gtfsrt_VP = response;
            dispatch('computeMovements');
        });
      }
    },
    computeMovements({ state }) {
      let mooves = [];
      for (let i in state.gtfsrt_VP.entity) {
        let e = state.gtfsrt_VP.entity[i];
        let prevEntity = state.previous_gtfsrt_VP.entity.find(obj => obj.id == e.id && obj.vehicle.trip.trip_id == e.vehicle.trip.trip_id);
        if (prevEntity) {
          mooves.push([
            [prevEntity.vehicle.position.longitude, prevEntity.vehicle.position.latitude],
            [e.vehicle.position.longitude, e.vehicle.position.latitude]
          ]);
        }
      }
      state.movements = mooves;
    }
  }
})
