<template>
  <div id="app">
    <a-locale-provider :locale="zhCN">
      <router-view></router-view>
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';

export default {
  name: 'App',
  data: ()=>{
    return {
      zhCN,
    };
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '~ant-design-vue/dist/antd.less';
@import "./src/assets/less/custom.less";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  margin:0;
  padding: 0;
}
</style>
