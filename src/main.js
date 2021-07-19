import Vue from 'vue'
import App from './App.vue'

import router from './routes'
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import './permission';
import store from "@/store";
// import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(VueRouter);
Vue.use(ElementUI);

function judgeType(obj) {
  // tostring会返回对应不同的标签的构造函数
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}
function deepClone(data) {
  const type = judgeType(data);
  let obj;
  if (type === 'array'){
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
// 不再具有下一层次
    return data;
  }
  if (type === 'array'){
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    // 对原型上的方法也拷贝了....
    for (const key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}
Vue.prototype.deepClone = deepClone

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
