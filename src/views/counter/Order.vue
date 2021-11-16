<template>
  <div class="counter-order">
    <div class="counter-order-head">
      <div class="counter-order-head-span">
        <span>今天共有：</span>
        <span style="font-weight: bold;color: #F56C6C">{{orderNum}}</span>
        <span>   条水单!</span>
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
      pends.filter(
        (data) =>
          !form.search || data.name.toLowerCase().includes(form.search.toLowerCase())
      )
    "
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="单号" prop="orderId" />
            <el-table-column label="客户姓名" prop="orderName" />
            <el-table-column label="消费金额" prop="ordePrice" />
            <el-table-column label="订单类型" prop="ordeType" />
            <el-table-column label="服务内容" prop="ordeContent" />
            <el-table-column label="售价" prop="contentPrice" />
            <el-table-column label="员工信息" prop="workMan" />
            <el-table-column label="备注" prop="remark" />
            <el-table-column align="right">
              <template #header>
                <el-input v-model="form.search" size="mini" placeholder="Type to search" />
              </template>
              <template #default="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
                >
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
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
              :total=orderNum
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
import {reactive, toRefs} from "vue";

export default {
  name: "Order",
  setup() {
    const data=reactive({
      orderNum:5,
      pends:[],
      currentPage:1,
      pageSize:10,
      // allTotal:31,
      form:{
        search:'',
      }
    })
    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }
    const handleSizeChange = (val) => {
      data.pageSize=val
      data.currentPage=1
    }
    const handleCurrentChange = (val) => {
      data.currentPage=val
    }

    return{
      ...toRefs(data),handleDelete,handleEdit,handleSizeChange,handleCurrentChange
    }
  }
}
</script>

<style scoped>
.counter-order-head{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px;
  background-color: #cca8f5;
}
.counter-order-head-span{
  margin-top: 15px;
  margin-left: 10px;
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