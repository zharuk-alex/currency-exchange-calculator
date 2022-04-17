import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/Result.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/result",
    name: "Result",
    component: About,
  },
];

export default createRouter({
  history: createWebHistory('/currency-exchange-calculator/'),
  routes,
});