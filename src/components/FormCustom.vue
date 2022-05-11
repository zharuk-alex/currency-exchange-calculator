<template>
  <form
    class="row g-3 needs-validation"
    :class="{ 'was-validated': validated }"
    novalidate
  >
    <slot name="form-body"></slot>
    <slot name="form-footer"></slot>
  </form>
</template>

<script>
export default {
  props: {
    validated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
