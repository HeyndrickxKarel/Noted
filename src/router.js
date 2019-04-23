import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (settings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue')
    },
    {
      path: '/deleted',
      name:'deleted',
      component: () => import(/* webpackChunkName: "deleted" */ './views/Deleted.vue')

    },
    {
      path: '/logout',
      name:'logout',
      component: () => import(/* webpackChunkName: "deleted" */ './views/Logout.vue')

    }
    
  ]
})
