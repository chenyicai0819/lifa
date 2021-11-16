<template>
  <div class="index">
    <div class="index-left">
      <div class="index-left-head">
        <div class="index-left-logo">
          <el-avatar shape="square" :size="100" :fit="fit" :src="url"></el-avatar>
        </div>
        <div class="index-left-text">
          <div class="index-left-text-head">
            <span>欢迎您登陆骏泰理发店管理系统！</span>
            <span>{{ user }}</span>
          </div>
          <div>

          </div>
        </div>
      </div>
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
    </div>
    <div class="index-right">
      <div class="index-right-first">
        <el-card class="box-card" shadow="hover" body-style="{ padding: '10px' }" style="width: 100%">
          <template #header>
            <div class="card-header">
              <span>店铺动态</span>
            </div>
          </template>
          <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
            <li v-for="(item,index) in list" :key="index" class="infinite-list-item">{{item.name}}{{ item.label }}消费{{item.price}}元</li>
          </ul>
        </el-card>
      </div>
      <div class="index-right-second">
        <el-card class="box-card" shadow="hover" body-style="{ padding: '10px' }" style="width: 100%">
          <template #header>
            <div class="card-header">
              <span>在线客服</span>
            </div>
          </template>
          <div>
            <div>
              <p>联系电话：15500932013</p>
              <p>QQ:2495842975</p>
              <p>邮箱：chenyc2021@qq.com</p>
            </div>
          </div>
        </el-card>
      </div>
      <div class="index-right-third">
        <el-card class="box-card" shadow="hover" body-style="{ padding: '10px' }" style="width: 100%">
          <template #header>
            <div class="card-header">
              <span>关于系统</span>
            </div>
          </template>
          <div>
            <div>
              <p>当前版本：v1.0.0</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import router from "../router";

export default {
  name: "index",
  setup() {
    const data = reactive({
      fit: 'fill',
      url: 'https://z3.ax1x.com/2021/11/16/IR2bff.jpg',
      user: '新风尚',
      currentDate: '',
      todayPriceNum: 3,
      todayPrice: 68,
      indexVips: 32,
      indexGoods: 0,
      todayPendingNum: 2,
      todayRecharge: 600,
      indexGuest: 2,
      list:[{name: "李白", label: "洗剪吹",price:"38"},
        {name: "张飞", label: "洗头",price:"18"},
        {name: "孙尚香", label: "染发",price:"268"},
        {name: "关羽", label: "开卡充值",price:"200"},
        {name: "刘备", label: "开卡充值",price:"200"},
        {name: "诸葛亮", label: "充值",price:"500"},
        {name: "迪迦", label: "霸王洗发水",price:"68"},
        {name: "盖亚", label: "剪头",price:"25"},
        {name: "杜甫", label: "剃胡子",price:"15"},
        {name: "李白", label: "修眉",price:"25"}],
    })
    const indexto = (index) => {
      if (index == 1) {
        router.push("/home");
      } else if (index == 2) {
        router.push("/index");
      } else if (index == 3) {
        router.push("/vips/vipslist");
      } else if (index == 4) {
        router.push("/home/pending");
      } else if (index == 5) {
        router.push("/home/card");
      } else if (index == 6) {
        router.push("/vips/guest");
      }
    }
    const load = () => {
    }
    return {
      ...toRefs(data), indexto,load,
    }
  }
}
</script>

<style scoped lang="less">
.index {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.index-left {
  width: 70%;
}

.index-right {
  width: 28%;
}

.index-left-head {
  display: flex;
  justify-content: left;
}

.index-left-logo {
  margin: 5px 5px;
}

.index-left-text {
  margin: 5px 5px;
}

.index-left-text-head {
  margin-top: 5px;
}

.index-left-body {
  margin-top: 20px;

}

.index-left-body > div {
  display: flex;
  justify-content: center;
}

.card {
  display: flex;
  justify-content: left;
  border: #2c3e50 1px solid;
  border-radius: 3px
}

.card-img {
  width: 50%;
}

.card-title {
  width: 50%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.index-right-first {
  width: 100%;
}
.index-right-second{
  width: 100%;
  margin-top: 10px;
}
.index-right-third{
  width: 100%;
  margin-top: 10px;
}
.infinite-list {
  height: 200px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);

  & + .list-item {
    margin-top: 10px;
  }
}

</style>