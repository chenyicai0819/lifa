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

    <div class="digital-billreport-footer">
<!--      表格显示区域-->
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="name" label="类型" width="180" />
        <el-table-column
            v-for="items in dates"
            :key="items"
            :prop="items"
            :label="items"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {inject, reactive, toRefs} from "vue";
// import {getBillInForDay, getBillOutForDay} from "../../api/bill";
import formatDate from "../../utils/date";
const {getDayBill} = require("../../api/bill");
const {onMounted} = require("vue");

export default {
  name: "BillReport",
  setup() {
    let echarts = inject("ec");
    const data = reactive({
      dates:[],
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ],
      form: {},
      // 统计类型，按天、按月
      statisticsType: '',
      // 选择日期
      statisticsDate: '',
      // 收
      inBill: [],
      // 支出
      outBill: [],
      // 表格数据
      tableHead:['1','2'],
      tableData:[],
      // echats绘图
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
      // console.log("绘图")
      // 解决部署之后echarts二次绘图失败的问题
      document.getElementById("billreport").removeAttribute('_echarts_instance_')
      let billreport = echarts.init(document.getElementById("billreport"));
      // 绘制图表
      const res=data.option
      // data.option.series[0].data=[12,21,23,34,45,43,32]
      // data.option.series[1].data=[11,22,33,22,12,23,12]
      billreport.setOption(res,true)


      window.onresize = function () {//自适应大小
        billreport.resize();
      };
      // console.log("绘图成功")
    }
    const select = () => {
      getMsg()
      // console.log(data.statisticsType);
      // if (data.statisticsType==1){
      //   getBillInForDay().then((res)=>{
      //     for (const i in res) {
      //       data.option.series[0].data.push(res[i].billMoney)
      //     }
      //     // console.log(data.option.series[0].data);
      //   })
      //   getBillOutForDay().then((res)=>{
      //     for (const i in res) {
      //       data.option.series[1].data.push(res[i].billMoney)
      //       data.option.xAxis.data.push(res[i].billTime)
      //
      //     }
      //     ech()
      //   })
      // }else if (data.statisticsType==2){
      //   // 根据月份获取
      // }
      ech();
    }
    /**
     * 给表格的数组赋值
     */
    const getTable = () => {

      let name=['收入', '支出']
      for (let j = 0; j < name.length; j++) {
        let obj={}
        obj["name"]=name[j]
        for (let i = 0; i < data.dates.length; i++) {
          // let he={}
          // he["tabledates"]=data.dates[i]
          // data.tableHead[i]=he
          obj[data.dates[i]]=data.option.series[j].data[i]
        }
        data.tableData.push(obj)
      }
    }
    const getMsg = () => {
      // 一开始默认获取今天前七天到今天的数据
      var day1 = new Date();
      day1.setTime(day1.getTime()-6*24*60*60*1000);
      var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + (day1.getDate());
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
      for (let i = 0; i < 7; i++) {
        var day3 = new Date();
        day3.setTime(day3.getTime()-(6-i)*24*60*60*1000);
        data.dates[i]=day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate();
      }

      data.option.xAxis.data=data.dates
      // 分别获取收支数据
      // 收入
      getDayBill({"start":s1,"end":s2,"id":1}).then((res)=>{
        // console.log(res);
        for (let i = 0; i < 7; i++) {
          data.option.series[0].data.push(0)
        }
        if (res.length==0){
          // console.log(res);
        }else{
          let index=0;
          for (let i = 0; i < data.dates.length; i++) {
            // console.log(res[index].billMoney)
            // console.log(data.dates[i] +"=="+ formatDate(res[index].billTime))
            if (data.dates[i]==formatDate(res[index].billTime)){
              data.option.series[0].data[i]=(res[index].billMoney)
              if (index<res.length){
                index++
              }
            }else{
              data.option.series[0].data[i]=(0)
            }
          }
        }
        // console.log(data.option.series[0].data);

      })
      // 支出
      getDayBill({"start":s1,"end":s2,"id":2}).then((res)=>{
        for (let i = 0; i < 7; i++) {
          data.option.series[1].data.push(0)
        }
        if (res.length==0){
          // console.log(res);
        }else{
          let index=0;
          for (let i = 0; i < data.dates.length; i++) {
            // console.log(data.dates[i] +"=="+ formatDate(res[index].billTime))
            if (data.dates[i]==formatDate(res[index].billTime)){

              data.option.series[1].data[i]=(res[index].billMoney)
              if (index<res.length){
                index++
              }
            }else{
              data.option.series[1].data[i]=(0)
            }
          }
        }

        // console.log(data.option.series[1].data);
        // for (let i = 7; i > 0; i--) {
        //   var day = new Date();
        //   day.setTime(day.getTime()-i*24*60*60*1000);
        //   var s = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
        //
        // }
      })
      getTable()
    }

    onMounted(() => {
      getMsg()

    })
    return {
      ...toRefs(data),ech,select,getMsg,getTable
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