import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: ()=>import('@/views/Home.vue'),
  },
  {
    path: "/result",
    name: "result",
    component: ()=>import('@/views/Result.vue')
  },
];

export default createRouter({
  history: createWebHistory('/currency-exchange-calculator/'),
  routes,
});