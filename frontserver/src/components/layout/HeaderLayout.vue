<template>
<div>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="clear">
        <div class="welcome-message" v-show="isLoggedIn">환영합니다!</div>
        <button class="login-button" v-show="!isLoggedIn" @click="$router.push('/login')">로그인</button>
        <button class="login-button" v-show="!isLoggedIn" @click="$router.push('/agree')">회원가입</button>
        <button class="login-button" v-show="isLoggedIn" @click="logout">로그아웃</button>
        <i class="bi bi-cart3 icon" @click="checkLoginAndGoToPage('/cart/1')" title="장바구니"></i>
        <i class="bi bi-person icon" @click="checkLoginAndGoToPage('/mypage')" title="마이페이지"></i>
      </div>
      <a class="navbar-brand" @click="goToMenu('/')">Home</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="checkAdmin">
            <a class="nav-link active" aria-current="page" @click="goToAdmin('/admin')">Admin</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click="goToMenu('/products')">productDetail</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" aria-expanded="false">
              주류
            </a>
            <ul class="dropdown-menu">

              <li><a class="inner-title" @click="goToMenu('/liqueur')">테스트</a></li>            
              <li><a class="inner-title" @click="goToMenu('/liqueur/wine')">와인</a></li>     
              <li><a class="inner-title" @click="goToMenu('/whiskey')">위스키</a></li>      
              <li><a class="inner-title" @click="goToMenu('/traditional')">동양주류</a></li>               
            </ul>           
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
              etc 상품
            </a>
            <ul class="dropdown-menu">
              <li><a class="inner-title" @click="goToMenu('/glass')">와인잔</a></li> 
              <li><a class="inner-title" @click="goToMenu('/holder')">와인홀더</a></li> 
              <li><a class="inner-title" @click="goToMenu('/opener')">와인오프너</a></li> 
              <li><a class="inner-title" @click="goToMenu('/onetherock')">온더락잔</a></li> 
              <li><a class="inner-title" @click="goToMenu('/straight')">스트레이트 잔</a></li> 
              <li><a class="inner-title" @click="goToMenu('/decanter')">위스키 디캔터</a></li>
            </ul>
          </li>
            <!-- 커뮤니티 -->
            <li class="nav-item">
              <a class="nav-link" @click="goToMenu('/postlist')">커뮤니티</a>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
      return {
        isLoggedIn:false,
        checkAdmin:false,
      }
    },
    watch: {
      '$route': {
        handler() {//라우터가 변경될 때 마다 실행되는 콜백 함수
          this.checkLogin(); // 라우트 변경시마다 로그인 상태 확인
        },
        immediate: true
      }
    },
    methods :{
    // 로그아웃 처리 함수 여기부터 logout까지 2025-01-07
      async checkLogin() {
          try {
              const response = await axios.get('http://localhost:3000/auth/check',{withCredentials:true});
              this.isLoggedIn = response.data.isLoggedIn;
              this.checkAdmin = response.data.isAdmin;
          } catch (error) {
              this.isLoggedIn = false;
          }
      },
      async login() {
          try {
            const response = await axios.post('http://localhost:3000/auth/login', {
              username: this.username,
              password: this.password,
            }, { withCredentials: true });

            if (response.data.success) {
              this.isLoggedIn = true; // 로그인 성공 시 상태 업데이트
              alert("로그인에 성공했습니다!");
              this.$router.push('/'); // 로그인 후 홈으로 이동
            } else {
              alert("로그인에 실패했습니다. 다시 시도해주세요.");
            }
          } catch (error) {
            console.error("로그인 요청 중 오류 발생:", error);
            alert("로그인 중 문제가 발생했습니다.");
          }
        },
      async logout() {
          try {
            await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
            this.isLoggedIn = false; // 로그아웃 후 즉시 상태 갱신
            alert("로그아웃 되었습니다!");
            this.checkAdmin = false;
            this.isLoggedIn = false;
            this.$router.push('/'); // 로그아웃 후 홈으로 이동
          } catch (error) {
            console.error("로그아웃 실패:", error);
          }
      },


      goToMenu(path){
        this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
      },
      goToAdmin(path){
        if(this.checkAdmin){
          this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
        }else{
          alert("관리자가 아닙니다.");
        }
      },
      checkLoginAndGoToPage(path){
        if(this.isLoggedIn){
          this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
        }else{
          alert("로그인이 필요합니다.");
          this.$router.push('/login');
        }
      },
    },
    mounted() {
    },
    handleSearch() {
    this.$router.push({
      path: '/liqueur',
      query: { search: this.searchQuery }
    });
  },

}


</script>

<style scoped>
  li{
    padding: 0 10px;
  }
  a{
    cursor: pointer;
      
  }
  .inner-title{
    margin: 10px 0 0 5px;
    font-weight: 700;
  }

  .header {
    display: flex;
    justify-content: flex-end;
  }

  .clear::after{
    content:'';
    display: block;
    clear: both;
  }
  /* 로그인 버튼 */
  .login-button{
    top: 20px;
    margin-right: 20px; /* 20px 왼쪽으로 이동 */
    margin-top: 20px; /* 20px 아래로 이동 */
    float:right;
    padding: 5px 10px;   
    font-size: 14px;
  }
  /* 장바구니 버튼 */
  .basket-button{
    top: 20px;
    margin-right: 20px; /* 20px 왼쪽으로 이동 */
    margin-top: 20px; /* 20px 아래로 이동 */
    float:right;
    padding: 5px 10px;   
    font-size: 14px;
  }
  /* 회원가입 버튼 */
  .createAccount-button{
    top: 20px;
    margin-right: 20px; /* 20px 왼쪽으로 이동 */
    margin-top: 20px; /* 20px 아래로 이동 */
    float:right;
    padding: 5px 10px;   
    font-size: 14px;
  }  


  /* navbar 호버 기능 추가 */
  /* 드롭다운을 호버로 열리도록 설정 */
  .dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0; /* Bootstrap 기본 설정으로 생기는 간격 제거 */
    width: 200px; /* 원하는 너비로 조절 */
    min-width: 100%; /* 원하는 너비를 설정 */
  }

  .nav-item {
    margin-right: 50px;  /* 항목들 간의 간격을 늘림 */
  }

  .nav-item:last-child {
    margin-right: 0;  /* 마지막 항목은 오른쪽 마진 제거 */
  }
  /* 로그인시 환영합니다! 2025-01-07*/
  .clear {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px;
  }

  .welcome-message {
    margin-right: 15px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }

  .icon {
    margin: 0 10px;
    font-size: 20px;
    cursor: pointer;
  }

  .login-button {
    margin: 0 10px;
    padding: 6px 15px;
    font-size: 14px;
    color: #666;
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .navbar {
    height: 90px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: white;
  }

  .container-fluid {
    position: relative;
    height: 100%;
  }

  .clear {
    position: absolute;
    top: 10px;
    right: 20px;
  }
</style>

