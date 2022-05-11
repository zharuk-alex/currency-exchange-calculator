<template>
  <section v-if="selectedCurrency" class="py-3">
    <div class="row">
      <div class="col-12 col-sm">
        <div class="input-group mb-3">
          <input
            inputmode="numeric"
            type="number"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            class="form-control"
            aria-label="Amount"
            v-model="currencyAmount"
          />
          <select class="input-group-text" v-model="selectedCurrency">
            <option
              v-for="({ currency }, index) in currienciesList"
              :value="currency"
              :key="index"
            >
              {{ currency }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-12 col-sm">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control disabled"
            disabled
            :value="uahRate"
          />
          <span class="input-group-text">₴ UAH</span>
          <select class="form-select" v-model="selectedType">
            <option
              v-for="(type, index) in exchangeType"
              :value="type.value"
              :key="index"
            >
              {{ type.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ExchangeSection",

  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const isDataExist = computed(() => store?.getters?.currienciesList?.length);

    const exchangeType = store.getters.exchangeType;
    const currencyAmount = ref(1);

    const selectedType = ref(exchangeType[0].value);

    const currienciesList = computed(() =>
      store?.getters?.currienciesList.length
        ? store?.getters?.currienciesList
        : []
    );

    const selectedCurrency = computed({
      get() {
        return store?.getters?.selectedCurrency?.currency;
      },
      set(newValue) {
        let newCurrency = store.getters.exchangeRate.find(
          (currency) =>
            currency.currency?.toLowerCase() == newValue.toLowerCase()
        );

        store.commit("SET_SELECTED_CURRENCY", newCurrency || {});
      },
    });

    const uahRate = computed(() => {
      let rate = selectedType.value;
      return (
        +store?.getters?.selectedCurrency[rate] * currencyAmount.value
      ).toFixed(2);
    });

    return {
      selectedCurrency,
      currienciesList,
      currencyAmount,
      uahRate,
      store,
      isDataExist,
      selectedType,
      exchangeType,
    };
  },
});
</script>
<style scoped>
section {
  border-bottom: 1px solid #e5e5e5;
}
.input-group-text {
  width: 80px;
}
</style>