<template>
  <div class="finance-worker">
    <div class="finance-worker-head">
      <div class="finance-worker-head-title">
        <span>查询到总共有：</span>
        <span style="color: #f5576c">{{ workerNum }}</span>
        <span>位员工，当月总工资：</span>
        <span style="color: #f5576c">{{ allPay }}</span>
        <span>元。本月工资</span>
        <span style="color: #f5576c">{{ isPay }}</span>
      </div>
      <div class="finance-worker-head-system">
        <el-button type="small" @click="payToWorker">发放工资</el-button>
        <el-button type="small" @click="SetterCommission">提成调整</el-button>
      </div>
    </div>
    <div class="finance-worker-body">
      <el-scrollbar height="100%">
        <el-card class="box-card-table" shadow="hover" v-for="(item,index) in workers" :key="index">
          <el-descriptions :title=" item.workName">
            <el-descriptions-item label="联系方式">{{ item.workPhone }}</el-descriptions-item>
            <el-descriptions-item label="银行卡">{{ item.workBank }}</el-descriptions-item>

            <el-descriptions-item label="操作">
              <el-button size="mini" type="warning" @click="editWorker(item)">修改</el-button>
            </el-descriptions-item>
            <el-descriptions-item label="基础工资">
              <el-tag size="24px" style="font-size: 16px">{{ item.baseSalary }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="提成">
              <el-tag size="24px" style="font-size: 16px">{{ item.bonus }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="最终发放">
              <el-tag size="24px" style="font-size: 16px">{{ item.baseSalary+item.bonus }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-scrollbar>
    </div>
  </div>
  <div class="dialogs">
    <el-dialog
        v-model="dialogVisible"
        :title="form.workname"
        width="50%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
        <div>
          <span>银行卡号：</span>
          <el-input v-model="form.bankid" clearable="true" style="width: 50%"/>
        </div>
        <div style="margin-top: 5px">
          <span>基础工资：</span>
          <el-input v-model="form.money1" clearable="true" style="width: 50%"/>
        </div>
        <div style="margin-top: 5px">
          <span>提成工资：</span>
          <el-input v-model="form.money2" clearable="true" style="width: 50%"/>
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
import {onBeforeMount, reactive, toRefs} from "vue";
import {useStore} from "vuex";
import {getWorker, upWorker} from "../../api/worker";
const {ElMessage} = require("element-plus");
import router from "../../router";
const {watch} = require("vue");
const {payRoll} = require("../../api/worker");

export default {
  name: "Worker",
  setup: function () {
    const store = useStore();
    const data = reactive({
      dialogVisible: false,
      workerNum: 0,
      allPay: 0,
      isPay: '未发放',
      workers: [],
      form: {
        workname: '', //名字
        bankid: '', //银行卡
        money1: '',  //基础工资
        money2: '',  //提成
      }
    })
    const payToWorker = () => {
      for (let i = 0; i < data.workers.length; i++) {
        payRoll({"saWorkId":data.workers[i].workId,"saMoney":data.workers[i].baseSalary,"saBonus":data.workers[i].bonus}).then((res)=>{
          if (res==1){
            ElMessage({
              message: data.workers[i].workName+'工资已成功发放',
              type: 'success',
            })
            // 将本月奖金归零
            upWorker({"workId":data.workers[i].workId,"bonus":0})
            // 更新员工工资信息
            getWorker().then((res) => {
              data.workers = res
            })
            data.isPay="已发放"
          }else {
            ElMessage.error(data.workers[i].workName+'工资发放失败.')
          }
        })
      }

    }
    const SetterCommission = () => {
      router.push("/system/bonus")
    }
    // 修改工资信息
    const editWorker = (value) => {
      console.log(value);
      let _form = data.form
      _form.workname = "修改工资信息(" + value.workName + ")"
      _form.bankid = value.workBank
      _form.money1 = value.baseSalary
      _form.money2 = value.bonus
      data.dialogVisible = true
    }
    const handleClose = (done) => {
      console.log(done);
    }
    watch(()=>data.allPay,()=>{//通过一个函数返回要监听的属性
      // 当总工资发生变化时，提示本月工资未发放
      data.isPay="未发放"
    })
    onBeforeMount(() => {
      data.workers = store.state.selectItem.WORKMANS
      getWorker().then((res) => {
        data.workers = res
      })
      data.workerNum = store.state.selectItem.WORKMANS.length
      for (let i = 0; i < data.workerNum; i++) {
        data.allPay = data.allPay + data.workers[i].baseSalary + data.workers[i].bonus
      }
    })

    return {
      ...toRefs(data), payToWorker, SetterCommission, editWorker, handleClose,
    }
  }
}
</script>

<style scoped>
.finance-worker-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.finance-worker-head > div {
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}

.finance-worker-head-title {
  padding-top: 10px;
}

.finance-worker-head-system {
  width: 60%;
  height: 50%;
  margin-left: 4%;
  position: relative;
  display: flex;
  justify-content: right;
  top: 5px;
}

.finance-worker-body {
  margin-top: 5px;
  height: 600px;
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

</style>