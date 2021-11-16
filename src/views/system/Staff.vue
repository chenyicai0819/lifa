<template>
  <div class="system-staff">
    <div class="system-staff-head">
      <div>
        <el-select v-model="form.staffStart" placeholder="状态" style="width: 30%;margin-right: 5px">
          <el-option label="全部" value="0"></el-option>
          <el-option label="在职" value="1"></el-option>
          <el-option label="离职" value="2"></el-option>
        </el-select>
        <el-select v-model="form.staffLevel" placeholder="级别" style="width: 30%;margin-right: 5px">
          <el-option label="全部" value="0"></el-option>
          <el-option v-for="(item,index)  in staffLevels" :label="item.label" :value="item.label"
                     :key="index"></el-option>
        </el-select>
      </div>
      <div class="system-staff-head-system">
        <el-button type="small" @click="addStaff">添加新员工</el-button>
      </div>
    </div>
    <div class="system-staff-body">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>员工列表</span>
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
            <el-table-column label="工号" prop="staffId" />
            <el-table-column label="姓名" prop="staffName" />
            <el-table-column label="性别" prop="staffSex" />
            <el-table-column label="手机号码" prop="staffPhone" />
            <el-table-column label="等级" prop="staffLevel" />
            <el-table-column label="状态" prop="staffStart" />
            <el-table-column label="入职时间" prop="staffInTime" />
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
  <div class="dialogs">
    <el-dialog
        v-model="dialogVisible"
        title="添加员工"
        width="50%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
        <div>
          <span>工号：</span>
          <el-input v-model="form.dialogId" clearable="true" style="width: 30%"/>
          <span>姓名：</span>
          <el-input v-model="form.dialogName" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>性别：</span>
          <el-select v-model="form.dialogSex" placeholder="性别" style="width: 30%;margin-right: 5px">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
          <span>级别：</span>
          <el-select v-model="form.staffLevel" placeholder="级别" style="width: 30%;margin-right: 5px">
            <el-option v-for="(item,index)  in staffLevels" :label="item.label" :value="item.label"
                       :key="index"></el-option>
          </el-select>
        </div>
        <div style="margin-top: 5px">
          <span>手机：</span>
          <el-input v-model="form.dialogPhone" clearable="true" style="width: 30%"/>
          <span>入职时间：</span>
          <el-date-picker v-model="form.dialogInTime" type="date" placeholder="会员生日" style="width: 26%">
          </el-date-picker>
        </div>
        <div style="margin-top: 5px">
          <span>生日：</span>
          <el-date-picker v-model="form.dialogBirthday" type="date" placeholder="会员生日" style="width: 30%">
          </el-date-picker>
          <span>身份证号：</span>
          <el-input v-model="form.dialogIDcard" clearable="true" style="width: 26%"/>
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
import selectItem from "../../utils/selectItem";

export default {
  name: "Staff",
  setup(){
    const data=reactive({
      staffLevels:selectItem.STAFFLEVELS,
      pends:[],
      allStaff:0,
      currentPage:1,
      dialogVisible: false,
      pageSize:10,
      form:{
        search:'',
        staffStart:'',
        staffLevel:'',
        dialogId:'',
        dialogName:'',
        dialogSex:'',
        dialogPhone:'',
        dialogInTime:'',
        dialogIDcard:'',
        dialogBirthday:'',
      }
    })
    const addStaff = () => {
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
    const handleClose = (done) => {
      console.log(done);
    }
    return{
      ...toRefs(data),addStaff,handleDelete,handleEdit,handleSizeChange,handleCurrentChange,handleClose,
    }
  }
}
</script>

<style scoped>
.system-staff-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}
.system-staff-head>div{
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}
.system-staff-head-system{
  width: 65%;
  height: 50%;
  margin-left: 4%;
  position: relative;
  display: flex;
  justify-content: right;
  top: 5px;
}
.system-staff-body{
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