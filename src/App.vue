<template>
  <!--  <div id="nav">-->
  <!--    <router-link to="/">Home</router-link> |-->
  <!--    <router-link to="/about">About</router-link>-->
  <!--  </div>-->
  <router-view/>
</template>
<script>

import * as echarts from 'echarts'
import {provide} from "vue";

export default {
  name: 'App',
  setup() {
    provide('ec', echarts)//provide
  },
  created() {
    console.log(sessionStorage.getItem("store"));
    console.log(sessionStorage.length);
    // 如果sessionStorage中存储了store
    if (sessionStorage.getItem("store")) {
      // replaceState 替换state根状态（参数为 对象）
      this.$store.replaceState( Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  font-family: 黑体;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
