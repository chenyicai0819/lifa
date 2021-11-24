<template>
  <div class="index">
    <div class="index-left">
      <Head/>
      <Quite/>
    </div>
    <div class="index-right">
      <Ing/>
      <Call/>
      <System/>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import Quite from "./index/Quite";
import Head from "./index/Head";
import Ing from "./index/Ing";
import Call from "./index/Call";
import System from "./index/System";

export default {
  name: "index",
  components: {System, Call, Ing, Head, Quite},
  setup() {
    const data = reactive({
      currentDate: '',
    })
    return {
      ...toRefs(data),
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
</style>