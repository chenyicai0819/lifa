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
      <h1>消息通知</h1>

    </div>
  </div>
</template>

<script >
import {reactive, toRefs} from "vue";

export default {
  name: "Chats",
  setup(){


    const data=reactive({
      allchats:6,
      state2:'',
    })
    const givechats = () => {

    }

    return{
      ...toRefs(data),givechats,
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