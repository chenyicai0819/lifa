<template>
  <div class="system-cardtype">
    <div class="system-cardtype-head">
      <div class="system-cardtype-head-title">
        <span>查询到总共有：</span>
        <span style="color: #f5576c">{{cardTypeNum}}</span>
        <span>种会员卡类型</span>
      </div>
      <div class="system-cardtype-head-system" v-if="activeName=='cardType-1'">
        <el-button type="small" @click="addCardType">添加会员卡类型</el-button>
      </div>
    </div>
    <div class="system-cardtype-tabs">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick" class="counter-index-body-tab">
        <el-tab-pane label="会员卡设置" name="cardType-1"></el-tab-pane>
        <el-tab-pane label="开卡充值设置" name="cardType-2"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="system-cardtype-head-body-1" v-if="activeName=='cardType-1'">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>会员卡列表</span>
        </div>
        <div>
          <el-table
              :data="
      cardList.filter(
        (data) =>
          !form.search || data.name.toLowerCase().includes(form.search.toLowerCase())
      )
    "
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="编号" prop="typeId" />
            <el-table-column label="会员卡名称" prop="vipType" />
            <el-table-column label="项目折扣" prop="vipDiscount" />
            <el-table-column label="备注(开卡充值)" prop="vipRemark" />
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
              :page-sizes="[20, 50, 100, 200]"
              :page-size=pageSize
              layout="total, sizes, prev, pager, next, jumper"
              :total=cardTypeNum
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <div class="system-cardtype-head-body-2" v-else-if="activeName=='cardType-2'">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>开卡充值设置</span>
        </div>
        <div>
          <el-table
              :data="openList"
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="编号" prop="typeId" />
            <el-table-column label="会员卡名称" prop="vipType" />
            <el-table-column label="开卡充值" prop="vipRemark" />
            <el-table-column align="right">
              <template #default="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
                >
                <el-popconfirm
                    title="确定要删除这个类型吗?"
                    confirm-button-text="删除"
                    cancel-button-text="取消"
                    @confirm="handleDelete(scope.$index, scope.row)"
                >
                  <template #reference>
                    <el-button
                        size="mini"
                        type="danger"
                    >Delete</el-button
                    >
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>

<!--  弹框-->
  <div class="dialogs">
    <el-dialog
        v-model="dialogVisible"
        title="添加会员类型"
        width="50%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
        <div>
          <span>卡名：</span>
          <el-input v-model="form.dialogName" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>开卡充值：</span>
          <el-input v-model="form.dialogOpenPay" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>项目折扣：</span>
          <el-input v-model="form.dialogCardDiscount1" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>备注(开卡充值)：</span>
          <el-input v-model="form.dialogReMark" clearable="true" style="width: 30%"/>
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

  <div class="dialogs">
    <el-dialog
        v-model="dialogVisibleForUpdate"
        title="修改开卡充值"
        width="50%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
        <div>
          <span>卡名：</span>
          <el-input v-model="form.dialogName" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>开卡充值：</span>
          <el-input v-model="form.dialogOpenPay" clearable="true" style="width: 30%"/>
        </div>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleForUpdate = false">取消</el-button>
        <el-button type="primary" @click="dialogVisibleForUpdate = false"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
const {useStore} = require("vuex");
const {allVipsType, delVipsType} = require("../../api/vips");
const {ElMessage} = require("element-plus");

export default {
  name: "CardType",
  setup: function () {
    const store = useStore();
    const data = reactive({
      activeName: 'cardType-1',
      cardTypeNum: 4,
      cardTypes: [],
      pends: [],
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      dialogVisibleForUpdate: false,
      vipTypes: [],
      form: {
        search: '',
        vipType: '',
        dialogName: '',
        dialogOpenPay: '',
        dialogCardDiscount1: '',
        dialogCardDiscount2: '',
        dialogCardDiscount3: '',
        dialogReMark: '',
      },
      cardList: [], //卡类型列表
      openList: [], // 开卡充值列表
    })
    const handleClick = (tab, event) => {
      console.log(tab, event)
    }

    /**
     * 获取全部卡类型
     */
    const getAllCardType = () =>{
      allVipsType().then((res)=>{
        // console.log(res);
        data.cardList=res;
        data.openList=res;
      })
    }
    /**
     * 添加卡类型
     *
     */
    const addCardType = () => {
      // console.log("添加卡类型");
      data.dialogVisible = true
    }
    /**
     * 修改卡类型
     * @param index
     * @param row
     */
    const handleEdit = (index, row) => {
      console.log(index, row)
      let form_ = data.form
      if (data.activeName === 'cardType-1') {
        form_.dialogName = row.typeId;
        form_.dialogOpenPay = row.vipType;
        form_.dialogCardDiscount1 = row.vipDiscount;
        form_.dialogReMark = row.vipRemark;

        data.dialogVisible = true
      } else {
        form_.dialogName = row.vipType
        form_.dialogOpenPay = row.vipRemark
        data.dialogVisibleForUpdate = true
      }
    }

    /**
     * 删除会员类型
     * @param index
     * @param row
     */
    const handleDelete = (index, row) => {
      delVipsType({"id":row.typeId}).then((res)=>{
        if (res==1){
          ElMessage({
            message: '类型删除成功',
            type: 'success',
          })

        }else {
          ElMessage.error('类型删除失败.')
        }
      }).catch(()=>{
        ElMessage.error('类型删除失败.')
      })
    }
    const handleSizeChange = (val) => {
      data.pageSize = val
      data.currentPage = 1
    }
    const handleCurrentChange = (val) => {
      data.currentPage = val
    }
    const handleClose = () => {

    }

    onBeforeMount(() => {
      // getAllCardType()
      data.cardList = store.state.selectItem.VIPTYPES
      data.openList = store.state.selectItem.VIPTYPES
      data.cardTypeNum=data.cardList.length
    })

    return {
      ...toRefs(data), handleClick, addCardType, handleDelete, handleEdit, handleSizeChange, handleCurrentChange,
      handleClose,getAllCardType,
    }
  }
}
</script>

<style scoped>
.system-cardtype-head{
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}
.system-cardtype-head>div{
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}
.system-cardtype-head-title{
  padding-top: 10px;
}
.system-cardtype-head-system{
  width: 80%;
  height: 50%;
  margin-left: 4%;
  position: relative;
  display: flex;
  justify-content: right;
  top: 5px;
}
.system-cardtype-tabs{
  margin-top: 10px;
}
/deep/ .el-tabs__item {
  background-color: #EBEEF5;
  font-weight: bold;
  margin-left: 5px;
}

/deep/ .el-tabs__item.is-active {
  background-color: #FFFFFF;
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