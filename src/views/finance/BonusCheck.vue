<template>
  <div class="finance-bonuscheck">
    <div class="finance-bonuscheck-head">
      <el-select v-model="worker"
                 class="m-2"
                 placeholder="选择工作人员"
                 size="large" style="width: 20%;margin-right: 10px"
                 @change="changWorker"
      >
        <el-option
            v-for="item in workers"
            :key="item.workId"
            :label="item.workName"
            :value="item.workName"
        >
        </el-option>
      </el-select>
    </div>
    <div class="counter-pending-body">
      <el-card class="box-card" shadow="hover" >
        <div class="box-card-head">
          <span>员工提成核对</span>
        </div>
        <div style="overflow-x: hidden;overflow-y: scroll;height: 450px;">
          <el-table
              :data="form"
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="单号" prop="id" />
            <el-table-column label="内容" prop="text" />
            <el-table-column label="金额" prop="money" />
            <el-table-column label="提成" prop="bonus" />
            <el-table-column label="支付方式" prop="paytype"/>
            <el-table-column label="时间" prop="time" />
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

import {useStore} from "vuex";
import {onBeforeMount, reactive, toRefs} from "vue";
const {allBill} = require("../../api/bill");
const {getSystem} = require("../../api/systems");
const {formatTime} = require("../../utils/date");

export default {
  name: "BonusCheck",
  setup(){
    const store =useStore();
    const data=reactive({
      bills:[],
      workers:[],
      worker:'',
      form:[],
      bonus1:0,
      bonus2:0,
    })
    /**
     * 修改查看的工作人员
     */
    const changWorker = () => {
      // console.log(data.bills[1].billWorker);
      data.form=[]
      for (let i = 0; i < data.bills.length; i++) {
        if (data.bills[i].billWorker===data.worker){
          let list={"id": 0, "text": "", "money": 0, "bonus": 0, "paytype": "", "time": ""}
          list.id=data.bills[i].billNo
          list.text=data.bills[i].billText
          list.money=data.bills[i].billMoney
          list.bonus=(data.bills[i].billMoney)*(data.bonus1)
          list.paytype=data.bills[i].payType
          list.time=data.bills[i].billTime
          data.form.push(list)
          // console.log("111")
          // console.log(list);
          // console.log(index)
        }
        if (data.bills[i].billOrderWorkers===data.worker){
          let list={"id": 0, "text": "", "money": 0, "bonus": 0, "paytype": "", "time": ""}
          list.id=data.bills[i].billNo
          list.text=data.bills[i].billText
          list.money=data.bills[i].billMoney
          list.bonus=(data.bills[i].billMoney)*(data.bonus2)
          list.paytype=data.bills[i].payType
          list.time=data.bills[i].billTime
          data.form.push(list)
          // console.log("222")
          // console.log(list);
          // console.log(index)
        }
      }
      console.log(data.form);
    }
    const handleCheck = (index, row) => {
      console.log(index, row)
      console.log("审核通过");
    }
    const handleSizeChange = (val) => {
      data.pageSize=val
      data.currentPage=1
    }
    const handleCurrentChange = (val) => {
      data.currentPage=val
    }
    const handleClose = () => {

    }
    onBeforeMount(()=>{
      data.workers=store.state.selectItem.WORKMANS
      getSystem({"name":"发型师提成"}).then((res)=>{data.bonus1=Number(res.text)})
      getSystem({"name":"中工提成"}).then((res)=>{data.bonus2=Number(res.text)})
      allBill().then((res)=>{
        let index=0;
        for (let i = 0; i < res.length; i++) {
          // 充值没有提成
          if (res[i].billRemark!="充值") {
            data.bills[index] = res[i]
            data.bills[index].billTime = formatTime(res[i].billTime)
            index++
          }
        }
      })
    })

    return{
      ...toRefs(data),
      handleCheck,handleSizeChange,handleCurrentChange,handleClose,changWorker,
    }
  }
}
</script>

<style scoped>
.finance-bonuscheck{

}
.finance-bonuscheck-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.finance-bonuscheck-head > div {
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}

.finance-bonuscheck-head-title {
  padding-top: 10px;
}

.box-card {
  width: 100%;

  padding: 0 0;
  margin-top: 5px;
  /*display: flex;*/
  /*justify-content: left;*/
}
.box-card :hover{

}
.box-card>span{
  padding-left: 10px;
}
.box-card-head{
  display: flex;
  justify-content: left;
}
</style>