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
        <el-card class="box-card-table" shadow="hover" v-for="(item,index) in wokrers" :key="index">
          <el-descriptions :title=" item.workName">
            <el-descriptions-item label="联系方式">{{ item.workPhone }}</el-descriptions-item>
            <el-descriptions-item label="银行卡">{{ item.workBank }}</el-descriptions-item>

            <el-descriptions-item label="操作">
              <el-button size="mini" type="warning" @click="editWorker(item)">修改</el-button>
            </el-descriptions-item>
            <el-descriptions-item label="基础工资">
              <el-tag size="24px" style="font-size: 16px">{{ item.workBasic }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="提成">
              <el-tag size="24px" style="font-size: 16px">{{ item.workBonus }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="最终发放">
              <el-tag size="24px" style="font-size: 16px">{{ item.workSalary }}</el-tag>
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

export default {
  name: "Worker",
  setup() {
    const store =useStore();
    const data = reactive({
      dialogVisible: false,
      workerNum: 0,
      allPay: 0,
      isPay: '未发放',
      wokrers: [],
      form:{
        workname:'', //名字
        bankid:'', //银行卡
        money1:'',  //基础工资
        money2:'',  //提成
      }
    })
    const payToWorker = () => {

    }
    const SetterCommission = () => {

    }
    // 修改工资信息
    const editWorker = (value) => {
      console.log(value);
      let _form=data.form
      _form.workname="修改工资信息("+value.workName+")"
      _form.bankid=value.workBank
      _form.money1=value.workBasic
      _form.money2=value.workBonus
      data.dialogVisible=true
    }
    const handleClose = (done) => {
      console.log(done);
    }
    onBeforeMount(()=>{
      data.wokrers=store.state.selectItem.WORKMANS
      data.workerNum=store.state.selectItem.WORKMANS.length
      for (let i = 0; i < store.state.selectItem.WORKMANS.length; i++) {
        data.allPay=data.allPay+store.state.selectItem.WORKMANS[i].workSalary
      }
    })

    return {
      ...toRefs(data), payToWorker, SetterCommission,editWorker,handleClose,
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