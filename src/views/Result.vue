<template>
  <card>
    <h1>{{ text.title }}</h1>
    <h4 class="text-secondary">{{ subtitle }}</h4>
    <div class="tableFixHead table-responsive">
      <table class="table table-sm">
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
            <tr v-if="currency.currency">
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

    <button class="btn btn-secondary mt-2" @click="$router.push('/')">
      {{ text.back }}
    </button>
  </card>
</template>

<script>
import locale from "@/locale/ua.json";
import Card from "@/components/Card.vue";
import BaseSortButton from "@/components/BaseSortButton.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Card,
    BaseSortButton,
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
      resultData: "getExchangeRate",
      subtitle: "getExchangeDate",
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
    toggleSort(field, order) {
      this.sort = { field, order };
    },
  },
};
</script>

<style scoped>
.card {
  width: 760px;
}
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
  border-bottom: none;
}
.tableFixHead th.active {
  color: #6f7378;
}
</style>