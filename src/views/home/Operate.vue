<template>
  <div class="operate">
    <div class="op-button-div">
      <el-button class="op-button" size="mini" style="background-color: Transparent" @click="toIndex">
        <svg t="1636810079819" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1680" width="20" height="20"><path d="M810.666667 1024H213.333333a128 128 0 0 1-128-128V384l-18.773333 12.8A42.666667 42.666667 0 0 1 18.773333 327.253333l469.333334-320a42.666667 42.666667 0 0 1 47.786666 0l469.333334 320a42.666667 42.666667 0 0 1-47.786667 70.826667L938.666667 384v512a128 128 0 0 1-128 128z m-128-85.333333h128a42.666667 42.666667 0 0 0 42.666666-42.666667V327.253333l-341.333333-232.96-341.333333 232.96V896a42.666667 42.666667 0 0 0 42.666666 42.666667h128v-298.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h256a42.666667 42.666667 0 0 1 42.666667 42.666667z m-256 0h170.666666v-256h-170.666666z" p-id="1681" fill="#ffffff"></path></svg>
        <span style="font-size: 20px;margin-left: 3px">首页</span>
      </el-button>
    </div>
    <div class="op-button-div">
      <el-button class="op-button" size="mini" style="background-color: Transparent">
        <svg t="1636810117323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1947" width="20" height="20"><path d="M903.252518 1023.997867H120.747482a42.666578 42.666578 0 0 1-42.666578-42.666578 482.98566 482.98566 0 0 1 213.332889-402.345829 343.465951 343.465951 0 0 1-101.546455-243.626159A329.38598 329.38598 0 0 1 512 0a329.38598 329.38598 0 0 1 322.132662 335.359301 343.465951 343.465951 0 0 1-101.119789 243.626159 482.98566 482.98566 0 0 1 213.332889 402.345829 42.666578 42.666578 0 0 1-43.093244 42.666578zM165.974054 938.664711h692.051892c-15.786634-140.373041-106.239779-272.212766-218.879544-310.612686a42.666578 42.666578 0 0 1-28.586607-35.41326 42.666578 42.666578 0 0 1 20.053291-42.666577 255.999467 255.999467 0 0 0 118.186421-216.31955A244.052825 244.052825 0 0 0 512 85.333156a244.052825 244.052825 0 0 0-236.799507 250.026145 255.999467 255.999467 0 0 0 118.186421 216.31955 42.666578 42.666578 0 0 1 20.053291 42.666577 42.666578 42.666578 0 0 1-28.586607 35.41326c-112.639765 36.693257-203.09291 168.532982-218.879544 308.906023z" p-id="1948" fill="#ffffff"></path></svg>
        <span style="font-size: 20px;margin-left: 3px">{{username}}</span>
      </el-button>
    </div>
    <div class="op-button-div">
      <el-button class="op-button" size="mini" style="background-color: Transparent" @click="logout">
        <svg t="1636810180263" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2214" width="20" height="20"><path d="M896 1024H298.666667a128 128 0 0 1-128-128v-211.2a42.666667 42.666667 0 0 1 85.333333 0V896a42.666667 42.666667 0 0 0 42.666667 42.666667h597.333333a42.666667 42.666667 0 0 0 42.666667-42.666667V128a42.666667 42.666667 0 0 0-42.666667-42.666667H298.666667a42.666667 42.666667 0 0 0-42.666667 42.666667v213.333333a42.666667 42.666667 0 0 1-85.333333 0V128a128 128 0 0 1 128-128h597.333333a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128z m-213.333333-469.333333H42.666667a42.666667 42.666667 0 0 1 0-85.333334h537.173333l-55.893333-55.466666a42.666667 42.666667 0 1 1 60.586666-60.586667l128 128a42.666667 42.666667 0 0 1 8.96 46.506667A42.666667 42.666667 0 0 1 682.666667 554.666667z" p-id="2215" fill="#ffffff"></path></svg>
        <span style="font-size: 20px;margin-left: 3px">退出</span>
      </el-button>
    </div>

  </div>
</template>

<script>
import router from "../../router";
import {onBeforeMount, reactive, toRefs} from "vue";
import {useStore} from "vuex";


export default {
  name: "Operate",
  setup(){
    const store =useStore();
    const data=reactive({
      username:'',
    })
    const toIndex = () => {
      router.push("/");
    }
    const logout = () => {
      router.push("/login")
      localStorage.removeItem("loginToken");
    }
    onBeforeMount(()=>{
      data.username=store.state.users.username
    })
    return{
      toIndex,logout,...toRefs(data)
    }
  }
}
</script>

<style scoped>
.operate{
  width: 20%;
  height: 60px;
  display: flex;
}
.op-button{
  margin-top: 10px;
  background-color: Transparent;
  border: 0;
  color: #FFFFFF !important;
}
.op-button:hover{
  background-color: Transparent;
  color: #409EFF!important;;
}
.op-button:active{
  background-color: Transparent;
  color: #2c3e50!important;;
}
.op-button-div :active{
  /*background-color: #f5576c;*/
  /*border: #2c3e50 1px solid;*/
}

</style>