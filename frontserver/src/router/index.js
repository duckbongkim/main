import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import AdminView from '../views/AdminView.vue';
import ProductView from '../views/ProductView.vue';
import OrderView from '../views/OrderView.vue';

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
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children:[
      {
        path:'',
        name:'',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/defaultAdminPage.vue')
      },
      {
        path:'users/',
        name:'users',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageUsers.vue')
      },
      {
        path:'orders/',
        name:'orders',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageOrders.vue')
      },
      {
        path:'products/',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageProducts.vue')
      },
      {
        path:'manageProducts/', //products에서 manageProducts로 변경 (241230 누리)
        name:'manageProducts',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageProducts.vue')
      },      
      {
        path:'addAccount/',
        name:'addAccount',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/addAccount.vue')
      },
      {

        path:'ModifyProduct/:id',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/addOrModifyProduct.vue')
      },
      {
        path:'addProduct/',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/addOrModifyProduct.vue')
      },
      {
        path:'supplyFactories/',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageSupplyFactories.vue')
      },
      {
        path:'productLocations/',
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageProductLocations.vue')
      },
    ]
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderView,
    children:[
      {
        path:'/cart',
        name:'cart',
        component: () => import(/* webpackChunkName: "orders" */ '../components/orders/userCart.vue')
      },
      {
        path:'/wish',
        name:'wish',
        component: () => import(/* webpackChunkName: "orders" */ '../components/orders/userWishes.vue')
      },
      {
        path:'/order',
        name:'order',
        component: () => import(/* webpackChunkName: "orders" */ '../components/orders/makeOrder.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
