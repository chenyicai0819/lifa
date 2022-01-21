<template>
  <div class="vips-guest">
    <div class="vips-guest-head">
      <div class="vips-guest-head-span">
        <span>查询到一共有：</span>
        <span style="color: #f5576c">{{allguests}}</span>
        <span>条散客记录！</span>
      </div>
    </div>
    <div class="vips-guest-select">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
        <span>查询信息：</span>
        <el-date-picker
            v-model="form.guestDate"
            type="daterange"
            start-placeholder="Start date"
            end-placeholder="End date"
            :default-time="form.defaultTime"
            style="margin-right: 10px"
        ></el-date-picker>
        <el-select v-model="form.vipsSex" placeholder="会员性别" style="width: 20%;margin-right: 10px">
          <el-option label="全部性别" value="0"></el-option>
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
        <el-button type="primary">查询</el-button>
      </el-card>
    </div>
    <div class="vips-guest-body">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>散客列表</span>
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
            <el-table-column label="客户姓名" prop="guestName" />
            <el-table-column label="客户性别" prop="guestType" />
            <el-table-column label="手机号码" prop="guestPhone" />
            <el-table-column label="消费项目" prop="guestBuy" />
            <el-table-column label="总消费" prop="guestPay" />
            <el-table-column label="最近消费时间" prop="guestRecentTime" />
            <el-table-column label="客户来源" prop="guestCome" />
            <el-table-column label="备注" prop="guestRemark" />
            <el-table-column label="工作人员" prop="workMan" />
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
              :page-sizes="[50, 100, 150, 200]"
              :page-size=pageSize
              layout="total, sizes, prev, pager, next, jumper"
              :total=allguests
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

const {useStore} = require("vuex");

export default {
  name: "Guest",
  setup(){
    const store =useStore();
    const data=reactive({
      allguests:112,
      pends:[],
      currentPage:1,
      pageSize:10,
      vipsTypes:[],
      form:{
        selectvips:'',
        vipsSex:'',
        vipsType:'',
        search:'',
        guestDate:'',
        defaultTime: [
          new Date(2000, 1, 1, 0, 0, 0),
          new Date(2000, 2, 1, 23, 59, 59),],
      }
    })

    const vipsOut = () => {

    }
    const vipsIn = () => {

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
    onBeforeMount(()=>{
      data.vipsTypes=store.state.selectItem.VIPTYPES
    })

    return{
      ...toRefs(data),vipsOut,vipsIn,handleDelete,handleEdit,handleSizeChange,handleCurrentChange
    }
  }
}
</script>

<style scoped>
.vips-guest-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}
.vips-guest-head-span{
  margin-top: 15px;
  margin-left: 5px;
}
.vips-guest-select{
  margin-top: 5px;

}
.box-card {
  width: 100%;
  padding: 0 0;
  margin-top: 5px;
  display: flex;
  justify-content: left;
}

.box-card :hover {

}

.box-card > span {
  padding-left: 10px;
}
.vips-guest-body{
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