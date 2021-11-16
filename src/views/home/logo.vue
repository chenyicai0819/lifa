<template>
  <div class="logo">
    <el-image
        style="width: 100%; height: 100%"
        :src="url"
        :fit="fits"
    ></el-image>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: "logo",
  setup() {
    const data = reactive({
      fits: 'cover',
      url: 'https://z3.ax1x.com/2021/11/13/Iyn0S0.png',
    })

    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped>
.logo{
  width: 20%;
  height: 60px;
}
</style>