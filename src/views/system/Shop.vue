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
        <el-button type="small" @click="dialogVisible = true,titles='添加商品'">添加商品</el-button>
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
            <el-table-column label="编号" prop="commId" />
            <el-table-column label="商品名称" prop="commName" />
            <el-table-column label="价格" prop="commPrice" />
            <el-table-column label="库存" prop="commNum" />
            <el-table-column label="状态" prop="commState" />
            <el-table-column align="right">
              <template #header>
                <el-input v-model="form.search" size="mini" placeholder="Type to search" />
              </template>
              <template #default="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
                >
                <el-popconfirm
                    title="确定要删除这个商品吗?"
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
        :title=titles
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
          <span>商品类别：</span>
          <el-select v-model="form.dialogTypes" placeholder="请选择类别" style="width: 30%">
            <el-option v-for="(item)  in shopTypeList" :label="item.commtyName" :value="item.commtyId"
                       :key="item.commtyId"></el-option>
          </el-select>
        </div>
        <div style="margin-top: 5px">
          <span>商品价格：</span>
          <el-input v-model="form.dialogPrice" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>商品库存：</span>
          <el-input v-model="form.dialogDepot" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>商品状态：</span>
          <el-select v-model="form.dialogState" placeholder="商品状态" style="width: 30%">
            <el-option label="上线" value="上线" ></el-option>
            <el-option label="下线" value="下线"></el-option>
          </el-select>
        </div>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false,titles='修改商品信息'">取消</el-button>
        <el-button type="primary" @click="addShop"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import {priceGetComm} from "../../api/commoditys";
const {useStore} = require("vuex");
const {pageGetComm, addComm, upComm, delComm} = require("../../api/commoditys");
const {ElMessage} = require("element-plus");

export default {
  name: "Shop",
  setup(){
    const store = useStore();
    const data=reactive({
      titles:'',
      shopNum:0,
      shopMoney:0,
      form:{
        search:'',
        dialogId:'',
        dialogName:'',
        dialogPrice:'',
        dialogDepot:'',
        dialogTypes:'',
        dialogState:'',
      },
      shopList:[],
      shopTypeList:[],
      dialogVisible: false,
      currentPage:1,
      pageSize:10,
    })
    /**
     * 根据条件判断
     * 添加新商品/修改商品
     */
    const addShop = () => {
      let st=data.form.dialogState=="上线"?1:0
      if (data.titles=="添加商品"){
        addComm({"commtyId":data.form.dialogTypes,"commName":data.form.dialogName,"commPrice":data.form.dialogPrice,
          "commNum":data.form.dialogDepot,"commState":st}).then((res)=>{
          if (res==1){
            ElMessage({
              message: '添加商品成功',
              type: 'success',
            })
            // 刷新商品信息
            pageGetComms()
            data.dialogVisible=false
          }else {
            ElMessage.error('添加商品失败.')
          }
        }).catch(()=>{
          ElMessage.error('添加商品失败.')
        })
      }else if (data.titles=="修改商品信息"){
        // console.log(data.form.dialogState);

        upComm({"commId":data.form.dialogId,"commtyId":data.form.dialogTypes,"commName":data.form.dialogName,"commPrice":data.form.dialogPrice,
          "commNum":data.form.dialogDepot,"commState":st}).then((res)=>{
          if (res==1){
            ElMessage({
              message: '修改商品信息成功',
              type: 'success',
            })
            // 刷新
            pageGetComms()
            data.dialogVisible=false
            data.form.dialogDepot='';data.form.dialogPrice='';data.form.dialogName='';data.form.dialogTypes='';data.form.dialogState=1
          }else {
            ElMessage.error('修改商品信息商品失败.')
          }
        }).catch(()=>{
          ElMessage.error('修改商品信息失败.')
        })
      }

      // data.dialogVisible=false
    }

    /**
     * 更新商品数据信息
     */
    const handleEdit = (index, row) => {
      // console.log(index, row)
      // console.log(row)
      data.form.dialogId=row.commId
      // console.log(data.form.dialogId);
      // let st=row.commState=="上线"?1:0
      // console.log(st);
      data.form.dialogDepot=row.commNum;data.form.dialogPrice=row.commPrice;data.form.dialogName=row.commName;
      data.form.dialogTypes=row.commtyId;data.form.dialogState=row.commState
      data.titles="修改商品信息"
      data.dialogVisible=true
    }
    /**
     *
     * 删除该商品
     */
    const handleDelete = (index, row) => {
      // console.log(index, row)
      delComm({"id":row.commId}).then((res)=>{
        if (res==1){
          ElMessage({
            message: '商品删除成功',
            type: 'success',
          })
          pageGetComms()
        }else {
          ElMessage.error('商品删除失败.')
        }
      }).catch(()=>{
        ElMessage.error('商品删除失败.')
      })
    }
    const handleSizeChange = (val) => {
      data.pageSize=val
      data.currentPage=1
      pageGetComms()
    }
    const handleCurrentChange = (val) => {
      data.currentPage=val
      pageGetComms()
    }
    const handleClose = () => {

    }

    /**
     * 分页获取商品
     */
    const pageGetComms = () => {
      pageGetComm({"pagesize":data.pageSize,"now":data.currentPage}).then((res)=>{
        data.shopList=res;
        for (let i = 0; i < data.shopList.length; i++) {
          // 根据状态数字切换为中文，方便查看
          if(data.shopList[i].commState==1 ||data.shopList[i].commState=="上线"){
            data.shopList[i].commState="上线"
          }else {
            data.shopList[i].commState="下线"
          }
        }
      })
    }

    /**
     * 获取商品总价
     */
    const getPriceAll = () => {
      priceGetComm().then((res)=>{
        data.shopMoney=res
      })
    }

    onBeforeMount(() => {
      data.shopTypeList=store.state.selectItem.COMMTYPE //所有商品类别
      data.shopList=store.state.selectItem.COMMODITYS //所有商品
      data.shopNum=data.shopList.length //所有商品数量
      getPriceAll()
      pageGetComms()
    })

    return{
      ...toRefs(data),addShop,handleEdit,handleDelete,handleSizeChange,handleCurrentChange,handleClose,pageGetComms,
      getPriceAll,

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