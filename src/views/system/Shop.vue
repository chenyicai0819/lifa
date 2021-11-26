<template>
  <div class="system-shop">
    <div class="system-shop-head">
      <div class="system-shop-head-title">
        <span>查询到总共有：</span>
        <span style="color: #f5576c">{{shopNum}}</span>
        <span>种商品，总价值：</span>
        <span style="color: #f5576c">{{shopMoney}}</span>
        <span>元</span>
      </div>
      <div class="system-shop-head-system">
        <el-button type="small" @click="addShop">添加商品</el-button>
      </div>
    </div>
    <div class="system-shop-body">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>商品列表</span>
        </div>
        <div>
          <el-table
              :data="
      shopList.filter(
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
              :total=shopNum
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
        title="添加商品"
        width="50%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
        <div>
          <span>商品名称：</span>
          <el-input v-model="form.dialogName" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>商品价格：</span>
          <el-input v-model="form.dialogPrice" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>商品库存：</span>
          <el-input v-model="form.dialogDepot" clearable="true" style="width: 30%"/>
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
  name: "Shop",
  setup(){
    const data=reactive({
      shopNum:20,
      shopMoney:230,
      form:{
        search:'',
        dialogName:'',
        dialogPrice:'',
        dialogDepot:'',

      },
      shopList:[],
      dialogVisible: false,
      currentPage:1,
      pageSize:10,
    })
    const addShop = () => {
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
      ...toRefs(data),addShop,handleEdit,handleDelete,handleSizeChange,handleCurrentChange,handleClose,
    }
  }
}
</script>

<style scoped>
.system-shop-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}
.system-shop-head>div{
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}
.system-shop-head-title{
  padding-top: 10px;
}
.system-shop-head-system{
  width: 70%;
  height: 50%;
  margin-left: 4%;
  position: relative;
  display: flex;
  justify-content: right;
  top: 5px;
}
.system-shop-body{
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