<template>
  <div class="system-combo">
    <div class="system-combo-head">
      <div class="system-combo-head-title">
        <span>查询到总共有：</span>
        <span style="color: #f5576c">{{comboNum}}</span>
        <span>种疗程套餐</span>
      </div>
      <div class="system-combo-head-system">
        <el-button type="small" @click="addService">添加疗程套餐</el-button>
      </div>
    </div>
    <div class="system-combo-body">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>疗程套餐列表</span>
        </div>
        <div>
          <el-table
              :data="
      comboList.filter(
        (data) =>
          !form.search || data.name.toLowerCase().includes(form.search.toLowerCase())
      )
    "
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="编号" prop="comboId" />
            <el-table-column label="套餐名称" prop="comboName" />
            <el-table-column label="价格" prop="comboPrice" />
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
              :total=comboNum
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>

  <!--  弹框-->
  <div class="dialogs">
    <el-dialog
        v-model="dialogVisible"
        title="添加疗程套餐"
        width="50%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
        <div>
          <span>套餐名称：</span>
          <el-input v-model="form.dialogName" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>套餐价格：</span>
          <el-input v-model="form.dialogPrice" clearable="true" style="width: 30%"/>
        </div>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: "Combo",
  setup(){
    const data=reactive({
      comboNum:10,
      comboList:[],
      form:{
        search:'',
        dialogName:'',
        dialogPrice:'',
      },
      dialogVisible: false,
      currentPage:1,
      pageSize:10,
      // allStaff:20,
    })
    const addService = () => {
      data.dialogVisible=true
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
    const handleClose = () => {

    }

    return{
      ...toRefs(data),addService,handleEdit,handleDelete,handleSizeChange,handleCurrentChange,handleClose,
    }
  }
}
</script>

<style scoped>
.system-combo-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}
.system-combo-head>div{
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}
.system-combo-head-title{
  padding-top: 10px;
}
.system-combo-head-system{
  width: 80%;
  height: 50%;
  margin-left: 4%;
  position: relative;
  display: flex;
  justify-content: right;
  top: 5px;
}
.system-combo-body{
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