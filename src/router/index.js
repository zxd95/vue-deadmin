import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/rms',
    component: Layout,
    redirct: '/rms/banner',
    name: 'rms',
    meta: {title: '海报', icon: 'order'},
    children: [{
      path: 'banner',
      name: 'banner',
      component: () => import('@/views/rms/banner/index'),
      meta: {title: '海报列表', icon: 'product-list'}
    }, {
      path: 'addBanner',
      name: 'addBbanner',
      component: () => import('@/views/rms/banner/add'),
        meta: {title: '添加海报', icon: 'product-add'}
    }]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    },{
      path: 'addProduct',
      name: 'addProduct',
      component: () => import('@/views/pms/product/add'),
      meta: {title: '添加商品', icon: 'product-add'}
    }]
  },
  {
    path: '/sms',
    component: Layout,
    redirct: '/sms/signpicture',
    name: 'sms',
    meta: { title: '标识', icon: 'sms' },
    children: [{
      path: 'signpicture',
      name: 'signpicture',
      component: () => import('@/views/sms/signpicture/index'),
      meta: { title: '标识列表', icon: 'product-list' }
    }, {
      path: 'addSignpicture',
      name: 'addBsignpicture',
      component: () => import('@/views/sms/signpicture/add'),
      meta: { title: '添加标识', icon: 'product-add' }
    }]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

