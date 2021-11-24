<template>
  <div class="index-right-first">
    <el-card class="box-card" shadow="hover" body-style="{ padding: '10px' }" style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>店铺动态</span>
        </div>
      </template>
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="(item,index) in list" :key="index" class="infinite-list-item">{{item.name}}{{ item.label }}消费{{item.price}}元</li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: "Ing",
  setup(){
    const data=reactive({
      list:[{name: "李白", label: "洗剪吹",price:"38"},
        {name: "张飞", label: "洗头",price:"18"},
        {name: "孙尚香", label: "染发",price:"268"},
        {name: "关羽", label: "开卡充值",price:"200"},
        {name: "刘备", label: "开卡充值",price:"200"},
        {name: "诸葛亮", label: "充值",price:"500"},
        {name: "迪迦", label: "霸王洗发水",price:"68"},
        {name: "盖亚", label: "剪头",price:"25"},
        {name: "杜甫", label: "剃胡子",price:"15"},
        {name: "李白", label: "修眉",price:"25"}],
    })
    const load = () => {
    }
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