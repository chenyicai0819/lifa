<template>
  <div class="finance-shoplog">
    <div class="finance-shoplog-head">
      <div class="finance-shoplog-head-title">

      </div>
    </div>
    <div class="counter-pending-body">
      <el-card class="box-card" shadow="hover" >
        <div class="box-card-head">
          <span>商品消费记录</span>
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
            <el-table-column label="时间" prop="orderDate" />
            <el-table-column label="备注" prop="orderRemake" />
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

import {onBeforeMount, reactive, toRefs} from "vue";
import formatDate from "../../utils/date";
const {allOrder} = require("../../api/order");
export default {
  name: "ShopLog",
  setup(){
    const data=reactive({
      orders:[],
    })

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
      allOrder().then((res)=>{
        for (let i = 0; i < res.length; i++) {
          if (res[i].orderWorker==="" && res[i].orderOrderWorker===""){
            data.orders[res.length-i]=res[i]
            data.orders[res.length-i].orderDate=formatDate(res[i].orderDate)
          }

        }
        // console.log(res);
      })
    })

    return{
      ...toRefs(data),
      handleCheck,handleSizeChange,handleCurrentChange,handleClose,
    }
  }
}
</script>

<style scoped>
.finance-shoplog{

}
.finance-shoplog-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.finance-shoplog-head > div {
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}

.finance-shoplog-head-title {
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