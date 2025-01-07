
import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AdminView from '../views/AdminView.vue'
import ProductView from '../views/ProductView.vue'
import MypageView from '../views/MypageView.vue'
import OrderView from '../views/OrderView.vue'
import productList from '../components/list/productList.vue';
import PostListView from '../views/PostListView.vue'
import testView from '../views/testView.vue'




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
    path: '/createAccount', 
    name: 'createAccount',
        //250103 누리) ',' 추가. chunkname이랑 prefetch 사이에 ',' 있어야 오류 안남
    component: () => import(/* webpackChunkName: "createAccount", webpackPrefetch: true */ '../views/auth/createAccountView.vue')
  },
  {
    path: '/postlist',
    name: 'postlist',
    component: PostListView,
    children: [
      {
        path: ':post_kind', 
        name: 'postlistKind', 
        component: () => import('../components/post/boardlist.vue'),
        props: true, 
      },
      {
        path: '',
        name: 'post_all',
        component: () => import('../components/post/postAll.vue')
      }
    ]
  },
  {

    path: '/liqueur', // 상품리스트 임시용
    name: 'liqueur',
    component: productList
  },
  {
    path: '/liqueur/:drink_type', // 상품리스트 임시용
    name: 'drink_type',
    component: productList,
    props: true
  },
  {
    path: '/post/post_detail/:id',
    name: 'post_detail',
    component: () => import(/* webpackChunkName: "post_detail" */ '../views/post/postDetailView.vue')
  },
  {
    path: '/post/addPost',
    name: 'addPost',
    component: () => import(/* webpackChunkName: "addPost" */ '../views/post/AddOrModifyPostView.vue')
  },
  {
    path: '/post/modifyPost/:id',
    name: 'modifyPost',
    component: () => import(/* webpackChunkName: "modifyPost" */ '../views/post/AddOrModifyPostView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/auth/loginView.vue')
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
        path:'manageOrders/',
        name:'manageOrders',
        component: () => import(/* webpackChunkName: "manageOrders" */ '../components/admin/manageOrders.vue')
      },
      {
        path:'products/',
        name:'products',
        component: () => import(/* webpackChunkName: "manageProducts" */ '../components/admin/manageProducts.vue')
      },
      {
        path:'addAccount/',
        name:'addAccount',
        component: () => import(/* webpackChunkName: "addAccount" */ '../components/admin/addAccount.vue')
      },
      {

        path:'modifyProduct/:id',
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
        component: () => import(/* webpackChunkName: "about" */ '../components/admin/manageProductLocations.vue')
      },
    ]
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MypageView,
  }, // 마이페이지 view 추가

  {
    path: '/orders',
    name: 'orders',
    component: OrderView,
    children:[
      {
        path:'/cart/:userId',
        name:'cart',
        component: () => import(/* webpackChunkName: "orders" */ '../components/orders/userCart.vue')
      },
      {
        path:'/wish/:userId',
        name:'wish',
        component: () => import(/* webpackChunkName: "orders" */ '../components/orders/userWishes.vue')
      },
      {
        path:'/order/:userId',
        name:'order',
        component: () => import(/* webpackChunkName: "orders" */ '../components/orders/makeOrder.vue')
      },


    ]
  },

  // 2025-01-02 김우진 nav바에서 주류사이트로 이동이 가능하게 components에 test를 만들어서 연결 시켰습니다.성공!!
  {
    path:'/liqueur',
    name:'liqueur',
    component: () => import(/* webpackChunkName: "about" */ '../components/liqueurs/liqueur.vue')

  },
  {
    path:'/whiskey',
    name:'whiskey',
    component: () => import(/* webpackChunkName: "about" */ '../components/liqueurs/whiskey.vue')

  },
  {
    path:'/wine',
    name:'wine',
    component: () => import(/* webpackChunkName: "about" */ '../components/liqueurs/wine.vue')

  },
  {
    path:'/traditional',
    name:'traditional',
    component: () => import(/* webpackChunkName: "about" */ '../components/liqueurs/traditional.vue')

  },
  // 2025-01-03 김우진 여기는 etc상품 이동 라우터 입니다.
  {
    path:'/glass',
    name:'glass',
    component: () => import(/* webpackChunkName: "about" */ '../components/etc/glass.vue')

  },
  {
    path:'/holder',
    name:'holder',
    component: () => import(/* webpackChunkName: "about" */ '../components/etc/holder.vue')

  },
  {
    path:'/opener',
    name:'opener',
    component: () => import(/* webpackChunkName: "about" */ '../components/etc/opener.vue')

  },
  {
    path:'/ontherocks',
    name:'ontherocks',
    component: () => import(/* webpackChunkName: "about" */ '../components/etc/ontherocks.vue')

  },
  {
    path:'/straight',
    name:'straight',
    component: () => import(/* webpackChunkName: "about" */ '../components/etc/straight.vue')

  },
  {
    path:'/decanter',
    name:'decanter',
    component: () => import(/* webpackChunkName: "about" */ '../components/etc/decanter.vue')

  },
  {
    path: '/test',
    name: 'test',
    component: testView
  }, // startbootstrap 테스트 위해 1월 5일 동진









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
