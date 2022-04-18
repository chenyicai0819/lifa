<template>
  <div class="counter-index">
    <div class="counter-index-head">
      <el-popover placement="bottom" :width="400" trigger="click" v-model:visible="visible">
        <template #reference>
          <el-input
              class="counter-index-head-input"
              v-model="form.search"
              placeholder="会员信息查询，输入会员名字"
              clearable="true"
              @click="visible = true"
          />
        </template>
        <el-table :data="vipslist.filter((data) =>!form.search || data.vipName.toLowerCase().includes(form.search.toLowerCase()))"
                  style="height: 400px;"
                  empty-text="没有会员"
        >
          <el-table-column label="会员姓名" prop="vipName" />
          <el-table-column label="手机号码" prop="vipPhone" />
          <el-table-column label="卡金" prop="vipsMoney" />
          <el-table-column align="right">
            <template #default="scope">
              <el-button size="mini" @click="orderVip(scope.row)" type="primary">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-popover>
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
            <el-button type="primary" style="height: 50px;width: 200px" @click="pay">结 账</el-button>
<!--            <el-button type="success" style="height: 50px;width: 200px" @click="payali">结 账</el-button>-->
          </div>
        </el-card>
      </div>
    </div>
  </div>


</template>

<script>
import {onBeforeMount, onMounted, reactive, toRefs} from "vue";
import moment from "moment";
import {addBill} from "../../api/bill";
import {ElMessage} from "element-plus";
import {addOrder} from "../../api/order";
import {useStore} from "vuex";
import {getDiscountById, getVips} from "../../api/vips";
import {alipay} from "../../api/pay";

export default {
  name: "Index",
  setup() {
    const store =useStore();
    const data = reactive({
      visible:false,
      searchValue:'',
      search: '',
      activeName: 'buy-1',
      serviceItem: [],
      workMans:[],
      guestComes:[],
      commoditys:[],
      vipslist:[],
      vipsDiscount:1,
      form: {
        search:'',
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
        text:[],
      },
    })
    /**
     * 搜索时选中的vip信息
     */
    const orderVip = (event) => {
      data.form.guestName=event.vipName
      data.form.guestPhone=event.vipPhone
      data.form.guestSex=event.vipSex
      data.visible = false
      // 选中会员的时候识别折扣，并改变真实价格
      getDiscountById({"id":event.typeId}).then((res)=>{
        data.vipsDiscount=res.vipDiscount
        setRealPrice()
      })
    }
    const handleClick = (tab, event) => {
      console.log(tab, event)
    }
    const serviceChange = (val) => {
      // console.log(val);
      // console.log(data.serviceItem[val].serPrice);
      data.form.initPrice=data.serviceItem[val].serPrice
      data.form.realPrice=Math.floor(data.form.newPrice*data.vipsDiscount)
    }
    const commChange = (val) => {
      data.form.initCommPrice=0
      for (const valKey of val) {
        // console.log(data.commoditys[valKey].commPrice);
        data.form.initCommPrice= data.form.initCommPrice+ data.commoditys[valKey].commPrice
      }
      data.form.realPrice=Math.floor(data.form.newPrice*data.vipsDiscount)
    }
    /**
     * 设置真实价格
     */
    const setRealPrice = () => {
          if (data.activeName=="buy-1"){
            data.form.realPrice=Math.floor(data.form.newPrice*data.vipsDiscount)
          }else if (data.activeName=="buy-2"){
            data.form.realPrice=Math.floor(data.form.newPrice*data.vipsDiscount)
          }
    }

    /**
     * 点击结账
     */
    const pay = () => {
      // localStorage.setItem("activeName",data.activeName)
      // localStorage.setItem("payform",data.form)
      // localStorage.setItem("serName",data.serviceItem[data.form.service].serName)
      store.dispatch('paysItem/upActiveNameActions',data.activeName)
      store.dispatch('paysItem/upFormActions',data.form)
      store.dispatch('paysItem/upSerNameActions',data.serviceItem[data.form.service].serName)
      if (data.form.payType=="支付宝"){
        // 如果支付成功，则在支付成功界面添加订单信息
        //跳转支付宝支付
        payali()
      }else {
        Bill()
      }
    }
    /**
     * 结账并添加数据
     * @constructor
     */
    const Bill = () => {
      if (data.activeName=="buy-1"){
        // 项目结账
        addOrder({'orderId':data.form.SingleNumber,
          'orderPrice':data.form.initPrice,'orderText':data.serviceItem[data.form.service].serName,'orderMan':data.form.guestName,
          'orderPhone':data.form.guestPhone,'orderSex':data.form.guestSex,'payType':data.form.payType,'orderMoney':data.form.realPrice,
          'orderWorker':data.form.workMan, 'orderOrderWorker':data.form.orderMan,'orderCome':data.form.guestCome,'orderRemake':data.form.remark,
          'bonus1':store.state.users.worker1Bonus,'bonus2':store.state.users.worker2Bonus,})
        addBill({'billNo':data.form.SingleNumber,'billType':1,
          'billMoney':data.form.realPrice,'billText':data.serviceItem[data.form.service].serName,'billWorker':data.form.workMan,
          'billOrderWorkers':data.form.orderMan, 'billRemark':data.form.remark,'payType':data.form.payType}).then((res)=>{
          console.log(res);
          ElMessage({
            message: '结账付款成功',
            type: 'success',
          })
          // 付款成功后刷新数据
          data.form.SingleNumber=moment(new Date()).valueOf()
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
          'orderPrice':data.form.initCommPrice,'orderText':data.form.text,'orderMan':data.form.guestName,
          'orderPhone':data.form.guestPhone,'orderSex':data.form.guestSex,'payType':data.form.payType,'orderMoney':data.form.realPrice,
          'orderWorker':data.form.workMan, 'orderOrderWorker':data.form.orderMan,'orderCome':data.form.guestCome,'orderRemake':data.form.remark,
          'bonus1':store.state.users.worker1Bonus,'bonus2':store.state.users.worker2Bonus,})
        addBill({'billNo':data.form.SingleNumber,'billType':1,
          'billMoney':data.form.realPrice,'billText':data.form.text,'billWorker':data.form.workMan,
          'billOrderWorkers':data.form.orderMan, 'billRemark':data.form.remark,'payType':data.form.payType}).then((res)=>{
          console.log(res);
          ElMessage({
            message: '结账付款成功',
            type: 'success',
          })
          data.form.SingleNumber=moment(new Date()).valueOf()
          data.form.SingleDate=moment().format("YYYY-MM-DD HH:mm:ss");
        }).catch(()=>{
          ElMessage.error('结账付款失败.')
        })
      }
    }
    const payali = () => {
      alipay({"out_trade_no":data.form.SingleNumber,
        "subject":data.form.guestName,
        "total_amount":data.form.realPrice,
        "body":data.serviceItem[data.form.service].serName}).then((res)=>{
        console.log(res);
        document.querySelector('body').innerHTML = res;//查找到当前页面的body，将后台返回的form替换掉他的内容
        document.forms[0].submit();  //执行submit表单提交，让页面重定向，跳转到支付宝页面
        Bill()
      })
    }
    // const checkPaySuccess = () => {
    //
    //   let alipaySuccess=localStorage.getItem("alipaySuccess")
    //
    //   if (alipaySuccess==1){
    //     data.activeName=localStorage.getItem("activeName")
    //     data.form=localStorage.getItem("payform")
    //     console.log("支付宝支付成功，")
    //     Bill()
    //     localStorage.setItem("alipaySuccess",0)
    //   }
    // }
    // checkPaySuccess()
    onBeforeMount(()=>{
      data.form.SingleDate=moment().format("YYYY-MM-DD HH:mm:ss");
      data.serviceItem=store.state.selectItem.SERVICEITEM
      data.form.SingleNumber=moment(new Date()).valueOf()
      data.commoditys=store.state.selectItem.COMMODITYS
      data.workMans=store.state.selectItem.WORKMANS
      data.guestComes=store.state.selectItem.GUESTCOMES
      getVips().then((res)=>{
        data.vipslist=res
      })
    })
    onMounted(() => {
      // restaurants.value = loadAll()

    })
    return {
      ...toRefs(data),payali,pay,
      handleClick,serviceChange,commChange,Bill,setRealPrice,orderVip,
    }
  },
}
</script>

<style lang="less" scoped>
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