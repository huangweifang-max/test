import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Daohang from '../views/Daohang.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'daohang',
    component: Daohang
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
