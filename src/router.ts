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
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import(/* webpackChunkName: "playlist" */ './views/Playlist.vue')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import(/* webpackChunkName: "tools" */ './views/Tools.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import(/* webpackChunkName: "error" */ './views/Error.vue')
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import(/* webpackChunkName: "notFound" */ './views/NotFound.vue')
    }
  ]
})
