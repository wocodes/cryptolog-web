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
    path: '/app',
    name: 'app',
    component: () => import(/* webpackChunkName: "main-view" */ '../components/Layout/MainView.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/Dashboard/Dashboard.vue')
      },

      {
        path: '/assets/log',
        name: 'logs',
        component: () => import(/* webpackChunkName: "logs" */ '../components/Logs/Logs.vue')
      },

      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "logs" */ '../components/Logs/Logs.vue')
      },

      {
        path: '/logs/add',
        name: 'add-log',
        component: () => import(/* webpackChunkName: "logs" */ '../components/Logs/Create.vue')
      },
    ]
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
