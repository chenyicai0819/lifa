<template>
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
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: "Head",
  setup(){
    const data=reactive({
      fit: 'fill',
      url: 'https://z3.ax1x.com/2021/11/16/IR2bff.jpg',
      user: '新风尚',
    })


    return{
      ...toRefs(data)
    }
  }
}
</script>

<style scoped>
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
</style>