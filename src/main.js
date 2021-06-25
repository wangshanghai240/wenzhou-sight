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

Vue.prototype.copy = function(text) {
  let url = text
  let oInput = document.createElement('input')
  oInput.value = url
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand("Copy") // 执行浏览器复制命令
  this.$message.success('复制成功')
  oInput.remove()
}

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
//   attempt: 1,
  
// })

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
