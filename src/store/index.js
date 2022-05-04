import { createStore } from 'vuex'
import axios from "axios"

const GLOBAL_URL = function(){
  let corsanywhere = "https://corsanywhere.herokuapp.com";
  return process.env.NODE_ENV === "production"
              ? `${corsanywhere}/https://api.privatbank.ua/p24api/exchange_rates`
              : `/api/exchange_rates`
}

export default createStore({
  state: {
    exchangeRate: {},
    date: null,
    req_params: {}
  },
  getters: {
    getExchangeRate: (state) => state.exchangeRate,
    getExchangeDate: (state) => state.date,
  },
  mutations: {
    SET_RESPONSE_DATA(state, response) {
      state.exchangeRate = response.exchangeRate;
      state.date = response.date;
    }
  },
  actions: {
    async fetchExchangeRate({ commit }, date) {
      let url = GLOBAL_URL();
          
      return await axios.get(url, {
          params:{
            "json" : true,
            "date": date
          }
        })
        .then(r => {
          commit('SET_RESPONSE_DATA', r.data);
          return r
        })
    }
  }
})