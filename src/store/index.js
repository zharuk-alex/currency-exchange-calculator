import { createStore } from 'vuex'
import axios from "axios"
import moment from "moment"

const GLOBAL_URL = function(date){
  let corsanywhere = "https://corsanywhere.herokuapp.com";
  return process.env.NODE_ENV === "production"
              ? `${corsanywhere}/https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`
              : `/api/exchange_rates?json&date=${date}`
}

export default createStore({
  state: {
    exchange_rate: null,
    req_params: {}
  },
  getters: {
    getExchangeRate: (state) => state.exchange_rate,
    getReqParams: (state) => state.req_params,
  },
  mutations: {
    SET_EXCHANGE_RATE(state, exchange_rate) {
      state.exchange_rate = exchange_rate
    },
    SET_REQ_PARAMS(state, params){
      state. req_params = params;
    }
  },
  actions: {
    async fetchExchangeRate({ commit }, { date, currency }) {
      
      if(!moment(date, 'DD.MM.YYYY').isValid()){
        console.error("incorrect date formate. It should be DD.MM.YYYY", date);
        return false;
      }

      try {
        let options = {
          url: GLOBAL_URL(date),
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        return await axios(options)
          .then(r => {
            let { exchangeRate } = r.data;
            return exchangeRate.filter((item)=>'currency' in item && item.currency == currency)[0];
          })
          .then((r)=>{
            commit('SET_EXCHANGE_RATE', r);
            return true;
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
})