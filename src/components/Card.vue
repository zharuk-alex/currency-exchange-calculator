<template>
  <div class="card">
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.card {
  width: 600px;
  border: 1px solid grey;
  background-color: #f1f1f1 !important;
  text-align: center;
}
</style>