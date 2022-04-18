<template>
  <div>
    支付成功！{{time}}秒之后返回主界面
  </div>
</template>

<script>
import {toRefs, reactive, onBeforeMount, onMounted} from "vue";
import router from "../../router";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import moment from "moment";

import {addBill} from "../../api/bill";

const {addOrder} = require("../../api/order");

export default {
  name: "SuccessReturn",
  setup(){
    const store =useStore();
    const data=reactive({
      time:3,
      form:{},
      activeName:'',
      serName:'',
    })

    /**
     * 3秒倒计时
     */
    const countdown = () => {
      data.time--
    }
    /**
     * 倒计时结束返回首页
     */
    const toHome = () => {
      if (data.time==0){
        router.push('/home')
      }
    }
    /**
     * 结账并添加数据
     * @constructor
     */
    const Bill = () => {
      console.log("支付宝结账开始")
      console.log(data.form.initPrice);
      if (data.activeName=="buy-1"){
        // 项目结账
        addOrder({'orderId':data.form.SingleNumber,
          'orderPrice':data.form.initPrice,'orderText':data.serName,'orderMan':data.form.guestName,
          'orderPhone':data.form.guestPhone,'orderSex':data.form.guestSex,'payType':data.form.payType,'orderMoney':data.form.realPrice,
          'orderWorker':data.form.workMan, 'orderOrderWorker':data.form.orderMan,'orderCome':data.form.guestCome,'orderRemake':data.form.remark,
          'bonus1':store.state.users.worker1Bonus,'bonus2':store.state.users.worker2Bonus,})
        addBill({'billNo':data.form.SingleNumber,'billType':1,
          'billMoney':data.form.realPrice,'billText':data.serName,'billWorker':data.form.workMan,
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
    // Bill()
    setInterval(countdown,"1000")
    setInterval(toHome,"1000")
    // localStorage.setItem("alipaySuccess",1)
    onBeforeMount(()=>{


      // data.activeName=store.state.paysItem.activeName
      // data.form=store.state.paysItem.form
    })
    onMounted(()=>{
      data.activeName=store.state.paysItem.activeName
      data.form=store.state.paysItem.form
      data.serName=store.state.paysItem.serName
    })
    return{
      ...toRefs(data),countdown,toHome,Bill
    }
  }
}
</script>

<style scoped>

</style>