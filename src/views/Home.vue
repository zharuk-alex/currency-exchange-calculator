<template>
  <div>
    <card>
      <h1>{{ text.title }}</h1>
      <button
        type="button"
        class="btn btn-primary mt-2"
        @click="showModal = true"
      >
        {{ text.select_date }}
      </button>
    </card>
    <modal v-if="showModal" @close="showModal = false">
      <template v-slot:modal-body>
        <form-custom :validated="v$.$invalid">
          <template v-slot:form-body>
            <div class="form-item-wrapper mb-2">
              <input
                type="date"
                class="form-control"
                v-model="dateSelected"
                @blur="v$.dateSelected.$touch"
                :min="minDate"
                :max="maxDate"
                required
              />
              <div v-if="v$.dateSelected.$error" class="invalid-feedback">
                <small v-for="error of v$.$errors" :key="error.$uid">
                  {{ error.$message }}
                </small>
              </div>
            </div>
            <div class="form-item-wrapper mb-2">
              <select
                class="form-select"
                v-model.lazy="currencySelected"
                required
              >
                <option value="">{{ text.select_currency }}</option>
                <option
                  v-for="(currency, index) in currencies"
                  :key="index"
                  :value="currency"
                >
                  {{ currency }}
                </option>
              </select>
              <div v-if="v$.currencySelected.$error" class="invalid-feedback">
                <small v-for="error of v$.$errors" :key="error.$uid">
                  {{ error.$message }}
                </small>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary mt-2"
              @click.prevent="submitForm"
              :class="{ disabled: isFetch }"
              :disabled="v$.$invalid || isFetch"
            >
              <div
                v-if="isFetch"
                class="spinner-border spinner-border-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              {{ text.check }}
            </button>
          </template>
        </form-custom>
      </template>
    </modal>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators/dist/raw.esm";
import moment from "moment";

import locale from "@/locale/ua.json";
import Modal from "@/components/Modal.vue";
import Card from "@/components/Card.vue";
import FormCustom from "@/components/FormCustom.vue";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  components: {
    Modal,
    Card,
    FormCustom,
  },
  data: () => ({
    showModal: false,
    currencies: ["USD", "EUR", "RUB", "PLN", "GBP"],
    currencySelected: "",
    dateSelected: null,
    maxDate: moment().format("YYYY-MM-DD"),
    minDate: moment().add(-2, "years").format("YYYY-MM-DD"),
    isFetch: false,
  }),
  computed: {
    text: () => locale.home,
  },
  validations() {
    return {
      dateSelected: {
        required: helpers.withMessage(
          () =>
            locale.form_currency.errors.date
              .replace("{minDate}", this.minDate)
              .replace("{maxDate}", this.maxDate),
          (value) => value <= this.maxDate && value >= this.minDate
        ),
      },
      currencySelected: { required },
    };
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      this.isFetch = true;

      let params = {
        date: moment(this.dateSelected, "YYYY-MM-DD").format("DD.MM.YYYY"),
        currency: this.currencySelected,
      };

      this.$store.commit("SET_REQ_PARAMS", params);

      this.$store
        .dispatch("fetchExchangeRate", params)
        .then((r) =>
          r ? setTimeout(() => this.$router.push("result"), 500) : false
        )
        .finally(() => {
          this.isFetch = false;
        });
    },
  },
};
</script>