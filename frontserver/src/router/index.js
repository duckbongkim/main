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
    path: '/products/:product_id', //products에서 products/:product_id로 변경 (25,1,1 동진)
    name: 'products',
    component: ProductView
  },
  {
    path: '/createAccount', //products에서 products/:product_id로 변경 (25,1,1 동진)
    name: 'createAccount',
    component: () => import(/* webpackChunkName: "createAccount" webpackPrefetch:true*/ '../views/auth/createAccountView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" webpackPrefetch:true*/ '../views/auth/loginView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children:[
      {
        path:'',
        name:'',
        component: () => import(/* webpackChunkName: "defaultAdminPage" */ '../components/admin/defaultAdminPage.vue')
      },
      {
        path:'users/',
        name:'users',
        component: () => import(/* webpackChunkName: "manageUsers" */ '../components/admin/manageUsers.vue')
      },
      {
        path:'orders/',
        name:'orders',
        component: () => import(/* webpackChunkName: "manageOrders" */ '../components/admin/manageOrders.vue')
      },
      {
        path:'products/',
        component: () => import(/* webpackChunkName: "manageProducts" */ '../components/admin/manageProducts.vue')
      },
      {
        path:'manageProducts/', //products에서 manageProducts로 변경 (241230 누리)
        name:'manageProducts',
        component: () => import(/* webpackChunkName: "manageProducts" */ '../components/admin/manageProducts.vue')
      },      
      {
        path:'addAccount/',
        name:'addAccount',
        component: () => import(/* webpackChunkName: "addAccount" */ '../components/admin/addAccount.vue')
      },
      {

        path:'ModifyProduct/:id',
        component: () => import(/* webpackChunkName: "addOrModifyProduct" */ '../components/admin/addOrModifyProduct.vue')
      },
      {
        path:'addProduct/',
        component: () => import(/* webpackChunkName: "addOrModifyProduct" */ '../components/admin/addOrModifyProduct.vue')
      },
      {
        path:'supplyFactories/',
        component: () => import(/* webpackChunkName: "manageSupplyFactories" */ '../components/admin/manageSupplyFactories.vue')
      },
      {
        path:'productLocations/',
        component: () => import(/* webpackChunkName: "manageProductLocations" */ '../components/admin/manageProductLocations.vue')
      },
      {
        path:'cart/',
        name:'cart',
        component: () => import(/* webpackChunkName: "about" */ '../components/orders/userCart.vue')
      },
      {
        path:'wish/',
        name:'wish',
        component: () => import(/* webpackChunkName: "about" */ '../components/orders/userWishes.vue')
      },
      {
        path:'order/',
        name:'order',
        component: () => import(/* webpackChunkName: "about" */ '../components/orders/makeOrder.vue')

      },
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
