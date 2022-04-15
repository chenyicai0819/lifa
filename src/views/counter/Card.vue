<template>
  <div class="counter-card">
    <div class="counter-index-head">
      <el-popover placement="bottom" :width="400" trigger="click" v-model:visible="visible">
        <template #reference>
          <el-input
              class="counter-index-head-input"
              v-model="search"
              placeholder="会员信息查询，输入会员名字"
              clearable="true"
              @click="visible = true"
          />
        </template>
        <el-table :data="vipslist.filter((data) =>!search || data.vipName.toLowerCase().includes(search.toLowerCase()))"
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
    <div class="counter-card-body">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick" class="counter-index-body-tab">
        <el-tab-pane label="开卡充值" name="card-1">开卡充值</el-tab-pane>
        <el-tab-pane label="会员充值" name="card-2">会员充值</el-tab-pane>
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
              <el-option label="微信" value="微信"></el-option>
              <el-option label="支付宝" value="支付宝"></el-option>
              <el-option label="现金" value="现金"></el-option>
              <el-option label="银联" value="银联"></el-option>、
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
      <div class="counter-card-body-card-2" v-if="activeName=='card-2'">
        <el-card class="box-card" shadow="hover" >
          <div style="padding-top: 5px;padding-bottom: 5px;padding-left: 20px;width: 900px">
            请输入充值的卡号：
            <el-input v-model="upIdCard" placeholder="会员卡卡号" @blur="getNowMoneys" style="width: 200px;margin-right: 20px"/>
            请输入充值的金额：
            <el-input-number v-model="upMoney" :min="1" :max="1000" style="margin-right: 20px" @change="changeMoney"/>
            该账户剩余金额：{{nowMoney}}
          </div>
          <div style="padding-top: 5px;padding-bottom: 5px;padding-left: 20px;width: 600px">
            <span>付款方式：</span>
            <el-select v-model="form.payType" placeholder="付款方式" style="width: 20%;padding-right: 20px">
              <el-option label="微信" value="微信"></el-option>
              <el-option label="支付宝" value="支付宝"></el-option>
              <el-option label="现金" value="现金"></el-option>
              <el-option label="银联" value="银联"></el-option>、
            </el-select>
            <span>操作人员：</span>
            <el-select v-model="form.payMan" placeholder="操作人员">
              <el-option v-for="(item,index)  in payMans" :label="item.workName" :value="item.workName"
                         :key="index"></el-option>
            </el-select>
            <el-button type="primary" @click="upVipsMoney" style="margin-left: 20px">充值</el-button>
          </div>
        </el-card>
      </div>
      <div class="counter-card-body-card-3" v-if="activeName=='card-3'">
        <el-card class="box-card" shadow="hover" v-if="showVipsMsg!=null">
          <el-descriptions :title="showVipsMsg.vipName" >
            <el-descriptions-item label="用户ID：">{{ showVipsMsg.vipId }}</el-descriptions-item>
            <el-descriptions-item label="联系方式：">{{ showVipsMsg.vipPhone }}</el-descriptions-item>
            <el-descriptions-item label="性别:">{{card3.sex}}</el-descriptions-item>
            <el-descriptions-item label="会员卡金:">{{showVipsMsg.vipsMoney}}￥</el-descriptions-item>
            <el-descriptions-item label="会员消费:">{{showVipsMsg.vipsConsume}}￥</el-descriptions-item>
            <el-descriptions-item label="赠送金:">{{showVipsMsg.vipsBonus}}￥</el-descriptions-item>
            <el-descriptions-item label="会员生日:">{{card3.birthday}}</el-descriptions-item>
            <el-descriptions-item label="开卡时间:">{{card3.openday}}</el-descriptions-item>
            <el-descriptions-item label="最后消费时间:">{{card3.lastday}}</el-descriptions-item>
            <el-descriptions-item label="会员等级：">
              <el-tag size="default">{{card3.type}}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import moment from "moment";
import {getNowMoney, getVipsIndex, openCardVips} from "../../api/vips";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {addBill} from "../../api/bill";
import formatDate from "../../utils/date";

const {getVips, upVip} = require("../../api/vips");

export default {
  name: "Card",
  setup(){
    const store =useStore();
    const data=reactive({
      activeName:'card-1',
      vipTypes:[],
      vipslist:[],
      vipComes:[],
      payMans:[],
      showVipsMsg:{},
      search:'',
      upIdCard:'',
      upMoney:100,
      upNowVipType:1,
      upVipType:1,
      nowMoney:0,
      visible:false,
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
      },
      card3:{
        type:'',
        sex:'',
        birthday:'',
        openday:'',
        lastday:'',
      }
    })
    /**
     * 获取会员账户余额
     */
    const getNowMoneys = () => {
      getNowMoney({"id":data.upIdCard}).then((res)=>{
        data.nowMoney=res
      })
    }
    const upVipsMoney = () => {
      // 充值
      let mon=data.nowMoney+data.upMoney;
      // console.log(data.upNowVipType);
      // console.log(data.upVipType);
      // 如果会员当前等级小于充值后的等级，就将其等级更新
      if (data.upNowVipType<data.upVipType){
        data.upNowVipType=data.upVipType
      }
      upVip({"vipId":data.upIdCard,"vipsMoney":mon,"typeId":data.upNowVipType}).then((res)=>{
        if (res==1){
          ElMessage({
            message: data.upIdCard+'充值成功',
            type: 'success',
          })
          addBill({'billNo':moment(new Date()).valueOf(),'billType':1,
            'billMoney':mon,'billText':data.upIdCard+"充值",'billWorker':data.form.payMan,
            'billOrderWorkers':"", 'billRemark':"充值",'payType':data.form.payType})
        }else {
          ElMessage.error('充值失败.')
        }
      }).catch(()=>{
        ElMessage.error('充值失败.')
      })
    }

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
          'billMoney':data.form.cardPay,'billText':data.form.cardId+"充值",'billWorker':data.form.payMan,
          'billOrderWorkers':"", 'billRemark':"充值",'payType':data.form.payType})

        // 成功之后更新界面信息
        data.form.singleDate=moment().format("YYYY-MM-DD HH:mm:ss");
        data.form.singleNumber=moment(new Date()).valueOf()
        data.form.vipName='';data.form.vipPhone='';data.form.vipSex='';data.form.vipBirthday='';
        getCardId()
      })
    }

    /**
     * 获取开卡用户的id
     */
    const getCardId = () => {
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
    }

    /**
     * 搜索时选中的vip信息
     */
    const orderVip = (event) => {
      if (data.activeName=="card-2"){
        data.upIdCard=event.vipId
        data.nowMoney=event.vipsMoney
        data.upNowVipType=event.typeId
      }else if (data.activeName=="card-3"){
        console.log(event);
        data.showVipsMsg=event
        data.card3.type=data.vipTypes[event.typeId-1].vipType
        data.card3.sex=event.vipSex==1?"男":"女"
        data.card3.birthday=formatDate(event.vipBirthday)
        data.card3.openday=formatDate(event.vipOpencard)
        data.card3.lastday=formatDate(event.vipsLast)
      }

      data.visible=false
    }
    /**
     * 充值金额改变时,根据充值的金额判断更新的会员等级
     */
    const changeMoney = () => {
      if (data.upMoney<188){data.upVipType=1}
      else if (data.upMoney>=188 && data.upMoney<288){data.upVipType=2}
      else if (data.upMoney>=288 && data.upMoney<388){data.upVipType=3}
      else if (data.upMoney>=388 && data.upMoney<488){data.upVipType=4}
      else if (data.upMoney>=488){data.upVipType=5}
    }
    onBeforeMount(()=>{
      data.form.singleDate=moment().format("YYYY-MM-DD HH:mm:ss");
      data.vipTypes=store.state.selectItem.VIPTYPES
      data.vipComes=store.state.selectItem.GUESTCOMES
      data.payMans=store.state.selectItem.WORKMANS
      data.form.singleNumber=moment(new Date()).valueOf()
      getCardId()
      getVips().then((res)=>{
        data.vipslist=res
      })
    })
    return{
      ...toRefs(data),
      handleClick,typeChange,openCard,getCardId,upVipsMoney,getNowMoneys,orderVip,changeMoney,
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