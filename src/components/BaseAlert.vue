<template>
  <div
    class="alert d-flex align-items-center dismissible"
    role="alert"
    :class="[`alert-${classType}`, { 'alert-fixed': fixed }]"
  >
    <div>{{ alertText }}</div>
    <button
      v-if="clearable"
      type="button"
      class="btn-close ms-auto"
      @click.prevent="$emit('update:visible', false)"
    ></button>
  </div>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    alertText: {
      type: String,
    },
  },
  computed: {
    classType() {
      let exist = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ].find((i) => i == this.type);
      return exist ? this.type : "info";
    },
  },
};
</script>
<style scoped>
.alert-fixed {
  position: fixed;
  right: 20px;
  top: 20px;
  width: 300px;
}
</style>