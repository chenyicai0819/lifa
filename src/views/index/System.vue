<template>
  <div class="index-right-third">
    <el-card class="box-card" shadow="hover" body-style="{ padding: '10px' }" style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>关于系统</span>
        </div>
      </template>
      <div>
        <div>
          <p>当前版本：v1.0.0</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "System"
}
</script>

<style scoped>
.index-right-third{
  width: 100%;
  margin-top: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.box-card {
  width: 480px;
}
</style>