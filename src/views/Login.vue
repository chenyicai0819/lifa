<template>
  <div class="login">
    <div class="login-card">
      <n-card>
        <n-tabs default-value="signin" size="large">
          <n-tab-pane name="signin" tab="登录">
            <n-form>
              <n-form-item-row label="账号">
                <n-input v-model:value="login.username" type="text" placeholder="账号"/>
              </n-form-item-row>
              <n-form-item-row label="密码">
                <n-input v-model:value="login.password" type="password" placeholder="密码" show-password-on="click"/>
              </n-form-item-row>
            </n-form>
            <n-button type="primary" block @click="login">登录</n-button>
          </n-tab-pane>
          <n-tab-pane name="signup" tab="注册">
            <n-form>
              <n-form-item-row label="用户名">
                <n-input v-model:value="signin.username" type="text" placeholder="用户名"/>
              </n-form-item-row>
              <n-form-item-row label="密码">
                <n-input v-model:value="signin.password" type="password" placeholder="密码"/>
              </n-form-item-row>
              <n-form-item-row label="重复密码">
                <n-input v-model:value="signin.password2" type="password" placeholder="重复密码"/>
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
import {NButton,NCard,NTabPane,NTabs,NForm,NInput,NFormItemRow,} from 'naive-ui';
import {reactive, toRefs} from "vue";
import router from "../router";
import {loginapi} from "../api/login";
export default {
  name: "Login",
  components: {
    NButton,NCard,NTabPane,NTabs,NForm,NInput,NFormItemRow,
  },
  setup(){
    const data=reactive({
      login:{
        username:'123',
        password:'123456',
      },
      signin:{
        username:'',
        password:'',
        password2:'',
      }
    })
    const login = () => {
      console.log(data.login.username);
      console.log(data.login.password);
      loginapi({'userid':data.login.username,'password':data.login.password}).then((res)=>{
        localStorage.setItem("loginToken",res)
        router.push("/index")
      })

    }
    return{
      ...toRefs(data),login
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