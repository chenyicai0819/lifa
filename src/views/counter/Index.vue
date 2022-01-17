<template>
  <div class="counter-index">
    <div class="counter-index-head">
      <el-input
          class="counter-index-head-input"
          v-model="search"
          placeholder="会员信息查询，输入会员名字"
          clearable="true"
      />
    </div>
    <div class="counter-index-body">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick" class="counter-index-body-tab">
        <el-tab-pane label="项目消费" name="buy-1">项目消费</el-tab-pane>
        <el-tab-pane label="商品消费" name="buy-2">商品消费</el-tab-pane>
      </el-tabs>
      <div class="counter-index-buy">
        <el-card class="box-card" shadow="hover">
          <div v-if="activeName=='buy-1'">
            <span>服务项目：</span>
            <el-select v-model="form.service" placeholder="请选择服务" @change="serviceChange">
              <el-option v-for="(item,index)  in serviceItem" :label="item.serName" :value="index"
                         :key="index"></el-option>
            </el-select>
            <span>原价：</span>
            <el-input v-model="form.initPrice" readonly style="width: 5%"/>
            <span>优惠价：</span>
            <el-input v-model="form.newPrice" @change="setRealPrice" style="width: 5%"/>
            <span>发型师：</span>
            <el-select v-model="form.workMan" placeholder="请选择发型师">
              <el-option v-for="(item,index)  in workMans" :label="item.workName" :value="item.workName"
                         :key="index"></el-option>
            </el-select>
            <span>其他人员：</span>
            <el-select v-model="form.orderMan" placeholder="其他工作人员">
              <el-option v-for="(item,index)  in workMans" :label="item.workName" :value="item.workName"
                         :key="index"></el-option>
            </el-select>
          </div>
          <div v-else>
            <span>选择商品：</span>
            <el-select v-model="form.commodity" multiple placeholder="选择商品" style="width: 50%" @change="commChange">
              <el-option
                  v-for="(item,index) in commoditys"
                  :key="index"
                  :label="item.commName"
                  :value="index"
              >
              </el-option>
            </el-select>
            <span>原价：</span>
            <el-input v-model="form.initCommPrice" readonly style="width: 5%"/>
            <span>优惠价：</span>
            <el-input v-model="form.newCommPrice" style="width: 5%" @change="setRealPrice" />

          </div>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div>
            <span>客户姓名：</span>
            <el-input v-model="form.guestName" clearable="true" style="width: 20%"/>

            <span>联系电话：</span>
            <el-input v-model="form.guestPhone" clearable="true" style="width: 20%"/>
          </div>
          <div style="margin-top: 5px">
            <span>客户性别：</span>
            <el-select v-model="form.guestSex" placeholder="客户性别" style="width: 20%">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>

            <span>客户来源：</span>
            <el-select v-model="form.guestCome" placeholder="客户来源" style="width: 20%">
              <el-option v-for="(item,index)  in guestComes" :label="item.label" :value="item.label"
                         :key="index"></el-option>
            </el-select>
          </div>
          <el-input v-model="form.remark" style="width: 53%;margin-top: 5px" type="textarea" placeholder="备注"></el-input>

        </el-card>
        <el-card class="box-card" shadow="hover" >
          <div>
            <span>最终价格：</span>
            <el-input v-model="form.realPrice" readonly style="width: 10%"/>
            <span>流水单号：</span>
            <el-input v-model="form.SingleNumber" readonly style="width: 20%"/>
            <span>消费日期：</span>
            <el-input v-model="form.SingleDate" readonly style="width: 20%"/>
            <span>付款方式：</span>
            <el-select v-model="form.payType" placeholder="付款方式" style="width: 20%">
              <el-option label="微信" value="微信"></el-option>
              <el-option label="支付宝" value="支付宝"></el-option>
              <el-option label="现金" value="现金"></el-option>
              <el-option label="银联" value="银联"></el-option>
              <el-option label="积分" value="积分"></el-option>
              <el-option label="免单" value="免单"></el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px">
            <el-button type="primary" style="height: 50px;width: 200px" @click="Bill">结 账</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>


</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import moment from "moment";
import {addBill} from "../../api/bill";
import {ElMessage} from "element-plus";
import {addOrder} from "../../api/order";
import {useStore} from "vuex";


export default {
  name: "Index",
  setup() {
    const store =useStore();
    const data = reactive({
      search: '',
      activeName: 'buy-1',
      serviceItem: [],
      workMans:[],
      guestComes:[],
      commoditys:[],
      form: {
        service: '',
        initPrice: 0,
        newPrice: '',
        workMan:'',
        orderMan:'',
        guestName:'',
        guestPhone:'',
        guestSex:'',
        guestCome:'',
        remark:'',
        SingleNumber:'',
        SingleDate:'',
        realPrice:'',
        payType:'',
        commodity:[],
        initCommPrice:'',
        newCommPrice:'',
        text:'',
      }
    })
    const handleClick = (tab, event) => {
      console.log(tab, event)
    }
    const serviceChange = (val) => {
      // console.log(val);
      // console.log(data.serviceItem[val].serPrice);
      data.form.initPrice=data.serviceItem[val].serPrice
      data.form.realPrice=data.form.initPrice
    }
    const commChange = (val) => {
      data.form.initCommPrice=0
      for (const valKey of val) {
        // console.log(data.commoditys[valKey].commPrice);
        data.form.initCommPrice= data.form.initCommPrice+ data.commoditys[valKey].commPrice
      }
      data.form.realPrice==data.form.initCommPrice
    }
    /**
     * 设置真实价格
     */
    const setRealPrice = () => {
          if (data.activeName=="buy-1"){
            data.form.realPrice=data.form.newPrice
          }else if (data.activeName=="buy-2"){
            data.form.realPrice=data.form.newCommPrice
          }
    }
    /**
     * 结账
     * @constructor
     */
    const Bill = () => {
      if (data.activeName=="buy-1"){
        // 项目结账
        addOrder({'orderId':data.form.SingleNumber,
          'orderPrice':data.form.initPrice,'orderText':data.serviceItem[data.form.service].serName,'orderMan':data.form.guestName,
          'orderPhone':data.form.guestPhone,'orderSex':data.form.guestSex,'payType':data.form.payType,'orderMoney':data.form.realPrice,
          'orderWorker':data.form.workMan, 'orderOrderWorker':data.form.orderMan,'orderCome':data.form.guestCome,'orderRemake':data.form.remark,})
        addBill({'billNo':data.form.SingleNumber,'billType':1,
          'billMoney':data.form.realPrice,'billText':data.serviceItem[data.form.service].serName,'billWorker':data.form.workMan,
          'billOrderWorkers':data.form.orderMan, 'billRemark':data.form.remark,'payType':data.form.payType}).then((res)=>{
          console.log(res);
          ElMessage({
            message: '结账付款成功',
            type: 'success',
          })
        }).catch(()=>{
          ElMessage.error('结账付款失败.')
        })
      }else if (data.activeName=="buy-2"){
        for (const key of data.form.commodity) {
          let a=data.commoditys[key].commName
          data.form.text+=a+';'
          a=''
        }
        // console.log(data.form.text);
        // 商品结账
        addOrder({'orderId':data.form.SingleNumber,
          'orderPrice':data.form.initPrice,'orderText':data.form.text,'orderMan':data.form.guestName,
          'orderPhone':data.form.guestPhone,'orderSex':data.form.guestSex,'payType':data.form.payType,'orderMoney':data.form.realPrice,
          'orderWorker':data.form.workMan, 'orderOrderWorker':data.form.orderMan,'orderCome':data.form.guestCome,'orderRemake':data.form.remark,})
        addBill({'billNo':data.form.SingleNumber,'billType':1,
          'billMoney':data.form.realPrice,'billText':data.form.text,'billWorker':data.form.workMan,
          'billOrderWorkers':data.form.orderMan, 'billRemark':data.form.remark,'payType':data.form.payType}).then((res)=>{
          console.log(res);
          ElMessage({
            message: '结账付款成功',
            type: 'success',
          })
        }).catch(()=>{
          ElMessage.error('结账付款失败.')
        })
      }
    }
    onBeforeMount(()=>{
      data.form.SingleDate=moment().format("YYYY-MM-DD HH:mm:ss");

      data.serviceItem=store.state.selectItem.SERVICEITEM
      data.form.SingleNumber=moment(new Date()).valueOf()
      data.commoditys=store.state.selectItem.COMMODITYS
      data.workMans=store.state.selectItem.WORKMANS
      data.guestComes=store.state.selectItem.GUESTCOMES
    })
    return {
      ...toRefs(data),
      handleClick,serviceChange,commChange,Bill,setRealPrice,
    }
  },
}
</script>

<style scoped>
.counter-index-head {
  width: 100%;
  height: 50px;
  background-color: #cca8f5;
  display: flex;
  justify-content: left;
  margin-top: 5px;
  border-radius: 3px
}

.counter-index-head-input {
  width: 25%;
  margin-left: 5px;
  margin-top: 5px;
  font-size: 18px;
}

.counter-index-head-input :focus {
  background-color: antiquewhite;
}

.counter-index-body {
  margin-top: 5px;
  width: 100%;
}

.counter-index-body-tab {
  font-size: 28px;
  /*border: #2c3e50 1px solid;*/
  border-radius: 3px
}

/deep/ .el-tabs__item {
  background-color: #EBEEF5;
  font-weight: bold;
}

/deep/ .el-tabs__item.is-active {
  background-color: #FFFFFF;
}

.box-card {
  width: 100%;
  padding: 0 0;
  margin-top: 5px;
  /*display: flex;*/
  /*justify-content: left;*/
}
.box-card :hover{

}
.box-card>span{
  padding-left: 10px;
}
</style>