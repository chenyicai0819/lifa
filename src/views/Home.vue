<template>
  <div class="home">
    <div id="head">
      <Head/>
    </div>
    <div id="body">
      <Sidbar/>
      <div class="body-router">
        <router-view/>
      </div>

    </div>
  </div>

</template>

<script>
// @ is an alias to /src

import Head from "./home/Head";
import Sidbar from "./sidbar/Sidbar";

export default {
  name: 'Home',
  components: {
    Sidbar,
    Head
  }
}
</script>

<style scoped>
#body {
  display: flex;
}
.body-router{
  width: 85%;
  margin-left: 1%;
  margin-right: 1%;
}
</style>