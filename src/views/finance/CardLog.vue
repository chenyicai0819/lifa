<template>
  <div class="finance-cardlog">
    <div class="finance-cardlog-head">
      <div class="finance-cardlog-head-title">

      </div>
    </div>
    <div class="counter-pending-body">
      <el-card class="box-card" shadow="hover" >
        <div class="box-card-head">
          <span>开卡充值记录</span>
        </div>
        <div style="overflow-x: hidden;overflow-y: scroll;height: 450px;">
          <el-table
              :data="bills"
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="单号" prop="billNo" />
            <el-table-column label="标题" prop="billText" />
            <el-table-column label="金额" prop="billMoney" />
            <el-table-column label="支付方式" prop="payType" />
            <el-table-column label="工作人员" prop="billWorker" />
            <el-table-column label="时间" prop="billTime" />
            <el-table-column label="备注" prop="billRemark" />
          </el-table>
        </div>
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size=pageSize
              layout="total, sizes, prev, pager, next, jumper"
              :total=allBill
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import formatDate from "../../utils/date";
import {pageBill,allBill} from "../../api/bill";
export default {
  name: "CardLog",
  setup(){
    const data=reactive({
      bills:[],
      currentPage:1,
      pageSize:10,
      allBill:0,
    })

    const handleCheck = (index, row) => {
      console.log(index, row)
      console.log("审核通过");
    }
    const handleSizeChange = (val) => {
      data.pageSize=val
      data.currentPage=1
      pageGetCard()
    }
    const handleCurrentChange = (val) => {
      data.currentPage=val
      pageGetCard()
    }
    const handleClose = () => {

    }
    const pageGetCard = () => {
      data.bills=[]
      pageBill({"pagesize":data.pageSize,"now":data.currentPage}).then((res)=>{
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].billRemark=="充值"){
            data.bills.push(res[i])
          }
        }
        for (let i = 0; i < data.bills.length; i++) {
          data.bills[i].billTime=formatDate(res[i].billTime)
        }
      })
    }
    onBeforeMount(()=>{
      allBill().then((res)=>{
        for (let i = 0; i < res.length; i++) {
          if (res[i].billRemark=="充值"){
            data.allBill++
          }
        }
      })
      pageGetCard()
    })

    return{
      ...toRefs(data),pageGetCard,
      handleCheck,handleSizeChange,handleCurrentChange,handleClose,
    }
  }
}
</script>

<style scoped>
.finance-cardlog{

}
.finance-cardlog-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.finance-cardlog-head > div {
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}

.finance-cardlog-head-title {
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