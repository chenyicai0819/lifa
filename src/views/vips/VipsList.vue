<template>
  <div class="vips-vipsList">
    <div class="vips-vipsList-head">
      <div class="vips-vipsList-head-span">
        <span>查询到一共有：</span>
        <span style="color: #f5576c">{{allvips}}</span>
        <span>位会员；卡金总共：</span>
        <span style="color: #f5576c">{{allvipmoney}}</span>
        <span>元！</span>
      </div>
      <div class="vips-vipsList-head-system">
        <el-button type="small" @click="vipsOut">导出备份</el-button>
        <el-button type="small" @click="vipsIn">批量导入会员</el-button>
      </div>
    </div>
    <div class="vips-vipsList-select">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
        <span>查询信息：</span>
<!--        <el-input v-model="form.selectvips" clearable="true" placeholder="会员姓名/卡号/手机号" style="width: 30%;margin-right: 10px"/>-->
        <el-select v-model="form.vipsType" placeholder="会员类型" style="width: 20%;margin-right: 10px">
          <el-option label="全部类型" value="0"></el-option>
          <el-option v-for="item  in vipsTypes" :label="item.vipType" :value="item.typeId"
                     :key="item.typeId"></el-option>
        </el-select>
        <el-select v-model="form.vipsSex" placeholder="会员性别" style="width: 20%;margin-right: 10px">
          <el-option label="全部性别" value="2"></el-option>
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
        </el-select>
        <el-button type="primary" @click="selectByList">查询</el-button>

      </el-card>
    </div>
    <div class="vips-vipsList-body">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>会员列表</span>
        </div>
        <div style="overflow-x: hidden;overflow-y: scroll;height: 450px;">
          <el-table
              :data="
      vipsList.filter(
        (data) =>
          !form.search || data.vipName.toLowerCase().includes(form.search.toLowerCase())
      )
    "
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="卡号" prop="vipId" />
            <el-table-column label="会员姓名" prop="vipName" />
            <el-table-column label="会员性别" prop="vipSex" />
            <el-table-column label="手机号码" prop="vipPhone" />
            <el-table-column label="会员类型" prop="typeId" />
            <el-table-column label="卡金" prop="vipsMoney" />
            <el-table-column label="总消费" prop="vipsConsume" />
            <el-table-column label="赠送金" prop="vipsBonus" />
            <el-table-column label="生日" prop="vipBirthday" />
            <el-table-column label="开卡时间" prop="vipOpencard" />
            <el-table-column label="最近消费时间" prop="vipsLast" />
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
              :page-sizes="[20, 50, 100, 200]"
              :page-size=pageSize
              layout="total, sizes, prev, pager, next, jumper"
              :total=allvips
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
<!--弹框、-->
  <div class="dialogs">
    <el-dialog
        v-model="dialogVisible"
        title="修改会员信息"
        width="50%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
        <p>主体内容</p>
        <div>
          <span>会员姓名：</span>
          <el-input v-model="edit.name" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>会员性别：</span>
          <el-select v-model="edit.sex" placeholder="性别" style="width: 30%;margin-right: 5px">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </div>
        <div style="margin-top: 5px">
          <span>联系方式：</span>
          <el-input v-model="edit.phone" clearable="true" style="width: 30%"/>
        </div>
        <div style="margin-top: 5px">
          <span>会员生日：</span>
          <el-date-picker v-model="edit.birthday" type="date" placeholder="员工生日" style="width: 30%"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD HH:mm:ss">
          </el-date-picker>
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
import formatDate from "../../utils/date";
import {getVips} from "../../api/vips";
const {pageGetVips, getVipByEvery, getOneForId} = require("../../api/vips");



export default {
  name: "VipsList",
  setup(){
    const store =useStore();
    const data=reactive({
      allvips:0,
      dialogVisible:false,
      allvipmoney:0,
      vipsList:[],
      currentPage:1,
      pageSize:10,
      vipsTypes:[],
      form:{
        selectvips:'',
        vipsSex:'',
        vipsType:'',
        search:'',
      },
      edit:{
        name:'',
        sex:'',
        phone:'',
        birthday:'',
      }
    })

    /**
     * 导出会员信息
     */
    const vipsOut = () => {
      window.location.href=store.state.users.outURL+"/vips/out"
    }
    /**
     * 根据条件查询会员
     */
    const selectByList = () => {
      console.log(data.form.vipsSex+","+data.form.vipsType)
      getVipByEvery({"vipSex":data.form.vipsSex,"typeId":data.form.vipsType}).then((res)=> {
        data.vipsList=res
        for (let i = 0; i < res.length; i++) {
          // 根据id判断会员男女
          data.vipsList[i].vipSex=res[i].vipSex=='1'?"男":"女"
          // 根据类型id判断会员类型名称
          let obj=data.vipsTypes.find(function (obj){
            return obj.typeId==data.vipsList[i].typeId
          })
          data.vipsList[i].typeId=obj.vipType
          data.vipsList[i].vipBirthday=formatDate(res[i].vipBirthday)
          data.vipsList[i].vipOpencard=formatDate(res[i].vipOpencard)
          data.vipsList[i].vipsLast=formatDate(res[i].vipsLast)
        }
      })
    }
    const vipsIn = () => {

    }
    const handleEdit = (index, row) => {
      // console.log(index, row)
      getOneForId({"id":row.vipId}).then((res)=>{
        data.edit.sex=res.vipSex
        data.edit.birthday=res.vipBirthday
      })
      // 点击修改会员信息后，给修改时的参数赋值，不直接影响原来的参数
      data.edit.name=row.vipName

      data.edit.phone=row.vipPhone

      data.dialogVisible=true
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }
    const handleSizeChange = (val) => {
      data.pageSize=val
      data.currentPage=1
      pageGetVip()
    }
    const handleCurrentChange = (val) => {
      data.currentPage=val
      pageGetVip()
    }

    /**
     * 分页获取会员信息
     */
    const pageGetVip = () => {
      pageGetVips({"pagesize":data.pageSize,"now":data.currentPage}).then((res)=>{
        data.vipsList=res
        for (let i = 0; i < res.length; i++) {
          // 根据id判断会员男女
          data.vipsList[i].vipSex=res[i].vipSex=='1'?"男":"女"
          // 根据类型id判断会员类型名称
          let obj=data.vipsTypes.find(function (obj){
            return obj.typeId==data.vipsList[i].typeId
          })
          data.vipsList[i].typeId=obj.vipType
          data.vipsList[i].vipBirthday=formatDate(res[i].vipBirthday)
          data.vipsList[i].vipOpencard=formatDate(res[i].vipOpencard)
          data.vipsList[i].vipsLast=formatDate(res[i].vipsLast)
        }

      })
    }
    // 在渲染之前获取会员列表
    onBeforeMount(()=>{
      data.vipsTypes=store.state.selectItem.VIPTYPES
      getVips().then((res)=>{
        data.vipsList=res
        data.allvips=res.length
        for (let i = 0; i < res.length; i++) {
          data.allvipmoney=data.allvipmoney+res[i].vipsMoney
          // 根据id判断会员男女
          data.vipsList[i].vipSex=res[i].vipSex=='1'?"男":"女"
          // 根据类型id判断会员类型名称
          let obj=data.vipsTypes.find(function (obj){
            return obj.typeId==data.vipsList[i].typeId
          })
          data.vipsList[i].typeId=obj.vipType
          data.vipsList[i].vipBirthday=formatDate(res[i].vipBirthday)
          data.vipsList[i].vipOpencard=formatDate(res[i].vipOpencard)
          data.vipsList[i].vipsLast=formatDate(res[i].vipsLast)
        }
      })
      pageGetVip()
    })

    return{
      ...toRefs(data),vipsOut,vipsIn,handleDelete,handleEdit,handleSizeChange,handleCurrentChange,pageGetVip,
      selectByList,
    }
  }
}
</script>

<style scoped>
.vips-vipsList{

}
.vips-vipsList-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}
.vips-vipsList-head-span{
  margin-top: 15px;
  margin-left: 5px;
}
.vips-vipsList-head-system{
  width: 65%;
  height: 50%;
  margin-left: 4%;
  position: relative;
  display: flex;
  justify-content: right;
  top: 10px;
}
.vips-vipsList-select{
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
.vips-vipsList-body{
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