import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AdminView from '../views/AdminView.vue'
import ProductView from '../views/ProductView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductView
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
        path:'manageProducts/', //products에서 manageProducts로 변경 (241230 누리)
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageProducts.vue')
      },
<<<<<<< HEAD
      
=======
      {
        path:'addAccount/',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/addAccount.vue')
      }
>>>>>>> 70c0e56e9e5828ac4709d17a49448da8b94d70f8
    ]
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