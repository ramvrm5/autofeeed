import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {auth} from '../firebase'

Vue.use(VueRouter)

  const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: Home
  },*/
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/',
    name: 'Mi Mundo',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue'),
    meta: {requiresAuth: true, title: 'Youddly.com - Tu propio internet'}
  },
  {
    path: '/miperfil',
    name: 'Mi Perfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Miperfil.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/intereses',
    name: 'Intereses',
    component: () => import(/* webpackChunkName: "about" */ '../views/Intereses.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Acceso',
    component: () => import(/* webpackChunkName: "about" */ '../views/Acceso.vue')
  },
  {
    path: '/agregar',
    name: 'Agregar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Agregar.vue')
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue')
  },
  {
    path: '/about',
    name: 'Nosotros',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/comment/:id',
    name: 'Comment',
    component: () => import(/* webpackChunkName: "about" */ '../views/Comment.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/createNews',
    name: 'CreateNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateNews.vue'),
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth))
  {
  const usuario = auth.currentUser
  if (!usuario)
  {
    next({path: '/login'})
  }
  else{
    next()
  }

  }
  else
  {
    next()
  }
  })


export default router
