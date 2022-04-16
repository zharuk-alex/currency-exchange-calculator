<template>
  <card>
    <h1>{{ text.title }}</h1>
    <h2 v-if="noData">{{ text.noData }}</h2>
    <div v-else>
      <h4 class="text-secondary">{{ subtitle }}</h4>
      <table class="table">
        <thead>
          <tr>
            <th v-for="(th, index) in t_heads" :key="index" scope="col">
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cell, index) in t_rows" :key="index">
            <td>{{ cell }}</td>
            <td>{{ resultData[cell] }}</td>
            <td>{{ sumValueNums(resultData[cell]) }}</td>
            <td>{{ isEven(resultData[cell]) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="btn btn-secondary mt-2" @click="$router.push('/')">
      {{ text.back }}
    </button>
  </card>
</template>

<script>
import locale from "@/locale/ua.json";
import Card from "@/components/Card.vue";
export default {
  components: {
    Card,
  },
  data: () => ({
    t_heads: ["Prop Name", "Value", "Sum", "isEven"],
    t_rows: ["saleRateNB", "purchaseRateNB", "saleRate", "purchaseRate"],
  }),
  computed: {
    noData() {
      return this.$store.getters.getExchangeRate == null;
    },
    text: () => locale.result,
    resultData() {
      return this.$store.getters.getExchangeRate;
    },
    subtitle() {
      return this.$store.getters.getReqParams.date;
    },
  },
  methods: {
    isEven(val) {
      return this.sumValueNums(val) % 2 == 0;
    },
    sumValueNums(val) {
      let nums = Array.from(("" + val).replace(/\D/g, ""));
      return nums.reduce((a, b) => +a + +b, 0);
    },
  },
};
</script>