<template>
<div>

  <div class="clear">
      <!-- 임시 검색창 -->
      <div class="search-form">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="검색어를 입력하세요"
        >
        <button @click="handleSearch">검색</button>
      </div>

      <button @click="$router.push('/mypage')">마이페이지</button>
      <button @click="$router.push('/post/post_detail/3')">게시물 상세 페이지 테스트 버튼</button>
      <button @click="$router.push('/post/addPost')">게시물 추가 페이지 테스트 버튼</button>


    <!-- 로그인 상태가 아니면 로그인, 회원가입 버튼 표시 -->
    <button class="login-button" v-show="!isLoggedIn" @click="$router.push('/login')">로그인</button>
    <button class="login-button" v-show="!isLoggedIn" @click="$router.push('/agree')">회원가입</button>

    <!-- 로그인 상태이면 로그아웃 버튼 표시 -->
    <button class="login-button" v-show="isLoggedIn" @click="logout">로그아웃</button>

    <!-- 장바구니, 마이페이지 버튼은 로그인 여부와 상관없이 항상 표시 -->
    <button class="basket-button" @click="$router.push('/basket')">장바구니</button>
    <button @click="$router.push('/mypage')">마이페이지</button>
    <!-- 로그인 상태에서 우측 상단에 환영 메시지 표시 -->
    <div class="welcome-message" v-show="isLoggedIn">
      환영합니다!
    </div>

  </div>
    
  <nav class="navbar navbar-expand-lg bg-body-tertiary additional-height">
  <div class="container-fluid">
    <a class="navbar-brand" @click="goToMenu('/')">Home</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" @click="goToMenu('/admin')">Admin</a>
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
            <a class="nav-link" @click="goToMenu('/test')">커뮤니티</a>
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
        account: [],
        isLoggedIn:false,
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
              console.log("response",response);
              this.isLoggedIn = response.data.isLoggedIn;
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
            this.$router.push('/'); // 로그아웃 후 홈으로 이동
          } catch (error) {
            console.error("로그아웃 실패:", error);
          }
        },

      async getaccount(){
      try{
        const response = await axios.get(`http://localhost:3000/${router}`);
        this.account = response.data;
        console.log(response);
      }catch(err){
        console.error(err);
      }
      
    },

    goToMenu(path){
    this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
        },
      },
    mounted() {
      this.checkLogin(); // 컴포넌트 로드시 로그인 상태 확인
    } ,
    
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
    position: relative; /* 부모 요소를 기준으로 위치 지정 */
  }

  .welcome-message {
    position: absolute;
    top: 25px;
    right: 210px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }  
</style>

