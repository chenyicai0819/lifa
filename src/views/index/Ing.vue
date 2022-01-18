<template>
  <div class="index-right-first">
    <el-card class="box-card" shadow="hover" body-style="{ padding: '10px' }" style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>店铺动态</span>
        </div>
      </template>
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="(item,index) in list" :key="index" class="infinite-list-item">{{item.orderMan}}{{ item.orderText }}消费{{item.orderMoney}}元</li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import {todayOrder} from "../../api/order";

export default {
  name: "Ing",
  setup(){
    const data=reactive({
      list:[],
    })
    const load = () => {
    }
    onBeforeMount(()=>{
      todayOrder().then((res)=>{
        data.list=res
      })
    })
    return{
      ...toRefs(data),load
    }
  }
}
</script>

<style scoped lang="less">
.index-right-first {
  width: 100%;
}

.infinite-list {
  height: 200px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);

& + .list-item {
    margin-top: 10px;
  }
}

.card {
  display: flex;
  justify-content: left;
  border: #2c3e50 1px solid;
  border-radius: 3px
}

.card-img {
  width: 50%;
}

.card-title {
  width: 50%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>