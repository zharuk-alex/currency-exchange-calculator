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
    exchangeRate: [],
    date: null,
    selectedCurrency: {},
    exchangeType: [
      {text: "purchase", value: "purchaseRate"},
      {text: "sale", value: "saleRate"}
    ]
  },
  getters: {
    exchangeRate: (state) => state.exchangeRate,
    exchangeDate: (state) => state.date,
    currienciesList: (state) => state.exchangeRate.filter(currency=> +currency.purchaseRate ? currency.currency : false),
    selectedCurrency: (state) => state.selectedCurrency,
    exchangeType: (state) => state.exchangeType,
  },
  mutations: {
    SET_RESPONSE_DATA(state, response) {
      state.exchangeRate = response.exchangeRate.filter(currency=>currency?.saleRate);
      state.date = response.date;
      state.selectedCurrency = state.exchangeRate.find(currency => currency.currency.toLowerCase() == "usd") || state.exchangeRate[0]
    },
    SET_SELECTED_CURRENCY(state, currency){
      state.selectedCurrency = currency
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