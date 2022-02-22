<template>
  <div class="finance-ordercheck">
    <div class="finance-ordercheck-head">
      <div class="finance-ordercheck-head-title">
        <span>查询到今日总共有：</span>
        <span style="color: #f5576c">{{ todayMoneyNum }}</span>
        <span>笔水单，总金额为：</span>
        <span style="color: #f5576c">{{ todayMoney }}</span>
        <span>元。</span>
      </div>
    </div>
    <div class="counter-pending-body">
      <el-card class="box-card" shadow="hover" >
        <div class="box-card-head">
          <span>水单详细记录</span>
        </div>
        <div>
          <el-table
              :data="
      orders.filter(
        (data) =>
          !form.search || data.orderMan.toLowerCase().includes(form.search.toLowerCase())
      )
    "
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
            <el-table-column align="right">
              <template #header>
                <el-input v-model="form.search" size="mini" placeholder="Type to search" />
              </template>
              <template #default="scope">
                <el-button size="mini" @click="handleCheck(scope.$index, scope.row)" type="primary"
                >审核通过</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size=pageSize
              layout="total, sizes, prev, pager, next, jumper"
              :total=todayMoneyNum
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
import {getOrder} from "../../api/order";

export default {
  name: "BonusCheck",
  setup(){
    const data=reactive({
      todayMoneyNum:0,
      todayMoney:0,
      orders:[],
      currentPage:1,
      pageSize:10,
      form:{
        search:'',
      },
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
      getOrder().then((res)=>{
        data.orders=res
        data.todayMoneyNum=res.length
        for (const resKey in res) {
          data.todayMoney+=data.orders[resKey].orderMoney
        }
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
.finance-ordercheck-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.finance-ordercheck-head > div {
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}

.finance-ordercheck-head-title {
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