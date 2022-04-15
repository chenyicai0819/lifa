<template>
  <el-popover placement="bottom" :width="400" trigger="click" v-model:visible="visible">
    <template #reference>
      <el-input
          class="counter-index-head-input"
          v-model="form.search"
          placeholder="会员信息查询，输入会员名字"
          clearable="true"
          @click="visible = true"
      />
    </template>
    <el-table :data="vipslist.filter((data) =>!form.search || data.vipName.toLowerCase().includes(form.search.toLowerCase()))"
              style="height: 400px;"
              empty-text="没有会员"
    >
      <el-table-column label="会员姓名" prop="vipName" />
      <el-table-column label="手机号码" prop="vipPhone" />
      <el-table-column label="卡金" prop="vipsMoney" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button size="mini" @click="orderVip(scope.row)" type="primary">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-popover>
</template>

<script>
import {onBeforeMount,reactive} from "vue";

const {toRefs} = require("vue");
const {getVips} = require("../../api/vips");

export default {
  name: "VipSearch",
  setup(){
    const data=reactive({
      vipslist:[],
      form:{
        search:'',
      }
    })


    onBeforeMount(()=>{
      getVips().then((res)=>{
        data.vipslist=res
      })
    })

    return{
      ...toRefs(data),
    }
  }
}
</script>

<style scoped>

</style>