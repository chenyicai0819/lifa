<template>
  <div class="index-right-second">
    <el-card class="box-card" shadow="hover" body-style="{ padding: '10px' }" style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>在线客服</span>
        </div>
      </template>
      <div>
        <div>
          <p>联系电话：15500932013</p>
          <p>QQ:2495842975</p>
          <p>邮箱：chenyc2021@qq.com</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Call"
}
</script>

<style scoped>
.index-right-second{
  width: 100%;
  margin-top: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>