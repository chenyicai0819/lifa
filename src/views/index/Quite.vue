<template>
  <div class="index-left-body">
    <div>
      <el-card :body-style="{ padding: '20px' }" shadow="hover"
               style="width: 30%;margin-left: 5px;margin-right: 5px">
        <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
            style="width: 50%"
        />
        <div style="padding: 14px">
          <h4>收银台</h4>
          <div class="bottom">
            <span>今日单数：{{ todayPriceNum }}单</span>
            <el-button type="text" class="button" @click="indexto(1)">前往收银台</el-button>
          </div>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '20px' }" shadow="hover"
               style="width: 30%;margin-left: 5px;margin-right: 5px">
        <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
            style="width: 50%"
        />
        <div style="padding: 14px">
          <h4>财务中心</h4>
          <div class="bottom">
            <span>今日收银：{{ todayPrice }}元</span>
            <el-button type="text" class="button" @click="indexto(2)">前往财务中心</el-button>
          </div>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '20px' }" shadow="hover"
               style="width: 30%;margin-left: 5px;margin-right: 5px">
        <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
            style="width: 50%"
        />
        <div style="padding: 14px">
          <h4>会员中心</h4>
          <div class="bottom">
            <span>会员数量：{{ indexVips }}人</span>
            <el-button type="text" class="button" @click="indexto(3)">前往会员中心</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div style="margin-top: 10px">
      <el-card :body-style="{ padding: '20px' }" shadow="hover"
               style="width: 30%;margin-left: 5px;margin-right: 5px">
        <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
            style="width: 50%"
        />
        <div style="padding: 14px">
          <h4>挂单中心</h4>
          <div class="bottom">
            <span>今日挂单：{{ todayPendingNum }}单</span>
            <el-button type="text" class="button" @click="indexto(4)">前往挂单详情</el-button>
          </div>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '20px' }" shadow="hover"
               style="width: 30%;margin-left: 5px;margin-right: 5px">
        <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
            style="width: 50%"
        />
        <div style="padding: 14px">
          <h4>充值中心</h4>
          <div class="bottom">
            <span>今日充值：{{ todayRecharge }}元</span>
            <el-button type="text" class="button" @click="indexto(5)">前往充值中心</el-button>
          </div>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '20px' }" shadow="hover"
               style="width: 30%;margin-left: 5px;margin-right: 5px">
        <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
            style="width: 50%"
        />
        <div style="padding: 14px">
          <h4>营销中心</h4>
          <div class="bottom">
            <span>散客数量：{{ indexGuest }}人</span>
            <el-button type="text" class="button" @click="indexto(6)">前往散客统计</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from "vue";
import router from "../../router";
import {moneyOrder, numberOrder} from "../../api/order";
import {getVipsIndex} from "../../api/vips";
import {getOpenBill} from "../../api/bill";
import {useStore} from "vuex";

export default {
  name: "Quite",
  setup() {
    const store =useStore();
    const data=reactive({
      todayPriceNum: 0,
      todayPrice: 0,
      indexVips: 0,
      indexGoods: 0,
      todayPendingNum: 2,
      todayRecharge: 0,
      indexGuest: 2,
    })
    const indexto = (index) => {
      if (index == 1) {
        router.push("/home");
        store.dispatch('trees/upMenuIndexAtions','1')
      } else if (index == 2) {
        router.push("/index");
        store.dispatch('trees/upMenuIndexAtions','2')
      } else if (index == 3) {
        router.push("/vips/vipslist");
        store.dispatch('trees/upMenuIndexAtions','2')
      } else if (index == 4) {
        router.push("/home/pending");
        store.dispatch('trees/upMenuIndexAtions','1')
      } else if (index == 5) {
        router.push("/home/card");
        store.dispatch('trees/upMenuIndexAtions','2')
      } else if (index == 6) {
        router.push("/vips/guest");
        store.dispatch('trees/upMenuIndexAtions','2')
      }

    }
    onBeforeMount(()=>{
      numberOrder({"isToday":1}).then((res)=>{
        data.todayPriceNum=res
      })
      moneyOrder({"isToday":1}).then((res)=>{
        data.todayPrice=res
      })
      getVipsIndex().then((res)=>{
        data.indexVips=res
      })
      getOpenBill({"isToday":1}).then((res)=>{
        data.todayRecharge=res
      })
    })
    return{
      ...toRefs(data),indexto
    }
  }
}
</script>

<style scoped>
.index-left-body {
  margin-top: 20px;

}

.index-left-body > div {
  display: flex;
  justify-content: center;
}
</style>