import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/Login')
  },
  {
    path: '/index',
    name: 'index',
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
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'staff',
        name: 'staff',
        component: ()=>import('../views/system/Staff')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
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

export default router
