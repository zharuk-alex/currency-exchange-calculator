<template>
  <div class="page-container">
    <router-view></router-view>
  </div>
  <div class="info">
    <a href="https://api.privatbank.ua/#p24/exchangeArchive" target="_blank">
      api.privatbank.ua
    </a>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
body {
  margin: 10px;
  overflow: hidden;
}
.page-container {
  height: 100%;
  padding: 0;
  margin: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.info {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 16px;
}
</style>
