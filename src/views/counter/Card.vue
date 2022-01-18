<template>
  <div class="counter-card">
    <div class="counter-index-head">
      <el-input
          class="counter-index-head-input"
          v-model="search"
          placeholder="会员信息查询，输入会员名字"
          clearable="true"
      />
    </div>
    <div class="counter-card-body">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick" class="counter-index-body-tab">
        <el-tab-pane label="基本信息" name="card-1">基本信息</el-tab-pane>
        <el-tab-pane label="上传会员照片" name="card-2">上传会员照片</el-tab-pane>
        <el-tab-pane label="会员详细档案" name="card-3">会员详细档案</el-tab-pane>
      </el-tabs>
      <div class="counter-card-body-card-1" v-if="activeName=='card-1'">
        <el-card class="box-card" shadow="hover" >
          <div>
            <span>会员卡号：</span>
            <el-input v-model="form.cardId" readonly style="width: 10%"/>
            <span>会员类型：</span>
            <el-select v-model="form.vipType" placeholder="会员类型" @change="typeChange">
              <el-option v-for="(item,index)  in vipTypes" :label="item.vipType" :value="index"
                         :key="index"></el-option>
            </el-select>
            <span>会员折扣：</span>
            <el-input v-model="form.discount" style="width: 10%"/>
            <span>流水单号：</span>
            <el-input v-model="form.singleNumber" readonly style="width: 10%"/>
            <span>办卡时间：</span>
            <el-input v-model="form.singleDate" readonly style="width: 15%"/>
          </div>
          <div style="margin-top: 5px">
            <span>会员姓名：</span>
            <el-input v-model="form.vipName" style="width: 10%"/>
            <span>联系电话：</span>
            <el-input v-model="form.vipPhone" style="width: 10%"/>
            <span>会员性别：</span>
            <el-select v-model="form.vipSex" placeholder="会员性别" style="width: 10%">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
            <span>会员生日：</span>
            <el-date-picker v-model="form.vipBirthday" type="date" placeholder="会员生日" style="width: 15%"
                            format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD HH:mm:ss"
            >
            </el-date-picker>
            <span>会员来源：</span>
            <el-select v-model="form.vipCome" placeholder="会员来源" style="width: 15%">
              <el-option v-for="(item,index)  in vipComes" :label="item.label" :value="item.label"
                         :key="index"></el-option>
            </el-select>
          </div>
        </el-card>
        <el-card class="box-card" shadow="hover" >
          <p>开卡充值</p>
          <div>
            <span>充值金额：</span>
            <el-input v-model="form.cardPay" style="width: 10%"/>
            <span>付款方式：</span>
            <el-select v-model="form.payType" placeholder="付款方式" style="width: 20%">
              <el-option label="微信" value="1"></el-option>
              <el-option label="支付宝" value="2"></el-option>
              <el-option label="现金" value="3"></el-option>
              <el-option label="银联" value="4"></el-option>、
            </el-select>
            <span>赠送金额：</span>
            <el-input v-model="form.giftMoney" style="width: 10%"/>
            <span>操作人员：</span>
            <el-select v-model="form.payMan" placeholder="操作人员">
              <el-option v-for="(item,index)  in payMans" :label="item.workName" :value="item.workName"
                         :key="index"></el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px">
            <el-button type="primary" style="height: 50px;width: 200px" @click="openCard">充 值</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import moment from "moment";
import {getVipsIndex, openCardVips} from "../../api/vips";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {addBill} from "../../api/bill";

export default {
  name: "Card",
  setup(){
    const store =useStore();
    const data=reactive({
      activeName:'card-1',
      vipTypes:[],
      vipComes:[],
      payMans:[],
      search:'',
      form:{
        cardId:'',
        vipTYpesId:'',
        vipType:'',
        discount:'',
        singleNumber:'',
        singleDate:'',
        vipName:'',
        vipPhone:'',
        vipSex:'',
        vipBirthday:'',
        vipCome:'',
        cardPay:'',
        payType:'',
        giftMoney:'',
        payMan:'',
      }
    })
    const handleClick = (tab, event) => {
      console.log(tab, event)
    }
    const typeChange = (val) => {
      data.form.discount=data.vipTypes[val].vipDiscount*10==10?"不打折":data.vipTypes[val].vipDiscount*10+"折"
      data.form.cardPay=data.vipTypes[val].vipRemark
      data.form.vipTYpesId=data.vipTypes[val].typeId
    }
    const openCard = () => {
      // 开卡
      openCardVips({"vipId":data.form.cardId,"typeId":data.form.vipTYpesId,"vipName":data.form.vipName,"vipPassword":"12345678",
        "vipPhone":data.form.vipPhone,"vipSex":data.form.vipSex,"vipBirthday":data.form.vipBirthday,"vipsMoney":data.form.cardPay,
        "vipsConsume":0,"vipsBonus":0,}).then(()=>{
        ElMessage({
          message: '开卡成功，初始密码为12345678',
          type: 'success',
        })
        // 添加账单
        addBill({'billNo':data.form.singleNumber,'billType':1,
          'billMoney':data.form.cardPay,'billText':data.form.cardId+"开卡充值",'billWorker':data.form.payMan,
          'billOrderWorkers':"", 'billRemark':"",'payType':data.form.payType})
      })
    }
    onBeforeMount(()=>{
      data.form.singleDate=moment().format("YYYY-MM-DD HH:mm:ss");
      data.vipTypes=store.state.selectItem.VIPTYPES
      data.vipComes=store.state.selectItem.GUESTCOMES
      data.payMans=store.state.selectItem.WORKMANS
      data.form.singleNumber=moment(new Date()).valueOf()

      getVipsIndex().then((res)=>{
        if (res<10){data.form.cardId="0000000"+(res+1)
        }else if (res>=10&&res<100){data.form.cardId="000000"+(res+1)
        }else if (res>=100&&res<1000){data.form.cardId="00000"+(res+1)
        }else if (res>=1000&&res<10000){data.form.cardId="0000"+(res+1)
        }else if (res>10000&&res<100000){data.form.cardId="000"+(res+1)
        }else if (res>100000&&res<1000000){data.form.cardId="00"+(res+1)
        }else if (res>1000000&&res<10000000){data.form.cardId="0"+(res+1)
        }else if (res>10000000&&res<100000000){data.form.cardId=""+(res+1)}
      })
    })
    return{
      ...toRefs(data),
      handleClick,typeChange,openCard,
    }
  }
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
.counter-card-body{
  margin-top: 5px;
  border-radius: 3px
}
/deep/ .el-tabs__item {
   background-color: #EBEEF5;
   font-weight: bold;
   margin-left: 5px;
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