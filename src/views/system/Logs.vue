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
          <p v-for="(log,key) in logs" :key="key" class="log-p">
            {{log.systemip}}于{{log.systemtime}}执行了{{log.systemtext}}操作，操作人为：{{log.systemuser}}。访问路径和方法：{{log.systemurl}}，{{log.systemmethod}}
          </p>

        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import {getAllLog} from "../../api/systems";
import formatTime from "../../utils/date";

export default {
  name: "Logs",
  setup:function (){
    const data = reactive({
      logs:[],
    })
    onBeforeMount(() => {
      getAllLog().then((res)=>{
        data.logs=res
        for (let i = 0; i < res.length; i++) {
          data.logs[i].systemtime=formatTime(res[i].systemtime)
        }
      })
    })
    return {
      ...toRefs(data)
    }
  }
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
.log-p{
  text-align: left
}
</style>