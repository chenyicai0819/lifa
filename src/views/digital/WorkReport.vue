<template>
  <div class="digital-workreport">
    <div class="digital-workreport-head">
      <div style="padding: 5px">
        <el-date-picker
            v-model="statisticsDate"
            type="daterange"
            start-placeholder="Start date"
            end-placeholder="End date"
            :default-time="defaultTime"
            style="margin-right: 10px"
        ></el-date-picker>
        <el-select v-model="statisticsType" placeholder="统计方式" style="width: 20%;margin-right: 10px">
          <el-option label="按天统计" value="1"></el-option>
          <el-option label="按月统计" value="2"></el-option>
        </el-select>
        <el-button type="primary" @click="select">查询</el-button>
      </div>
    </div>
    <div class="digital-workreport-body">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
        <div id="workreport"
             :style="{ width: '95%', height: '500px' }"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {inject, onBeforeMount, reactive, toRefs} from "vue";
import {getWorker, getWorkPay, getWorkTest} from "../../api/worker";

export default {
  name: "WorkReport",
  setup(){
    let echarts = inject("ec");
    const data=reactive({
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ],
      form: {},
      statisticsType: '',
      statisticsDate: '',
      option: {
        title: {
          text: '收入与支出趋势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '',
            type: 'line',
            data: []
          },
          {
            name: '',
            type: 'line',
            data: []
          }
        ]
      }
    })
    const select = () => {
      console.log(data.statisticsType);
      ech()
    }
    const ech = () => {
      let workreport = echarts.init(document.getElementById("workreport"));
      // 绘制图表
      const res=data.option
      workreport.setOption(res)

      window.onresize = function () {//自适应大小
        workreport.resize();
      };
    }
    onBeforeMount(() => {

      getWorker().then((res)=>{
        for (const i in res) {
          data.option.legend.data.push(res[i].workName)

          console.log(data.option.legend.data);
        }
      })

      getWorkPay().then((res)=>{
        data.option.series[0].name=res[0].workerName
        for (const i in res) {
          data.option.xAxis.data.push(res[i].workerDay)
          data.option.series[0].data.push(res[i].workerPay)
        }
      })
      getWorkTest().then((res)=>{
        data.option.series[1].name=res[0].workerName
        for (const i in res) {
          data.option.series[1].data.push(res[i].workerPay)
        }
        ech()
      })
    })



    return{
      ...toRefs(data),
      select,ech,
    }
  }
}
</script>

<style scoped>
.digital-workreport-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.box-card {
  width: 100%;
  padding: 0 0;
  margin-top: 5px;
}
</style>