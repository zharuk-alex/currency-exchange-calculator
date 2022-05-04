import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Result from "@/views/Result.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/result",
    name: "Result",
    component: Result,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});