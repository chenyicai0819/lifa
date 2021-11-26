<template>
  <el-button @click="aaa">djd</el-button>
  <div class="login">
    <div class="login-card">
      <n-card>
        <n-tabs default-value="signin" size="large">
          <n-tab-pane name="signin" tab="登录">

              <n-form-item-row label="用户名">
                <el-input v-model="logins.username" placeholder="用户名" />
              </n-form-item-row>
              <n-form-item-row label="密码">
                <el-input v-model="logins.password" placeholder="密码" show-password="true" />
              </n-form-item-row>
            <n-button type="primary" block @click="login">登录</n-button>
          </n-tab-pane>
          <n-tab-pane name="signup" tab="注册">
            <n-form>
              <n-form-item-row label="用户名">
                <el-input v-model="signin.username" placeholder="账号" />
              </n-form-item-row>
              <n-form-item-row label="密码">
                <el-input v-model="signin.password" placeholder="密码"  />
              </n-form-item-row>
              <n-form-item-row label="重复密码">
                <el-input v-model="signin.password2" placeholder="重复密码" show-password="true" />
              </n-form-item-row>
            </n-form>
            <n-button type="primary" block>注册</n-button>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script>
import {NButton,NCard,NTabPane,NTabs,NForm,NFormItemRow,} from 'naive-ui';
import {reactive, toRefs} from "vue";
import router from "../router";
import {getUser, loginapi} from "../api/login";
import {ElMessage} from "element-plus";
import {getWorker} from "../api/worker";
import selectItem from "../utils/selectItem";
import {getService} from "../api/service";
export default {
  name: "Login",
  components: {
    NButton,NCard,NTabPane,NTabs,NForm,NFormItemRow,
  },
  setup(){
    const data=reactive({
      logins:{
        username:'',
        password:'',
      },
      signin:{
        username:'',
        password:'',
        password2:'',
      }
    })
    const login = () => {
      console.log(data.logins.username);
      console.log(data.logins.password);
      loginapi({'username':data.logins.username,'password':data.logins.password}).then((res)=>{
        console.log(res);
      }).catch(()=>{
        ElMessage.error('账号不存在或者密码不正确！')
      })
      localStorage.setItem("loginToken","test")
      getAll()
      router.push("/index")

    }
    const aaa = () => {
      getUser({'username':data.logins.username}).then((res)=>{
        console.log(res);
      })
    }
    // 登陆后获取所需信息
    const getAll = () => {
      getWorker().then((res)=>{
        selectItem.WORKMANS=res
      })
      getService().then((res)=>{
        selectItem.SERVICEITEM=res
      })
    }
    return{
      ...toRefs(data),login,aaa,getAll
    }
  }
}
</script>

<style scoped>
.login{
  width: 100%;
  height: 700px;
  background-color: #cca8f5;
}
.login-card{
  width: 30%;
  height: 500px;
  position: relative;
  top: 200px;
  left: 60%;
}
</style>