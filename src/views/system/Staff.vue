<template>
  <div class="system-staff">
    <div class="system-staff-head">
      <div>
        <el-select v-model="form.staffStart" placeholder="状态" style="width: 30%;margin-right: 5px" @change="getSomeWorkers">
          <el-option label="全部" value="0"></el-option>
          <el-option label="在职" value="1"></el-option>
          <el-option label="离职" value="2"></el-option>
        </el-select>
        <el-select v-model="form.staffLevel" placeholder="级别" style="width: 30%;margin-right: 5px" @change="getSomeWorkers">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,index)  in staffLevels" :label="item.levelName" :value="item.levelId"
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
        <div style="overflow-x: hidden;overflow-y: scroll;height: 450px;">
          <el-table
              :data="
      workers.filter(
        (data) =>
          !form.search || data.workName.toLowerCase().includes(form.search.toLowerCase())
      )
    "
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="工号" prop="workId" />
            <el-table-column label="姓名" prop="workName" />
            <el-table-column label="性别" prop="workSex" />
            <el-table-column label="手机号码" prop="workPhone" />
            <el-table-column label="等级" prop="levelId" />
            <el-table-column label="状态" prop="workState" />
            <el-table-column label="入职时间" prop="workDate" />
            <el-table-column align="right">
              <template #header>
                <el-input v-model="form.search" size="mini" placeholder="搜索姓名" />
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
        :title="title"
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
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
          <span>级别：</span>
          <el-select v-model="form.staffLevel" placeholder="级别" style="width: 30%;margin-right: 5px">
            <el-option v-for="(item,index)  in staffLevels" :label="item.levelName" :value="item.levelId"
                       :key="index"></el-option>
          </el-select>
        </div>
        <div style="margin-top: 5px">
          <span>手机：</span>
          <el-input v-model="form.dialogPhone" clearable="true" style="width: 30%"/>
          <span>入职时间：</span>
          <el-date-picker v-model="form.dialogInTime" type="date" placeholder="入职时间" style="width: 26%"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD HH:mm:ss">
          </el-date-picker>
        </div>
        <div style="margin-top: 5px">
          <span>生日：</span>
          <el-date-picker v-model="form.dialogBirthday" type="date" placeholder="员工生日" style="width: 30%"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD HH:mm:ss">
          </el-date-picker>
          <span>身份证号：</span>
          <el-input v-model="form.dialogIDcard" clearable="true" style="width: 26%"/>
        </div>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addWorker" v-if="title=='添加员工'">确认添加</el-button>
        <el-button type="primary" @click="upDataWorker" v-if="title=='修改员工信息'">确认修改</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import {addWorkers, upWorker} from "../../api/worker";
import formatDate from "../../utils/date";
const {useStore} = require("vuex");
const {ElMessage} = require("element-plus");
const {getWorkerLevel, getWorker, getSomeWorker, getWorkForId} = require("../../api/worker");

export default {
  name: "Staff",
  setup: function () {
    const store = useStore();
    const data = reactive({
      staffLevels: [],
      workers: [],
      allStaff: 0,
      currentPage: 1,
      dialogVisible: false,
      pageSize: 10,
      title:'添加员工',
      form: {
        search: '',
        staffStart: '',
        staffLevel: '',
        dialogId: '',
        dialogName: '',
        dialogSex: '',
        dialogPhone: '',
        dialogInTime: '',
        dialogIDcard: '',
        dialogBirthday: '',
        dialogOldBirthday: '',
        dialogOldInTime:'',
      }
    })

    /**
     * 添加新员工
     */
    const addStaff = () => {
      data.title="添加员工"
      data.dialogVisible = true
    }
    /**
     * 编辑员工信息
     * @param index
     * @param row
     */
    const handleEdit = (index, row) => {
      // console.log(index, row)
      let form_ = data.form
      getWorkForId({"id":row.workId}).then((res)=>{
        form_.dialogInTime = res.workDate;
        form_.dialogOldInTime=res.workDate;
        form_.dialogBirthday = res.workBirthday;
        form_.dialogOldBirthday = res.workBirthday;
      })
      data.title="修改员工信息"
      form_.dialogId = row.workId;
      form_.dialogName = row.workName;
      form_.dialogSex = row.workSex;
      form_.staffLevel = row.levelId;
      form_.dialogPhone = row.workPhone;
      form_.dialogIDcard = row.workIDcard;


      data.dialogVisible = true
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }
    const handleSizeChange = (val) => {
      data.pageSize = val
      data.currentPage = 1
    }
    const handleCurrentChange = (val) => {
      data.currentPage = val
    }
    const handleClose = (done) => {
      console.log(done);
    }
    /**
     * 根绝条件查询员工，下拉框发生变化时触发
     */
    const getSomeWorkers = () => {
      getSomeWorker({"state":data.form.staffStart,"level":data.form.staffLevel}).then((res)=>{
        data.workers=res
        for (let i = 0; i < res.length; i++) {
          // 根据id判断状态
          data.workers[i].workState = data.workers[i].workState == 1 ? "在职" : "休假"
          data.workers[i].workDate=formatDate(res[i].workDate)
          // 根据类型id判断员工等级
          let obj = data.staffLevels.find(function (obj) {
            return obj.levelId == data.workers[i].levelId
          })
          data.workers[i].levelId = obj.levelName
        }
      })
    }
    // 添加新员工
    const addWorker = () => {
      addWorkers({"workId":data.form.dialogId,"levelId":data.form.staffLevel,"workName":data.form.dialogName,
      "workSex":data.form.dialogSex,"workPhone":data.form.dialogPhone,"workState":1,"workDate":data.form.dialogInTime,
      "workBirthday":data.form.dialogBirthday,"workIDcard":data.form.dialogIDcard,"workBank":""}).then((res)=>{
        if (res==1){
          ElMessage({
            message: '添加新员工成功',
            type: 'success',
          })
          data.dialogVisible = false
          //成功后重新获取员工列表
          GetWorkerApi()
        }else{
          ElMessage.error('添加新员工失败.')
        }
      }).catch(()=>{
        ElMessage.error('添加新员工失败.')
      })
    }
    /**
     * 更新员工信息
     */
    const upDataWorker = () => {
      let upDatas={}
      if (data.form.dialogOldBirthday==data.form.dialogBirthday && data.form.dialogInTime==data.form.dialogOldInTime){
        upDatas={"workId":data.form.dialogId,"levelId":data.form.staffLevel,"workName":data.form.dialogName,
          "workSex":data.form.dialogSex,"workPhone":data.form.dialogPhone, "workIDcard":data.form.dialogIDcard}
      }else if (data.form.dialogOldBirthday==data.form.dialogBirthday){
        upDatas={"workId":data.form.dialogId,"levelId":data.form.staffLevel,"workName":data.form.dialogName,
          "workSex":data.form.dialogSex,"workPhone":data.form.dialogPhone,"workDate":data.form.dialogInTime,
          "workIDcard":data.form.dialogIDcard}
      }else if (data.form.dialogInTime==data.form.dialogOldInTime){
        upDatas={"workId":data.form.dialogId,"levelId":data.form.staffLevel,"workName":data.form.dialogName,
          "workSex":data.form.dialogSex,"workPhone":data.form.dialogPhone, "workBirthday":data.form.dialogBirthday,
          "workIDcard":data.form.dialogIDcard}
      }else {
        upDatas={"workId":data.form.dialogId,"levelId":data.form.staffLevel,"workName":data.form.dialogName,
            "workSex":data.form.dialogSex,"workPhone":data.form.dialogPhone,"workDate":data.form.dialogInTime,
            "workBirthday":data.form.dialogBirthday,"workIDcard":data.form.dialogIDcard}
      }
      upWorker(upDatas).then((res)=>{
        if (res==1){
          ElMessage({
            message: '修改员工信息成功',
            type: 'success',
          })
          data.dialogVisible = false
          //成功后重新获取员工列表
          GetWorkerApi()
        }else{
          ElMessage.error('修改员工信息失败.')
        }
      }).catch(()=>{
        ElMessage.error('出错了.')
      })
    }
    const GetWorkerApi = () => {
      data.staffLevels = store.state.selectItem.STAFFLEVELS
      data.workers = store.state.selectItem.WORKMANS
      data.allStaff=data.workers.length
      getWorkerLevel().then((res) => {
        data.staffLevels = res
      })
      getWorker().then((res)=>{
        data.workers=res
        for (let i = 0; i < res.length; i++) {
          // 根据id判断状态
          data.workers[i].workState = data.workers[i].workState == 1 ? "在职" : "休假"
          data.workers[i].workDate=formatDate(res[i].workDate)
          // 根据类型id判断员工等级
          let obj = data.staffLevels.find(function (obj) {
            return obj.levelId == data.workers[i].levelId
          })
          data.workers[i].levelId = obj.levelName
        }
      })
    }
    onBeforeMount(() => {
      GetWorkerApi()
    })
    return {
      ...toRefs(data), addStaff, handleDelete, handleEdit, handleSizeChange, handleCurrentChange, handleClose,addWorker,getSomeWorkers,
      upDataWorker,GetWorkerApi,
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