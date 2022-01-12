<template>
  <div class="counter-currency">
    <div class="counter-currency-head">
      <div class="counter-currency-head-outin">
        <span>支出记录总共：</span>
        <span class="counter-currency-head-span">{{ outMoneyNum }} </span>
        <span> &nbsp; 条，总金额：</span>
        <span class="counter-currency-head-span">{{ outMoney }}  </span>
        <span> &nbsp; 元（人民币）。</span>
        <br/>
        <span>收入记录总共：</span>
        <span class="counter-currency-head-span">{{ inMoneyNum }}</span>
        <span> &nbsp; 条，总金额：</span>
        <span class="counter-currency-head-span">{{ inMoney }}</span>
        <span> &nbsp; 元（人民币）。</span>
      </div>
      <div class="counter-currency-head-system">
        <el-button type="small" @click="addOut">添加支出</el-button>
        <el-button type="small" @click="addIn">添加收入</el-button>
        <el-button type="small" style="margin-right: 10px" @click="outExecl">导出表格</el-button>
      </div>
    </div>
    <div class="counter-currency-select">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
        <span>选择周期：</span>
        <el-date-picker
            v-model="form.selectDate"
            type="daterange"
            start-placeholder="Start date"
            end-placeholder="End date"
            :default-time="form.defaultTime"
        ></el-date-picker>
        <span>选择类型：</span>
        <el-select v-model="form.selectType" placeholder="选择收支类型" style="width: 20%">
          <el-option label="全部类型" value="0"></el-option>
          <el-option v-for="(item,index)  in currencyTypes" :label="item.label" :value="item.label"
                     :key="index"></el-option>
        </el-select>
        <el-button type="primary" @click="selectTypes" style="margin-left: 10px">查询</el-button>
      </el-card>
    </div>
    <div class="counter-currency-body">
      <el-card class="box-card-table" shadow="hover">
        <div class="box-card-table-head">
          <span>收支详细记录</span>
        </div>
        <div>
          <el-table
              :data="
      bills.filter(
        (data) =>
          !form.search || data.name.toLowerCase().includes(form.search.toLowerCase())
      )
    "
              style="width: 100%"
          >
            <el-table-column type="selection" width="35"/>
            <el-table-column label="时间" sortable prop="billTime"/>
            <el-table-column label="收支类型" prop="billType"/>
            <el-table-column label="消费金额" prop="billMoney"/>
            <el-table-column label="明细内容" prop="billText"/>
            <el-table-column label="员工信息" prop="billWorker"/>
            <el-table-column label="支付方式" prop="payType"/>
            <el-table-column label="备注" prop="billRemark"/>
            <el-table-column align="right">
              <template #header>
                <el-input v-model="form.search" size="mini" placeholder="Type to search"/>
              </template>
              <template #default="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                >Edit
                </el-button
                >
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >Delete
                </el-button
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
              :total=alltotal
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
        :title="dialogType"
        width="30%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
        <div>
          <span>时间：</span>
          <el-date-picker v-model="form.dialogtime" type="date" placeholder="时间" style="width: 50%">
          </el-date-picker>
        </div>
        <div style="margin-top: 5px">
          <span>类型：</span>
          <el-select v-model="form.selectType" placeholder="选择收支类型" style="width: 50%">
            <el-option v-for="(item,index)  in currencyTypes" :label="item.label" :value="item.label"
                       :key="index"></el-option>
          </el-select>
        </div>
        <div style="margin-top: 5px">
          <span>内容：</span>
          <el-input v-model="form.dialogText" clearable="true" style="width: 50%"/>
        </div>
        <div style="margin-top: 5px">
          <span>金额：</span>
          <el-input v-model="form.dialogMoney" clearable="true" style="width: 50%"/>
        </div>
        <div style="margin-top: 5px">
          <span>员工：</span>
          <el-select v-model="form.dialogMan" placeholder="请选择员工" style="width: 50%">
            <el-option v-for="(item,index)  in workMans" :label="item.workName" :value="item.workName"
                       :key="index"></el-option>
          </el-select>
        </div>
        <el-input v-model="form.dialogRemark" style="width: 60%;margin-top: 5px" type="textarea" placeholder="备注"></el-input>
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

  <div class="dialogs">
    <el-dialog
        v-model="dialogVisibleEdit"
        :title="dialogType"
        width="30%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
        <div style="margin-top: 5px">
          <span>内容：</span>
          <el-input v-model="form.dialogTextEdit" clearable="true" style="width: 50%"/>
        </div>
        <div>
          <span>金额：</span>
          <el-input v-model="form.dialogMoneyEdit" clearable="true" style="width: 50%"/>
        </div>
        <div style="margin-top: 5px">
          <span>员工：</span>
          <el-select v-model="form.dialogManEdit" placeholder="请选择员工" style="width: 50%">
            <el-option v-for="(item,index)  in workMans" :label="item.workName" :value="item.workName"
                       :key="index"></el-option>
          </el-select>
        </div>
        <el-input v-model="form.dialogRemarkEdit" style="width: 60%;margin-top: 5px" type="textarea" placeholder="备注"></el-input>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取消</el-button>
        <el-button type="primary" @click="dialogVisibleEdit = false"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import selectItem from "../../utils/selectItem";
import {getBill} from "../../api/bill";
import {getWorker} from "../../api/worker";

export default {
  name: "Currency",
  setup() {
    const data = reactive({
      outMoneyNum: 0,
      outMoney: 0,
      inMoneyNum: 0,
      bills: [],
      workMans:[],
      inMoney: 0,
      currentPage: 1,
      pageSize: 10,
      alltotal: '',
      dialogVisible: false,
      dialogVisibleEdit:false,
      currencyTypes:selectItem.CURRENCYTYPE,
      dialogType: '',
      form: {
        selectDate: '',
        selectType: '',
        dialogMan:'',
        dialogTextEdit:'',
        search: '',
        dialogtime: '',
        dialogType: '',
        dialogMoney: '',
        dialogText: '',
        dialogRemark: '',
        dialogMoneyEdit:'',
        dialogManEdit:'',
        dialogRemarkEdit:'',
        defaultTime: [
          new Date(2000, 1, 1, 0, 0, 0),
          new Date(2000, 2, 1, 23, 59, 59),],
      }
    })

    const addIn = () => {
      data.dialogType = "添加收入"
      data.dialogVisible = true
    }
    const addOut = () => {
      data.dialogType = "添加支出"
      data.dialogVisible = true
    }
    const outExecl = () => {
      console.log("导出表格");
    }
    const selectTypes = () => {
      console.log("aaa")
      console.log(data.form.selectDate[0]);
      console.log(data.form.selectDate[1]);
      console.log(data.form.selectType)
      console.log("查询");
    }
    const handleEdit = (index, row) => {
      console.log(index, row)
      data.dialogVisibleEdit=true
      data.form.dialogMoneyEdit=row.billMoney
      data.form.dialogManEdit=row.billWorker
      data.form.dialogTextEdit=row.billText
      data.form.dialogRemarkEdit=row.billRemark
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
    onBeforeMount(() => {
      data.alltotal = data.outMoneyNum + data.inMoneyNum
      data.inMoney=0,data.inMoneyNum=0,data.outMoneyNum=0,data.outMoney=0
      getBill().then((res)=>{
        data.bills=res
        for (const resKey in res) {
          data.bills[resKey].billType=data.bills[resKey].billType==1?"收入":"支出"
          data.bills[resKey].billType==1?data.outMoneyNum++:data.inMoneyNum++
          data.bills[resKey].billType==1?data.outMoney=data.outMoney+data.bills[resKey].billMoney:data.inMoney=data.inMoney+data.bills[resKey].billMoney
        }
      })
      getWorker().then((res)=>{
        data.workMans=res;
      })
    })
    return {
      ...toRefs(data), addIn, addOut, outExecl, selectTypes,
      handleEdit, handleDelete, handleSizeChange, handleCurrentChange,
      handleClose,
    }
  }
}
</script>

<style scoped>
.counter-currency-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.counter-currency-head-outin {
  padding-top: 5px;
  width: 31%;
  height: 30%;

}

/*.counter-currency-head-in{
  margin-top: 5px;
  width: 30%;
  height: 30%;
  display: flex;
  justify-content: left;
}*/
.counter-currency-head-span {
  color: #f5576c;
}

.counter-currency-head-system {
  width: 65%;
  height: 50%;
  margin-left: 4%;
  position: relative;
  display: flex;
  justify-content: right;
  top: 10px;

}

.counter-currency-select {
  margin-top: 5px;
}

.counter-currency-body {
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