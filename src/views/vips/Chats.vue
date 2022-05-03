<template>
  <div class="vips-chats">
    <div class="vips-chats-head">
      <div class="vips-chats-head-span">
        <span>查询到一共有：</span>
        <span style="color: #f5576c">{{allchats}}</span>
        <span>条消息记录！</span>
      </div>
      <div class="vips-chats-head-system">
        <el-button type="small" @click="dialogVisible=true">发送信息</el-button>
      </div>
    </div>
    <div class="vips-chats-body">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>消息列表</span>
        </div>
        <div style="overflow-x: hidden;overflow-y: scroll;height: 450px;">
          <el-table
              :data="chatLists"
              style="width: 100%"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="编号" prop="chatId" />
            <el-table-column label="标题" prop="chatName" />
            <el-table-column label="主要内容" prop="chatText" />
            <el-table-column label="日期" prop="chatTime" />
            <el-table-column label="接收人" prop="chatVips" />
<!--            <el-table-column align="right">-->
<!--              <template #header>-->
<!--                <el-input v-model="search" size="mini" placeholder="搜索标题" />-->
<!--              </template>-->
<!--              <template >-->
<!--                <el-button size="mini"-->
<!--                >Edit</el-button-->
<!--                >-->
<!--                <el-button-->
<!--                    size="mini"-->
<!--                    type="danger"-->

<!--                >Delete</el-button-->
<!--                >-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </div>
        <div class="demo-pagination-block">
<!--          <el-pagination-->
<!--              v-model:currentPage="currentPage"-->
<!--              :page-sizes="[20, 50, 100, 200]"-->
<!--              :page-size=pageSize-->
<!--              layout="total, sizes, prev, pager, next, jumper"-->
<!--              :total=allvips-->
<!--              @size-change="handleSizeChange"-->
<!--              @current-change="handleCurrentChange"-->
<!--          >-->
<!--          </el-pagination>-->
        </div>
      </el-card>
    </div>
  </div>
  <div class="vips-chats-edit">
    <el-dialog
        v-model="dialogVisible"
        title="编辑群发信息"
        width="50%"
        :before-close="handleClose"
        :show-close=false
    >
      <div>
<!--        <p>主体内容</p>-->
        <div>
          <span>群发信息标题：</span>
          <el-input v-model="edit.name" clearable="true" style="width: 60%"/>
        </div>
        <div style="margin-top: 5px">
          <span>群发信息内容：</span>
          <el-input v-model="edit.text"
                    style="width: 60%"
                    autosize
                    type="textarea"/>
        </div>
        <div style="margin-top: 5px">
          <span>是否定时发送：</span>
          <el-switch v-model="edit.timing" @change="isTiming"/>
        </div>
        <div v-if="edit.timing==true" class="example-basic" style="margin-top: 5px">
          <span>定时发送时间：</span>
          <el-date-picker v-model="edit.time"
                          type="date"
                          placeholder="定时发送时间"
                          format="YYYY/MM/DD"
                          value-format="YYYY-MM-DD HH:mm:ss"/>
        </div>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addChat()"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script >
import {reactive, toRefs} from "vue";
import {getAllChat, insertChat, pushChat} from "../../api/chats";

const {formatTime} = require("../../utils/date");
const {ElMessage} = require("element-plus");

export default {
  name: "Chats",
  setup(){


    const data=reactive({
      allchats:0,
      state2:'',
      search:'',
      chatLists:[],
      allvips:100,
      dialogVisible:false,
      edit:{
        name:'',
        text:'',
        timing:false,
        time:'',
      }
    })
    const givechats = () => {

    }
    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }

    /**
     * 获取所有的信息列表
     */
    const getList = () => {

      getAllChat().then((res)=>{
        data.chatLists=res
        for (let i = 0; i < res.length; i++) {
          data.chatLists[i].chatTime=formatTime(res[i].chatTime)
          if (res[i].chatMan===1){
            data.chatLists[i].chatVips="所有人"
          }
        }
        data.allchats=res.length
      })

    }

    /**
     * 添加新的信息发送
     */
    const addChat = () => {
      if (data.edit.timing===false){
        // 立即发送
        pushChat({"chatName":data.edit.name,"chatText":data.edit.text})
      }
      // console.log();
      var out;
      if (data.edit.time==''){
        out={"chatName":data.edit.name,"chatText":data.edit.text,
          "chatMan":1}
      }else {
        out={"chatName":data.edit.name,"chatText":data.edit.text,
          "chatMan":1,"chatTime":data.edit.time}
      }
      insertChat(out).then((res)=>{
        if (res==1){
          ElMessage({
            message: '消息添加成功',
            type: 'success',
          })
          data.dialogVisible = false
        }else {
          ElMessage.error('消息添加失败.')
        }
      }).catch(()=>{
        ElMessage.error('出错了.')
      })
    }

    /**
     *判断是否定时发送信息
     */
    const isTiming = () => {
    }
    getList()
    return{
      ...toRefs(data),givechats,handleEdit,handleDelete,getList,isTiming,addChat
    }
  }
}
</script>

<style scoped>
.vips-chats-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}
.vips-chats-head-span{
  margin-top: 15px;
  margin-left: 5px;
}
.vips-chats-head-system{
  width: 75%;
  height: 50%;
  margin-left: 4%;
  position: relative;
  display: flex;
  justify-content: right;
  top: 10px;
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
.vips-chats-body{
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
.example-basic .el-date-editor {
  margin: 8px;
}
</style>