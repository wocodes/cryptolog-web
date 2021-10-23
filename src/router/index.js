import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import {getFromStorage} from "../../helpers/storage";

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
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "forgot-password" */ '../auth/forgot-password/VerifyEmail.vue')
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
        component: () => import(/* webpackChunkName: "asset-logs" */ '../components/User/Logs/Logs.vue')
      },

      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "user-settings" */ '../components/User/Settings/Settings.vue')
      },

      {
        path: '/logs/add',
        name: 'add-log',
        component: () => import(/* webpackChunkName: "add-log" */ '../components/User/Logs/CreateLog.vue')
      },

      {
        path: '/admin/assets/add',
        name: 'add-asset',
        component: () => import(/* webpackChunkName: "add-asset" */ '../components/Admin/Asset/AddAsset.vue')
      },
    ]
  },

  { path: "/:pathMatch(.*)*", redirect: "/" }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let vuexStore = getFromStorage('vuex');
  const USER_TOKEN = vuexStore ? JSON.parse(vuexStore).user.token : null;
  let openRoutes = ["/", "login", "register","forgot-password"];
  let adminRoutes = ["/admin/assets/add"];

  if (adminRoutes.includes(to.name) && this.$store.user.is_admin === 'true') {
    next();
  } else if (!openRoutes.includes(to.name) && !USER_TOKEN) {
    next({ name: 'login' })
  } else if(openRoutes.includes(to.name) && USER_TOKEN) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
});

export default router
