import Vue from 'vue'
import App from './App.vue'

import router from './routes'
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import './permission';
import store from "@/store";
// import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(VueRouter);

// Vue.use(VueLazyload)
// 配置项
// Vue.use(VueLazyload, {
//   // preLoad: 1.3,
//   // error: 'dist/error.png',
//   // loading: 'dist/loading.gif',
//   attempt: 1,
  
// })

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
