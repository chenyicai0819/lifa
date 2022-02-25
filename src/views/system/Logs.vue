<template>
  <div class="system-logs">
    <div class="system-logs-head">

    </div>
    <div class="system-logs-body">
      <el-card class="box-card-table" shadow="hover" >
        <div class="box-card-table-head">
          <span>系统日志</span>
        </div>
        <div style="overflow-x: hidden;overflow-y: scroll;height: 450px;">

        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logs"
}
</script>

<style scoped>
.system-logs-head{
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.system-logs-body{
  margin-top: 5px;
}
</style>