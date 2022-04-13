<template>
  <div class="finance-servicelog">
    <div class="finance-servicelog-head">
      <div class="finance-servicelog-head-title">
        
      </div>
    </div>
    <div class="counter-pending-body">
      <el-card class="box-card" shadow="hover" >
        <div class="box-card-head">
          <span>项目消费记录</span>
        </div>
        <div style="overflow-x: hidden;overflow-y: scroll;height: 450px;">
          <el-table
              :data="orders"
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="单号" prop="orderId" />
            <el-table-column label="客户姓名" prop="orderMan" />
            <el-table-column label="消费金额" prop="orderMoney" />
            <el-table-column label="支付方式" prop="payType" />
            <el-table-column label="服务内容" prop="orderText" />
            <el-table-column label="售价" prop="orderPrice" />
            <el-table-column label="员工信息" prop="orderWorker" />
            <el-table-column label="中工" prop="orderOrderWorker" />
            <el-table-column label="时间" prop="orderDate" />
            <el-table-column label="备注" prop="orderRemake" />
          </el-table>
        </div>
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size=pageSize
              layout="total, sizes, prev, pager, next, jumper"
              :total=allService
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
const {pageOrder,allOrder} = require("../../api/order");
export default {
  name: "ServiceLog",
  setup(){
    const data=reactive({
      orders:[],
      currentPage:1,
      pageSize:10,
      allService:0,
    })

    const handleCheck = (index, row) => {
      console.log(index, row)
      console.log("审核通过");
    }
    const handleSizeChange = (val) => {
      data.pageSize=val
      data.currentPage=1
      pageGetService()
    }
    const handleCurrentChange = (val) => {
      data.currentPage=val
      pageGetService()
    }
    const handleClose = () => {

    }
    const pageGetService = () => {
      data.orders=[]
      pageOrder({"pagesize":data.pageSize,"now":data.currentPage}).then((res)=>{
        for (let i = 0; i < res.length; i++) {
          if (res[i].orderWorker!="" && res[i].orderOrderWorker!=""){
            data.orders.push(res[i])
          }
        }
        for (let i = 0; i < data.orders.length; i++) {
          data.orders[i].orderDate=formatDate(res[i].orderDate)
        }
      })
    }
    onBeforeMount(()=>{

      allOrder().then((res)=>{
        for (let i = 0; i < res.length; i++) {
          if (res[i].orderWorker!="" && res[i].orderOrderWorker!=""){
            data.allService++
          }
        }
        // console.log(res);
      })
      pageGetService()
    })

    return{
      ...toRefs(data),
      handleCheck,handleSizeChange,handleCurrentChange,handleClose,pageGetService,
    }
  }
}
</script>

<style scoped>
.finance-servicelog{

}
.finance-servicelog-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.finance-servicelog-head > div {
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}

.finance-servicelog-head-title {
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