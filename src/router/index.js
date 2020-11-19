import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'
import { fas } from '@fortawesome/free-solid-svg-icons'

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
    component: () => import(/* webpackChunkName: "Registro" */ '../views/Registro.vue')
  },
  {
    path: '/',
    name: 'Mi Mundo',
    component: () => import(/* webpackChunkName: "Mundo" */ '../views/Inicio.vue'),
    meta: { requiresAuth: true, title: 'Youddly.com - Tu propio internet' }
  },
  {
    path: '/miperfil',
    name: 'Mi Perfil',
    component: () => import(/* webpackChunkName: "Perfil" */ '../views/Miperfil.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/intereses',
    name: 'Intereses',
    component: () => import(/* webpackChunkName: "Intereses" */ '../views/Intereses.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Acceso',
    component: () => import(/* webpackChunkName: "Acceso" */ '../views/Acceso.vue'),
  },
  {
    path: '/terms-conditions',
    name: 'Terms&Conditions',
    component: () => import(/* webpackChunkName: "about" */ '../views/termsAndCondition.vue'),
  },
  {
    path: '/agregar',
    name: 'Agregar',
    component: () => import(/* webpackChunkName: "Agregar" */ '../views/Agregar.vue')
  },
  {
    path: '/timeline/:email',
    name: 'Timeline',
    component: () => import(/* webpackChunkName: "Timeline" */ '../views/timeline.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "Editar" */ '../views/Editar.vue')
  },
  {
    path: '/about',
    name: 'Nosotros',
    component: () => import(/* webpackChunkName: "Nosotros" */ '../views/About.vue')
  },
  {
    path: '/comment/:id',
    name: 'Comment',
    component: () => import(/* webpackChunkName: "Comment" */ '../views/Comment.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/createNews',
    name: 'CreateNews',
    component: () => import(/* webpackChunkName: "CreateNews" */ '../views/CreateNews.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const usuario = auth.currentUser
    if (!usuario) {
      next({ path: '/login' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
