import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/Login')
  },
  {
    path: '/successReturn',
    name: 'successReturn',
    meta: { permission: false },
    component: ()=>import('../views/counter/SuccessReturn')
  },
  {
    path: '/index',
    name: 'index',
    meta: { permission: true },
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: ()=>import('../views/Index')
      },
    ]
  },
  {
    path: '/home',
    name: 'Home',
    meta: { permission: true },
    component: () => import('../views/Home.vue'),
    children:[
      {
        path: '',
        name: 'counter',
        component: ()=>import('../views/counter/Index')
      },
      {
        path: 'card',
        name: 'card',
        component: ()=>import('../views/counter/Card')
      },
      {
        path: 'pending',
        name: 'pending',
        component: ()=>import('../views/counter/Pending')
      },
      {
        path: 'order',
        name: 'order',
        component: ()=>import('../views/counter/Order')
      },
      {
        path: 'currency',
        name: 'currency',
        component: ()=>import('../views/counter/Currency')
      },
    ]
  },
  {
    path: '/vips',
    name: 'vips',
    meta: { permission: true },
    component: () => import('../views/Home.vue'),
    children:[
      {
        path: 'vipslist',
        name: 'vipsList',
        component: ()=>import('../views/vips/VipsList')
      },
      {
        path: 'guest',
        name: 'guest',
        component: ()=>import('../views/vips/Guest')
      },
      {
        path: 'chats',
        name: 'chats',
        component: ()=>import('../views/vips/Chats')
      },
    ]
  },
  {
    path: '/system',
    name: 'system',
    meta: { permission: true },
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'staff',
        name: 'staff',
        component: ()=>import('../views/system/Staff')
      },
      {
        path: 'cardtype',
        name: 'cardtype',
        component: ()=>import('../views/system/CardType')
      },
      {
        path: 'service',
        name: 'service',
        component: ()=>import('../views/system/ServiceList')
      },
      {
        path: 'combo',
        name: 'combo',
        component: ()=>import('../views/system/Combo')
      },
      {
        path: 'shop',
        name: 'shop',
        component: ()=>import('../views/system/Shop')
      },
      {
        path: 'bonus',
        name: 'bonus',
        component: ()=>import('../views/system/Bonus')
      },
      {
        path: 'logs',
        name: 'logs',
        component: ()=>import('../views/system/Logs')
      },
    ]
  },
  {
    path: '/finance',
    name: 'finance',
    meta: {permission: true},
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'worker',
        name: 'worker',
        component: ()=>import('../views/finance/Worker')
      },
      {
        path: 'ordercheck',
        name: 'ordercheck',
        component: ()=>import('../views/finance/OrderCheck')
      },
      {
        path: 'bonuscheck',
        name: 'bonuscheck',
        component: ()=>import('../views/finance/BonusCheck')
      },
      {
        path: 'servicelog',
        name: 'servicelog',
        component: ()=>import('../views/finance/ServiceLog')
      },
      {
        path: 'shoplog',
        name: 'shoplog',
        component: ()=>import('../views/finance/ShopLog')
      },
      {
        path: 'cardlog',
        name: 'cardlog',
        component: ()=>import('../views/finance/CardLog')
      },
    ]
  },
  {
    path: '/digital',
    name: 'digital',
    meta: {permission: true},
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'billreport',
        name: 'billreport',
        component: ()=>import('../views/digital/BillReport')
      },
      {
        path: 'workreport',
        name: 'workreport',
        component: ()=>import('../views/digital/WorkReport')
      },
      {
        path: 'orderreport',
        name: 'orderreport',
        component: ()=>import('../views/digital/OrderReport')
      },
      {
        path: 'shopreport',
        name: 'shopreport',
        component: ()=>import('../views/digital/ShopReport')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    meta: { permission: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(((to, from, next) => {
  if(to.meta.permission) {
    /*判断交互过程中 token登录状态的记录*/
    let token = localStorage.getItem('loginToken');
    if (token === null || token === ''||token===undefined) {
      /*没有登录状态 表示当前用户未登录 则返回项目登录 首页*/
      alert("请先登录")
      next('/login');
    } else {
      /*存在token手令 表示当前用户已登录  访问路径放行*/
      next();
    }
  } else {
    next();
  }
}))
export default router
