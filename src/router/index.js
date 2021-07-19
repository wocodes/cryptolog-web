import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {getFromStorage} from "../../helpers/storage";
import {TOKEN_KEY} from "../../helpers/constants";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../auth/login/Login.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../auth/register/Register.vue')
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../components/dashboard/Dashboard')
  },

  { path: "/:pathMatch(.*)*", redirect: "/" }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let openRoutes = ["login", "register"];

  if (!openRoutes.includes(to.name) && !getFromStorage(TOKEN_KEY)) {
    next({ name: 'login' })
  } else if(openRoutes.includes(to.name) && getFromStorage(TOKEN_KEY)) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
});

export default router
