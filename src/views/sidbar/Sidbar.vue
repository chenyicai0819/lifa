<template>
  <div class="sidbar">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            unique-opened="true"
            background-color="#EBEEF5"
            active-text-color="#f5576c"
            router="true"
        >
          <el-sub-menu
              class="submenu"
              :index="item.id"
              v-for="item in menuList"
              :key="item.id"
          >
            <template #title class="submenu-title">
              <span style="font-size: 18px">{{ item.name }}</span>
            </template>
            <el-menu-item
                @click="itemClick"
                class="submenu-item"
                :index="subItem.path"
                v-for="subItem in item.chi"
                :key="subItem.id"

            >
              <span style="font-size: 18px">{{ subItem.name }}</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs, watch} from "vue";
import { useStore } from 'vuex'

export default {
  name: "Sidbar",
  components: {
  },
  setup() {
    const store =useStore();
    const data=reactive({
      menuList: [],
    })
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const itemClick = (key) => {
      console.log(key.index)
    }
    // 监听导航栏内容改变
    //通过一个函数返回要监听的属性
    watch(()=>store.state.trees.menuList,()=>{
      data.menuList=store.state.trees.menuList

    })
    // 渲染侧边导航栏之前就进行传值
    onBeforeMount(()=>{
      data.menuList=store.state.trees.menuList
    })
    return {
      ...toRefs(data),
      itemClick,
      handleOpen,
      handleClose,
    }
  },
}
</script>

<style scoped>
.sidbar{
  min-height: 100%;
  width: 13%;
  background-color: #EBEEF5;
}
.el-row {
  width: 400px;
}
.el-menu-item:hover{
  background-color: #F270A9 !important;
  color: #FFFFFF !important;
}

</style>