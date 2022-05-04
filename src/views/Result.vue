<template>
  <card>
    <h1>{{ text.title }}</h1>
    <div class="tableFixHead table-responsive">
      <table class="table table-sm">
        <thead>
          <tr>
            <th :colspan="t_heads.length" width="100%">
              <h4 class="text-secondary">{{ subtitle }}</h4>
            </th>
          </tr>
          <tr>
            <th v-for="(th, index) in t_heads" :key="index" scope="col">
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(currency, index) in resultData" :key="index">
            <tr v-if="currency.currency">
              <td>{{ currency.currency }}</td>
              <td>{{ currency.saleRateNB }}</td>
              <td>{{ currency.purchaseRateNB }}</td>
            </tr>
          </template>
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
import { mapGetters } from "vuex";

export default {
  components: {
    Card,
  },
  data: () => ({
    t_heads: ["Валюта", "saleRateNB", "purchaseRateNB"],
  }),
  computed: {
    ...mapGetters({
      resultData: "getExchangeRate",
      subtitle: "getExchangeDate",
    }),
    text: () => locale.result,
  },
};
</script>

<style scoped>
.card-body {
  max-height: calc(100vh - 40px);
}
.tableFixHead {
  overflow-y: auto;
  max-height: 400px;
}

.tableFixHead table {
  border-collapse: collapse;
  width: 100%;
}

.tableFixHead th,
.tableFixHead td {
  padding: 8px 16px;
}

.tableFixHead th {
  position: sticky;
  top: 0;
  background: #eee;
}
</style>