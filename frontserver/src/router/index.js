import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children:[
      {
        path:'',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/defaultAdminPage.vue')
      },
      {
        path:'users/',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageUsers.vue')
      },
      {
        path:'orders/',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageOrders.vue')
      },
      {
        path:'products/',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageProducts.vue')
      },
    ]
  },
  {
    path: '/products/:product_id',
    name: 'products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/productView.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
