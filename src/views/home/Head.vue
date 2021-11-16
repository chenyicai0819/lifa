<template>
  <div class="head">
    <Logo/>
    <HeadMenu/>
    <Operate/>
  </div>
</template>

<script>
import Logo from "./logo";
import HeadMenu from "./HeadMenu";
import Operate from "./Operate";
export default {
  name: "Head",
  components: {Operate, HeadMenu, Logo}
}
</script>

<style scoped>
.head{
  height: 60px;
  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
  display: flex;
}


</style>