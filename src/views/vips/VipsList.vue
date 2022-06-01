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
        <el-button type="small" @click="dialogVisibleForUp=true">批量导入会员</el-button>
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
                <el-popover placement="left" :width="400" trigger="click">
                  <template #reference>
                    <el-button size="mini" type="success" @click="newQR(scope.$index, scope.row)">weChat</el-button>
                  </template>
                  <h2 v-if="scope.row.openid==null">{{wechat.name}}绑定微信</h2>
                  <h2 v-if="scope.row.openid!=null">{{wechat.name}}已经绑定微信了！</h2>
                  <el-image :src="url" v-if="scope.row.openid==null"/>
                </el-popover>

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
        :show-close=false
    >
      <div>
<!--        <p>主体内容</p>-->
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
        <el-button type="primary" @click="vipsIn"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
<!--  批量添加弹框-->
  <div class="dialogs-add">
    <el-dialog
        v-model="dialogVisibleForUp"
        title="批量导入会员信息"
        width="50%"
        :show-close=false
    >
<!--      下载导入模板-->
      <div style="text-align: center; margin-bottom: 40px">
        <el-button
            type="primary"
            icon="el-icon-download"
            @click="downloadTemplate"
        >下载批量导入模板</el-button
        >
      </div>
<!--      上传文件-->
      <el-upload
          class="vipload"
          name="vipFile"
          drag
          :action="insertVipBatchURL"
          multiple
          :limit="3"
          style="text-align: center"
          :on-success="uploadSuccess"
          :on-exceed="onExceed"
          :on-progress="onProgress"
          :on-remove="onRemove"
          accept=".xlsx"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            只能上传下载的
            <span style="color: red; cursor: pointer" @click="downloadVipTemplate"
            >耗材文件模板</span
            >，请不要上传其他文件
          </div>
        </template>
      </el-upload>
    </el-dialog>

    <el-dialog
        title="添加成功"
        v-model="dialogBatchSucessVisible"
        class="hc-addBatch-dialog"
        width="560px"
        top="200px"
        center
        append-to-body
    >
      <p>
        成功添加了 <span style="color: red">{{ insertBatchNum }}</span> 条耗材数据，请确认您添加的耗材数量与其保持一致。
      </p>
      <p>
        如果不一致，请检查 xlsx 文件，如果您的 xlsx
        文件里的某行完全空白，此时不用担心，系统已经完全添加完数据。
      </p>
      <p>
        但是如果某行数据不完全，那么该行无法添加成功，此时请您单独添加该行数据。
      </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogBatchSucessVisible = false"
          >确 定</el-button
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
import {ElMessage} from "element-plus";
const {pageGetVips, getVipByEvery, getOneForId, upVip} = require("../../api/vips");
const {downloadVipTemplate} = require("../../api/files");


export default {
  name: "VipsList",
  setup(){
    const store =useStore();
    const data=reactive({
      allvips:0,
      dialogVisible:false,
      dialogVisibleForUp:false,
      dialogBatchSucessVisible:false,
      allvipmoney:0,
      vipsList:[],
      currentPage:1,
      pageSize:10,
      vipsTypes:[],
      insertVipBatchURL: process.env.VUE_APP_BASE_API + '/file/insertVipBatch',
      form:{
        selectvips:'',
        vipsSex:'',
        vipsType:'',
        search:'',
      },
      edit:{
        id:'',
        name:'',
        sex:'',
        phone:'',
        birthday:'',
        oldBirthday:'',
      },
      wechat:{
        name:'',
      },
      fileList:[],
      insertBatchNum: 0,
      url:'http://ht.cyc292.top/vips/newQR?qrCodeUrl=www.cyc292.top',
      QRurl:'',
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
    /**
     * 修改的时候点击确定
     */
    const vipsIn = () => {
      let updatas={};
      if (data.edit.birthday==data.edit.oldBirthday){
        updatas={"vipId":data.edit.id,"vipName":data.edit.name,"vipSex":data.edit.sex,"vipPhone":data.edit.phone}
      }else {
        updatas={"vipId":data.edit.id,"vipName":data.edit.name,"vipBirthday":data.edit.birthday,"vipSex":data.edit.sex,"vipPhone":data.edit.phone}
      }

      upVip(updatas).then((res)=>{
        if (res==1){
          ElMessage({
            message: data.edit.id+'信息修改成功',
            type: 'success',
          })
          pageGetVip()
          data.dialogVisible = false
        }else {
          ElMessage.error('修改失败.')
        }
      }).catch(()=>{
        ElMessage.error('出错了.')
      })

    }
    const handleEdit = (index, row) => {
      // console.log(index, row)
      getOneForId({"id":row.vipId}).then((res)=>{
        data.edit.sex=res.vipSex
        data.edit.birthday=res.vipBirthday
        data.edit.oldBirthday=res.vipBirthday
      })
      // 点击修改会员信息后，给修改时的参数赋值，不直接影响原来的参数
      data.edit.name=row.vipName
      data.edit.id=row.vipId
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
    /**
     * 下载文件模板
     */
    const downloadTemplate = () => {
      console.log("下载")
      downloadVipTemplate()
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

    /**
     * 上传文件成功回调
     */
    const uploadSuccess = (response, file, fileList) => {
      if (response.status == "false") {
        uploadError(response.info, file, fileList);
      } else {
        ElMessage({
          message: response.info,
          type: 'success',
        })
        data.insertBatchNum = response.obj;
        data.dialogBatchSucessVisible = true;
      }
    }
    const onRemove = () => {

    }
    /**
     * 正在上传文件回调
     */
    const onProgress = () => {
      ElMessage("正在上传 ......")
    }
    /**
     * 上传限制次数回调
     */
    const onExceed = () => {
      ElMessage({
        message: "一次性只能上传三个文件，请把上传成功的文件删除！",
        type: 'warning',
      })
    }
    /**
     * 上传文件失败回调
     */
    const uploadError=(err, file, fileList)=> {
      ElMessage.error("上传失败！原因：" + err)
      console.log(file+fileList)
    }
    /**
     * 点击wechat的时候生成一个新的二维码，然后可以扫码绑定微信
     */
    const newQR = (index, row) => {
      data.wechat.name=row.vipName
      data.QRurl='http://ht.cyc292.top/wechat/oauth?id='+row.vipId
      data.url='http://ht.cyc292.top/vips/newQR?qrCodeUrl='+data.QRurl
    }


    return{
      ...toRefs(data),vipsOut,vipsIn,handleDelete,handleEdit,handleSizeChange,handleCurrentChange,pageGetVip,
      selectByList,uploadSuccess,onExceed,onProgress,onRemove,downloadTemplate,uploadError,newQR,
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