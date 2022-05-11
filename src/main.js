import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import BaseAlert from "@/components/BaseAlert.vue"
import BaseSortButton from "@/components/BaseSortButton.vue"

createApp(App)
.component("BaseAlert", BaseAlert)
.component("BaseSortButton", BaseSortButton)
.use(router)
.use(store)
.mount('#app');