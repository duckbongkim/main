import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AdminView from '../views/AdminView.vue'
import ProductView from '../views/ProductView.vue'
import test from '../components/layout/test.vue'; // nav바 주류리스트로 이동하는지 테스트 입니다.
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
  // 2025-01-02 김우진 nav바에서 주류사이트로 이동이 가능하게 components에 test를 만들어서 연결 시켰습니다.성공!!
  {
  path: '/layout',
  name: 'layout',
  component: test,
  children:[
    {
      path:'/test',
      name:'test',
      component: () => import(/* webpackChunkName: "about" */ '../components/layout/test.vue')
  
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
