<template>
  <div class="digital-billreport">
    <div class="digital-billreport-head">
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
    <div class="digital-billreport-body">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
        <div id="billreport"
             :style="{ width: '95%', height: '500px' }"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {inject, onBeforeMount, reactive, toRefs} from "vue";
import {getBillInForDay, getBillOutForDay} from "../../api/bill";

export default {
  name: "BillReport",
  setup() {
    let echarts = inject("ec");
    const data = reactive({
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ],
      form: {},
      statisticsType: '',
      statisticsDate: '',
      inBill: [],
      outBill: [],
      option: {
        title: {
          text: '收入与支出趋势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['收入', '支出']
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
            name: '收入',
            type: 'line',
            stack: '收入',
            data: []
          },
          {
            name: '支出',
            type: 'line',
            stack: '支出',
            data: []
          }
        ]
      }
    })
    const ech = () => {
      let billreport = echarts.init(document.getElementById("billreport"));
      // 绘制图表
      const res=data.option
      // data.option.series[0].data=[12,21,23,34,45,43,32]
      // data.option.series[1].data=[11,22,33,22,12,23,12]
      billreport.setOption(res)

      window.onresize = function () {//自适应大小
        billreport.resize();
      };
    }
    const select = () => {
      console.log(data.statisticsType);
      ech();
    }

    onBeforeMount(() => {
      getBillInForDay().then((res)=>{
        for (const i in res) {
          data.option.series[0].data.push(res[i].billMoney)
        }
        console.log(data.option.series[0].data);
      })
      getBillOutForDay().then((res)=>{
        for (const i in res) {
          data.option.series[1].data.push(res[i].billMoney)
          data.option.xAxis.data.push(res[i].billTime)

        }
        ech()
      })

    })
    return {
      ...toRefs(data),ech,select
    }
  }
}
</script>

<style scoped>
.digital-billreport-head {
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