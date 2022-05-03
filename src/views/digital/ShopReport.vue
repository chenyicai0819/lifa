<template>
  <div class="digital-shopreport">
    <div class="digital-shopreport-head">
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
        <el-select v-model="commType" placeholder="选择商品类型" style="width: 20%;margin-right: 10px">
          <el-option label="全部商品" value="0"></el-option>
          <el-option
              v-for="(item,index) in commTypes"
              :key="index"
              :label="item.commtyName"
              :value="item.commtyId"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="select">查询</el-button>
      </div>
    </div>
    <div class="digital-shopreport-body">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
        <div id="shopreport"
             :style="{ width: '95%', height: '500px' }"></div>
      </el-card>
    </div>

    <div class="digital-shopreport-footer">
      <!--      表格显示区域-->

    </div>
  </div>
</template>

<script>
import {inject,toRefs,reactive,onBeforeMount} from "vue";
import formatDate from "../../utils/date";
import {SomeComm,allCommType} from "../../api/commoditys";
import {getDayOrderForComm} from "../../api/order";

export default {
  name: "ShopReport",
  setup(){
    let echarts = inject("ec");
    const data=reactive({
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
      //商品类型
      commTypes:[],
      commType:'0',
      option: {
        title: {
          text: '商品销售趋势图'
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
      },
      shops:[],
    })
    const ech = () => {
      console.log(data.shops)
      document.getElementById("shopreport").removeAttribute('_echarts_instance_')
      let shopreport = echarts.init(document.getElementById("shopreport"));
      // 绘制图表
      const res=data.option
      // data.option.series[0].data=[12,21,23,34,45,43,32]
      // data.option.series[1].data=[11,22,33,22,12,23,12]
      shopreport.setOption(res,true)


      window.onresize = function () {//自适应大小
        shopreport.resize();
      };
    }
    const select = () => {
      getMsg()
      setTimeout(() => {
        ech()
      }, 500);

    }
    /**
     * 获取商品类型
     */
    const getCommTypes = () => {
      allCommType().then((res)=>{
        data.commTypes=res
        // console.log(res);
      })
    }

    const getMsg = () => {
      // console.log("获取数据")

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
      SomeComm({"type":data.commType}).then((res)=>{
        data.option.series=[]
        data.shops=[]
        data.option.legend.data=[]
        // 获得所有的商品之后，循环遍历
        for (let i = 0; i < res.length; i++) {
          data.shops.push(res[i].commName)
          // 给图像添加坐标系
          data.option.legend.data.push(res[i].commName)
          // 生成固定数量的位置给商品
          data.option.series[i]={
            name: res[i].commName,
            type: 'line',
            stack:res[i].commName,
            data: []
          }

          getDayOrderForComm({"start":s1,"end":s2,"name":res[i].commName}).then((res)=>{
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
    }
    onBeforeMount(()=>{
      getCommTypes()
      getMsg()
    })

    return{
      ...toRefs(data),ech,select,getMsg,getCommTypes
    }
  }
}
</script>

<style scoped>
.digital-shopreport-head {
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