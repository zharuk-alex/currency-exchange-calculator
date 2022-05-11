<template>
  <div class="card">
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <span class="mx-2">
        <a
          href="https://api.privatbank.ua/#p24/exchangeArchive"
          target="_blank"
        >
          api.privatbank.ua
        </a>
      </span>

      <span class="mx-2">zharuk alex @ 2022</span>
      <span class="mx-2">
        <a href="https://zzharuk.github.io/" target="_blank">
          zzharuk.github.io
        </a>
      </span>
    </div>
  </div>
</template>

<style>
.card {
  width: 600px;
  max-width: calc(100% - 10px);
  border: 1px solid grey;
  background-color: #f1f1f1 !important;
  text-align: center;
}
</style>