<template>
  <div class="vips-chats">
    <div class="vips-chats-head">
      <div class="vips-chats-head-span">
        <span>查询到一共有：</span>
        <span style="color: #f5576c">{{allchats}}</span>
        <span>条消息记录！</span>
      </div>
      <div class="vips-chats-head-system">
        <el-button type="small" @click="givechats">发送信息</el-button>
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
            <el-table-column label="备注" prop="chatRemate" />
            <el-table-column align="right">
              <template #header>
                <el-input v-model="search" size="mini" placeholder="搜索标题" />
              </template>
              <template >
                <el-button size="mini"
                >Edit</el-button
                >
                <el-button
                    size="mini"
                    type="danger"

                >Delete</el-button
                >
              </template>
            </el-table-column>
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
</template>

<script >
import {reactive, toRefs} from "vue";

export default {
  name: "Chats",
  setup(){


    const data=reactive({
      allchats:0,
      state2:'',
      search:'',
      chatLists:[
        {"chatId":"00001","chatName":"测试","chatText":"测试内容","chatTime":"2022-04-10","chatRemate":"无"}
      ],
      allvips:100,
    })
    const givechats = () => {

    }
    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }
    const getList = () => {
      data.allchats=data.chatLists.length
    }
    getList()
    return{
      ...toRefs(data),givechats,handleEdit,handleDelete,getList
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
</style>