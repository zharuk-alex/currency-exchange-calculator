<template>
  <div class="card">
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer">
      <div class="row justify-content-between flex-wrap">
        <div class="col-12 col-sm">
          <a
            href="https://api.privatbank.ua/#p24/exchangeArchive"
            target="_blank"
          >
            api.privatbank.ua
          </a>
        </div>

        <div class="col-12 col-sm">zharuk alex @ 2022</div>
        <div class="col-12 col-sm">
          <a href="https://zharuk-alex.github.io/" target="_blank"> github </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .card {
    width: 760px;
    max-width: 100%;
    border: 1px solid grey;
    background-color: #f1f1f1 !important;
    text-align: center;
    max-height: 100vh;
    max-height: calc(var(--vh, 1vh) * 100 - 20px);
    height: fit-content;
    margin: 10px auto;
    display: flex;
  }
  .card-footer {
    font-size: 13px;
  }
</style>
