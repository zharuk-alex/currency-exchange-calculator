<template>
  <div class="page-container">
    <router-view></router-view>
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
</style>
