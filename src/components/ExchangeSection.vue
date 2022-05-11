<template>
  <section v-if="selectedCurrency" class="py-3">
    <div class="row">
      <div class="col">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            v-model="currencyAmount"
          />
          <select
            class="input-group-text"
            @change="changeCurrency($event)"
            v-model="selectedCurrency"
          >
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
      <div class="col">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control disabled"
            disabled
            :value="uahRate"
          />
          <span class="input-group-text">₴ Uah</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  ref,
  reactive,
  computed,
  onMounted,
  toRefs,
  defineComponent,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ExchangeSection",

  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const isDataExist = computed(() => store?.getters?.currienciesList?.length);

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

    const currencyAmount = ref(1);

    const uahRate = computed(
      () =>
        +store?.getters?.selectedCurrency?.purchaseRate * currencyAmount.value
    );
    return {
      selectedCurrency,
      currienciesList,
      currencyAmount,
      uahRate,
      store,
      isDataExist,
    };
  },
  methods: {
    changeCurrency(value) {
      console.log("currency change", value);
    },
  },
});
</script>
