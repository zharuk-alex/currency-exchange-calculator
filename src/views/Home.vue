<template>
  <card>
    <h1 class="mb-4">{{ text.title }}</h1>
    <button @click="showModal = true" type="button" class="btn btn-primary">
      {{ text.select_date }}
    </button>
  </card>
  <modal v-model:visible="showModal">
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
        </template>
      </form-custom>
    </template>
    <template v-slot:modal-footer>
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
  </modal>
  <BaseAlert
    v-if="error"
    v-model:visible="showError"
    type="danger"
    :fixed="true"
    :clearable="true"
    :alertText="error"
  />
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators/dist/raw.esm";
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
    dateSelected: moment().format("YYYY-MM-DD"),
    maxDate: moment().format("YYYY-MM-DD"),
    minDate: moment().add(-2, "years").format("YYYY-MM-DD"),
    isFetch: false,
    error: false,
  }),
  computed: {
    text: () => locale.home,
    showError: {
      get: function () {
        return !!this.error;
      },
      set: function () {
        this.error = false;
      },
    },
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
    };
  },

  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.isFetch = true;
      this.showModal = false;
      let date = moment(this.dateSelected, "YYYY-MM-DD").format("DD.MM.YYYY");

      setTimeout(
        () => this.$router.push({ name: "result", query: { date } }),
        500
      );
    },
  },
};
</script>