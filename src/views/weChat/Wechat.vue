<template>
  <div class="login">
    <div class="form-login">
      <el-form ref="form" :model="form" >
        <el-form-item label="手机号">
          <el-input v-model="form.pass" class="input-login"></el-input>
        </el-form-item>
        <el-button type="primary"  @click="Wechatlogin">微信授权</el-button>
      </el-form>
    </div>

    <el-image :src="url" />

  </div>
</template>

<script>

import {JdrWechat} from "../../api/WeChatAuth";
import {ElLoading} from "element-plus";

export default {
  name: "Wechat",
  data(){
    return{
      form: {
        name: '',
        pass: '',
      },
      url:'http://localhost:8082/vips/newQR?qrCodeUrl=www.cyc292.top/#/home',
    }
  },
  methods:{
    Wechatlogin(){
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      JdrWechat({
        id:this.form.name,
        phone:this.form.pass,
      }).then((res)=>{
        if("允许登录"==res){
          //更改ip
          // alert("允许登录")
          // JdrOauth({
          //   id:this.form.name,
          // })
          window.location.href="https://www.youngkbt.cn/bxhtxt/wechat/oauth?id="+this.form.name
          loading.close()
        }else{
          loading.close()
          alert(res);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
