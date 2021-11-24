<template>
  <div class="system-serviceList">
    <div class="system-serviceList-head">
      <div class="system-serviceList-head-title">
        <span>查询到总共有：</span>
        <span style="color: #f5576c">{{serviceNum}}</span>
        <span>种服务项目</span>
      </div>
      <div class="system-serviceList-head-system">
        <el-button type="small" @click="addService">添加服务项目</el-button>
      </div>
    </div>
    <div class="system-serviceList-body">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>项目列表</span>
        </div>
        <div>
          <el-table
              :data="
      sevriceList.filter(
        (data) =>
          !form.search || data.name.toLowerCase().includes(form.search.toLowerCase())
      )
    "
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="编号" prop="serviceId" />
            <el-table-column label="项目名称" prop="serviceName" />
            <el-table-column label="价格" prop="servicePrice" />
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
              :total=allStaff
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
  name: "ServiceList",
  setup(){
    const data=reactive({
      serviceNum:20,
      dialogVisible: false,
      currentPage:1,
      pageSize:10,
      allStaff:20,
      form:{
        search:'',
      },
      sevriceList:[],
    })
    const addService = () => {

    }
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
      ...toRefs(data),addService,handleEdit,handleDelete,handleSizeChange,handleCurrentChange,
    }
  }
}
</script>

<style scoped>
.system-serviceList-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}
.system-serviceList-head>div{
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}
.system-serviceList-head-title{
  padding-top: 10px;
}
.system-serviceList-head-system{
  width: 80%;
  height: 50%;
  margin-left: 4%;
  position: relative;
  display: flex;
  justify-content: right;
  top: 5px;
}
.system-serviceList-body{
  margin-top: 5px;
}
.box-card-table {
  width: 100%;
  padding: 0 0;
  margin-top: 5px;
}

.box-card-table :hover {

}

.box-card-table > span {
  padding-left: 10px;
}

.box-card-table-head {
  display: flex;
  justify-content: left;
}
</style>