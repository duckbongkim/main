<template>
  <div>
     <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <div class="menu-title">
                Admin page
                <span class="material-icons icon-left">home</span>
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="toggleMenu('Tables')" :class="{ active: activeMenu === 'Tables' }">
              <div class="menu-title">
                Tables
                <span class="material-icons icon-left">drag_indicator</span>
              </div>
              <span class="material-icons">{{ activeMenu === 'Tables' ? 'expand_less' : 'expand_more' }}</span>
            </a>
            <ul class="nav flex-column sub-menu" :class="{ show: activeMenu === 'Tables' }">
              <li class="nav-item">
                <a class="nav-link" @click="goToMenu('/admin/users')">-사용자 목록</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="goToMenu('/admin/manageOrders')">-주문 목록</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="goToMenu('/admin/manageProducts')">-상품 목록</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="goToMenu('/admin/supplyFactories')">-공급처 관리</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="goToMenu('/admin/productLocations')">-원산지 관리</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="goToMenu('/admin/userRatings')">-사용자 등급 관리</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="goToMenu('/admin/coupons')">-쿠폰 관리</a>
              </li>
            </ul>
          </li>
          
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
export default{ 
    name:'Sidebar',
    components:{},
    computed:{},
    data(){
        return{
            activeMenu: null
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
      toggleMenu(menuName) {
            this.activeMenu = this.activeMenu === menuName ? null : menuName;
      },
      goToMenu(path){
                this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
      },
    },
    watch:{}
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 56px;
  left: 0;
  height: calc(100vh - 56px);
  width: 250px;
  padding-top: 20px;
  z-index: 1010;
  background-color: #1a1a1a;
}

.material-icons {
  vertical-align: middle;
  margin-right: 8px;
  font-size: 20px;
  color: #d4af37; /* 골드 색상의 아이콘 */
}

.sub-menu {
  height: 0;
  opacity: 0;
  overflow: hidden;
  padding-left: 20px;
  transition: all 0.3s ease;
  background-color: #242424; /* 더 어두운 서브메뉴 배경 */
}

.sub-menu.show {
  height: auto;
  opacity: 1;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: #2c2c2c;
  border-radius: 4px;
  margin: 0 8px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}

.nav-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  padding: 8px 16px;
  color: #e0e0e0; /* 밝은 회색 텍스트 */
}

.nav-link:hover {
  background-color: #333333;
  color: #d4af37; /* 호버 시 골드 색상 */
}

.nav-link.active {
  background-color: #333333;
  color: #d4af37;
  border-left: 3px solid #d4af37;
}

.menu-title {
  display: flex;
  align-items: center;
}

.icon-left {
  margin-left: 8px;  /* Tables 텍스트와 아이콘 사이의 간격 */
}

/* 서브메뉴 아이템 스타일 */
.sub-menu .nav-link {
  padding: 6px 15px;
  font-size: 0.9em;
  opacity: 0.8;
  transition: all 0.3s ease;
  color: #b0b0b0; /* 약간 어두운 회색 텍스트 */
}

.sub-menu .nav-link:hover {
  background-color: #333333;
  color: #d4af37;
}

/* ... 나머지 스타일은 동일 ... */
</style>