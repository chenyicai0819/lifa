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
          <el-descriptions :title=" item.label">
            <el-descriptions-item label="联系方式">{{ item.phone }}</el-descriptions-item>
            <el-descriptions-item label="银行卡">{{ item.bank }}</el-descriptions-item>

            <el-descriptions-item label="操作">
              <el-button size="mini" type="warning">修改</el-button>
            </el-descriptions-item>
            <el-descriptions-item label="基础工资">
              <el-tag size="24px" style="font-size: 16px">{{ item.basic }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="提成">
              <el-tag size="24px" style="font-size: 16px">{{ item.bonus }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="最终发放">
              <el-tag size="24px" style="font-size: 16px">{{ item.all }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: "Worker",
  setup() {
    const data = reactive({
      workerNum: 5,
      allPay: 25000,
      isPay: '未发放',
      wokrers: [{
        value: "1",
        label: "张三",
        phone: 15512341234,
        bank: 112233445566778899,
        basic: 3000,
        bonus: 2000,
        all: 5000
      },
        {value: "2", label: "李四", phone: 15512341234, bank: 112233445566778899, basic: 3000, bonus: 2000, all: 5000},
        {value: "3", label: "王五", phone: 15512341234, bank: 112233445566778899, basic: 3000, bonus: 2000, all: 5000},
        {value: "4", label: "贾六", phone: 15512341234, bank: 112233445566778899, basic: 3000, bonus: 2000, all: 5000},
        {value: "5", label: "王八", phone: 15512341234, bank: 112233445566778899, basic: 3000, bonus: 2000, all: 5000}]
    })
    const payToWorker = () => {

    }
    const SetterCommission = () => {

    }

    return {
      ...toRefs(data), payToWorker, SetterCommission,
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