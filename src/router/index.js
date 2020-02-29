import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {
        // 商品
        path:'/goods',
        name: 'goods',
        component: () => import('../views/Goods.vue')
      },
      {
        // 评价
        path:'/evaluate',
        name: 'evaluate',
        component: () => import('../views/Evaluate.vue')
      },
      {
        // 商家
        path:'/business',
        name: 'business',
        component: () => import('../views/Business.vue')
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
