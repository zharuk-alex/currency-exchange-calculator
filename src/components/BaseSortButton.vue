<template>
  <svg
    v-if="asc"
    @click="toggleSort('desc')"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :fill="fill"
    class="bi bi-sort-up"
    :viewBox="`0 0 ${size} ${size}`"
  >
    <path
      d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
    />
  </svg>

  <svg
    v-else
    @click="toggleSort('asc')"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :fill="fill"
    class="bi bi-sort-down"
    :viewBox="`0 0 ${size} ${size}`"
  >
    <path
      d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 16,
    },
    fill: {
      type: String,
      default: "#000000",
    },
  },
  data: () => ({
    asc: true,
  }),
  methods: {
    toggleSort(val) {
      this.asc = !this.asc;
      this.$emit("toggle", val);
    },
  },
  watch: {
    active(newval) {
      !newval ? (this.asc = true) : null;
    },
  },
};
</script>

<style scoped>
.bi {
  cursor: pointer;
}
</style>