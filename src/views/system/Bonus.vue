<template>
  <div class="system-bonus">
    <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
      <div class="system-bonus-body">
        <div>
          <p>当前提成标准：发型师：{{bonus1}} 中工：{{bonus2}}</p>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
      <div class="system-bonus-updata">
        <div>
          <p>修改提成标准</p>
          <div>发型师：
            <el-input-number v-model="bonus1" :min="0" :max="1" step="0.01" />
            中工：
            <el-input-number v-model="bonus2" :min="0" :max="1" step="0.01" />
            <el-button type="primary" style="margin-left: 10px" @click="upBonus">提交更新</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
// const {useStore} = require("vuex");
const {upSystem} = require("../../api/systems");
import {ElMessage} from "element-plus";
import {getSystem} from "../../api/systems";

export default {
  name: "Bonus",
  setup(){
    // const store = useStore();
    const data = reactive({
      bonus1:0,
      bonus2:0,
      upBonus1:0,
      upBonus2:0,
    })
    /**
     * 更新提成
     */
    const upBonus = () => {
      // store.dispatch('users/upWorker1BonusActions',data.bonus1)
      // store.dispatch('users/upWorker2BonusActions',data.bonus2)
      upSystem({"text":data.bonus1,"name":"发型师提成"}).then((res)=>{
        if (res==1){
          ElMessage({
            message: '发型师提成提成更新成功',
            type: 'success',
          })
        }
      })
      upSystem({"text":data.bonus2,"name":"中工提成"}).then((res)=>{
        if (res==1){
          ElMessage({
            message: '中工提成提成更新成功',
            type: 'success',
          })
        }
      })
    }

    onBeforeMount(()=>{
      // 弃用，改为数据库获取
      // data.bonus1=store.state.users.worker1Bonus
      // data.bonus2=store.state.users.worker2Bonus
      getSystem({"name":"发型师提成"}).then((res)=>{
        data.bonus1=Number(res.text)
      })
      getSystem({"name":"中工提成"}).then((res)=>{
        data.bonus2=Number(res.text)
      })
    })
    return{
      ...toRefs(data),upBonus,
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 100%;
  padding: 0 0;
  margin-top: 5px;
}
.system-bonus-body{
  width: 100%;
  height: 100px;
}
.system-bonus-body>div{
  margin-top: 20px;
  width: 35%;
}
.system-bonus-body>div>p{
  font-size: 24px;
  padding-left: 20px;
}
.system-bonus-updata{
  width: 100%;
  height: 100px;
}
.system-bonus-updata>div{
  width: 50%;
}
.system-bonus-updata>div>p{
  font-size: 24px;
  padding-left: 20px;
}
</style>