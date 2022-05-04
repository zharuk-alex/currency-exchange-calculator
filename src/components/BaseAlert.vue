<template>
  <div
    class="alert d-flex align-items-center dismissible"
    role="alert"
    :class="[`alert-${alertClass}`]"
  >
    <div>{{ alertText }}</div>
    <button
      type="button"
      class="btn-close ms-auto"
      @click.prevent="$emit('update:visible', false)"
    ></button>
  </div>
</template>

<script>
export default {
  props: {
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
    alertClass() {
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
.alert {
  position: fixed;
  right: 20px;
  top: 20px;
  width: 300px;
}
</style>