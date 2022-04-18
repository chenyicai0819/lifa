<template>
  <div class="digital-orderreport">
    <div class="digital-orderreport-head">
      <div style="padding: 5px">
        <el-date-picker
            v-model="statisticsDate"
            type="daterange"
            start-placeholder="Start date"
            end-placeholder="End date"
            :default-time="defaultTime"
            style="margin-right: 10px"
            @change="DateChange"
        ></el-date-picker>
        <el-select v-model="statisticsType" placeholder="统计方式" style="width: 20%;margin-right: 10px">
          <el-option label="按天统计" value="1"></el-option>
          <el-option label="按月统计" value="2"></el-option>
        </el-select>
        <el-button type="primary" @click="selectItem">查询</el-button>
      </div>
    </div>
    <div class="digital-orderreport-body">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
        <div id="orderreport"
             :style="{ width: '95%', height: '500px' }"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {toRefs,onMounted} from "vue";
import formatDate from "../../utils/date";

const {reactive, inject} = require("vue");
const {getOrderForDayAndOrderName} = require("../../api/order");
const {getService} = require("../../api/service");
export default {
  name: "OrderReport",
  setup(){
    let echarts = inject("ec");
    const data=reactive({
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ],
      form: {},
      services:[],
      dates: [],
      statisticsType: '',
      statisticsDate: '',
      option: {
        title: {
          text: '项目销售趋势图'
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
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }
    })

    const selectItem = () => {
      ech()
    }
    /**
     * 获取服务项目名称，并分配空位进行绘图
     */
    const getServiceName = () => {
      getService().then((res)=>{
        for (let i = 0; i < res.length; i++) {
          data.services.push(res[i].serName)
        }
      })
    }
    /**
     * 根据服务项目名称获取记录
     */
    const getOrderForName = () => {

    }
    const ech = () => {
      let orderreport = echarts.init(document.getElementById("orderreport"));
      // 绘制图表
      const res=data.option
      orderreport.setOption(res)

      window.onresize = function () {//自适应大小
        orderreport.resize();
      };
    }

    onMounted(() => {
      // 一开始默认获取今天前七天到今天的数据
      var day1 = new Date();
      day1.setTime(day1.getTime()-6*24*60*60*1000);
      var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
      for (let i = 0; i < 7; i++) {
        var day3 = new Date();
        day3.setTime(day3.getTime()-(6-i)*24*60*60*1000);
        data.dates[i]=day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate();
      }
      data.option.xAxis.data=data.dates
      getService().then((res)=>{
        for (let i = 0; i < res.length; i++) {
          data.services.push(res[i].serName)
          // 给图像添加坐标系
          data.option.legend.data.push(res[i].serName)
          // 生成固定数量的位置给员工
          data.option.series[i]={
            name: res[i].serName,
            type: 'line',
            stack:res[i].serName,
            data: []
          }
          /**
           * 此处的money实际上只是次数，并不是真实的加个
           */
          getOrderForDayAndOrderName({"start":s1,"end":s2,"name":res[i].serName}).then((res)=>{
            for (let k = 0; k < 7; k++) {
              data.option.series[i].data.push(0)
            }
            if (res.length==0){
              // money.push(0)

            }else{
              let index=0;
              for (let j = 0; j < data.dates.length; j++) {
                // console.log(data.dates[j] +"=="+ formatDate(res[index].orderDate))
                if (data.dates[j]==formatDate(res[index].orderDate)){
                  data.option.series[i].data[j]=(res[index].orderMoney)
                  // money.push(res[index].orderMoney)
                  if (index<res.length){
                    index++
                  }
                }else{
                  // money.push(0)
                  data.option.series[i].data[j]=(0)
                }
              }
            }
          })
        }
      })
    })

    return{
      ...toRefs(data),selectItem,getServiceName,getOrderForName,ech,
    }
  }
}
</script>

<style scoped>
.digital-orderreport-head {
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