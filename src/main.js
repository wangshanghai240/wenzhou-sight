import Vue from 'vue'
import App from './App.vue'

import router from './routes'
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import './permission';
import store from "@/store";

Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(VueRouter);


new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
