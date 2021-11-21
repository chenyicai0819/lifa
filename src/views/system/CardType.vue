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
        <el-tab-pane label="会员卡设置" name="cardType-1">会员卡设置</el-tab-pane>
        <el-tab-pane label="开卡充值设置" name="cardType-2">开卡充值设置</el-tab-pane>
      </el-tabs>
    </div>
    <div class="system-cardtype-head-body-1" v-if="activeName=='cardType-1'">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>会员列表</span>
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
            <el-table-column label="编号" prop="cardId" />
            <el-table-column label="会员卡名称" prop="cardName" />
            <el-table-column label="项目折扣" prop="cardDiscount1" />
            <el-table-column label="商品折扣" prop="cardDiscount2" />
            <el-table-column label="套餐折扣" prop="cardDiscount3" />
            <el-table-column label="有效期" prop="cardValidPeriod" />
            <el-table-column label="备注" prop="cardRemark" />
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
      ddd
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import selectItem from "../../utils/selectItem";

export default {
  name: "CardType",
  setup(){
    const data=reactive({
      activeName:'cardType-1',
      cardTypeNum:4,
      cardTypes:selectItem.VIPTYPES,
      pends:[],
      currentPage:1,
      pageSize:10,
      form:{
        search:'',
      }
    })
    const handleClick = (tab, event) => {
      console.log(tab, event)
    }
    const addCardType = () => {
      console.log("添加卡类型");
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

    return{
      ...toRefs(data),handleClick,addCardType,handleDelete,handleEdit,handleSizeChange,handleCurrentChange
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