import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/AssetStatus',
      name: 'AssetStatus',
      component: () => import('@/views/AssetStatus.vue')
    },
    {
      path: '/AssetTrading',
      name: 'Estatebook',
      component: () => import('@/views/AssetTrading.vue')
    },
    {
      path: '/Bigdata',
      name: 'Bigdata',
      component: () => import('@/views/Bigdata.vue')
    },
    {
      path: '/AssetPricing',
      name: 'AssetPricing',
      component: () => import('@/views/AssetPricing.vue')
    },
    {
      path: '/',
      name:'Login',
      component:() => import('@/views/Login.vue')
    }
    ,
    {
      path:'/Register',
      name:'Register',
      component:()=>import('@/views/Register.vue')
    },
    {
      path:'/Main',
      name:'Main',
      component:()=>import('@/views/Main.vue')
    }
  ]
})
