<template>
  <card>
    <div class="result-header">
      <h1>{{ text.title }}</h1>
      <h4 class="text-secondary">{{ subtitle }}</h4>
      <ExchangeSection />
    </div>

    <div
      v-if="resultData.length"
      style="flex: 1"
      class="tableFixHead table-responsive"
    >
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th
              v-for="({ field, text }, index) in t_heads"
              :key="index"
              scope="col"
              :class="{ active: sort.field == field }"
            >
              {{ text }}
              <BaseSortButton
                @toggle="toggleSort(field, $event)"
                :active="sort.field == field"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(currency, index) in sortedRows" :key="index">
            <tr
              v-if="currency.currency"
              @click="selectRow(currency)"
              :class="{
                'table-active': currency.currency == selectedCurrency.currency,
              }"
            >
              <td>{{ currency.currency }}</td>
              <td>{{ currency.saleRate }}</td>
              <td>{{ currency.purchaseRate }}</td>
              <td>{{ currency.saleRateNB }}</td>
              <td>{{ currency.purchaseRateNB }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <BaseAlert v-else :visible="true" type="danger" :alertText="text.noData" />
    <button
      class="btn btn-secondary mt-2"
      @click="$router.push({ name: 'home' })"
    >
      {{ text.back }}
    </button>
  </card>
</template>

<script>
import locale from "@/locale/ua.json";
import moment from "moment";
import Card from "@/components/Card.vue";
import ExchangeSection from "@/components/ExchangeSection.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Card,
    ExchangeSection,
  },
  data: () => ({
    t_heads: [
      {
        text: "currency",
        field: "currency",
      },
      {
        text: "sale",
        field: "saleRate",
      },
      {
        text: "purchase",
        field: "purchaseRate",
      },
      {
        text: "sale NB",
        field: "saleRateNB",
      },
      {
        text: "purchase NB",
        field: "purchaseRateNB",
      },
    ],
    sort: {
      field: null,
      order: "asc",
    },
  }),
  computed: {
    ...mapGetters({
      resultData: "exchangeRate",
      subtitle: "exchangeDate",
      selectedCurrency: "selectedCurrency",
    }),
    text: () => locale.result,
    sortedRows() {
      let { field, order } = this.sort;

      if (!field) {
        return this.resultData;
      }

      return [...this.resultData].sort((a, b) => {
        field in a ? null : (a[field] = "");

        if (order == "asc") {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] > b[field] ? -1 : 1;
        }
      });
    },
  },
  methods: {
    ...mapActions({ fetchExchangeRate: "fetchExchangeRate" }),
    toggleSort(field, order) {
      this.sort = { field, order };
    },
    selectRow(rowdata) {
      this.$store.commit("SET_SELECTED_CURRENCY", rowdata);
    },
  },
  created() {
    const date = this.$route.query?.date || moment().format("DD.MM.YYYY");
    this.fetchExchangeRate(date).catch((error) => {
      this.error = error.response?.statusText
        ? error.response.statusText
        : "error";
      setTimeout(() => {
        this.error = false;
      }, 4000);
    });
  },
};
</script>

<style scoped>
.tableFixHead {
  overflow-y: auto;
  /* max-height: calc(100vh - 350px); */
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
  border-bottom: none;
}
.tableFixHead th.active {
  color: #6f7378;
}

.tableFixHead tbody tr:hover {
  cursor: pointer;
}
</style>