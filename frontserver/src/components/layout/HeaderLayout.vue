<template>
<div>

  <div class="clear">
    <header>
      <button class="login-button" @click="$router.push('/login')">로그인</button>
    </header>

    <header>
      <button class="basket-button" @click="$router.push('/basket')">장바구니</button>
    </header>    
  </div>
    
  <nav class="navbar navbar-expand-lg bg-body-tertiary additional-height">
  <div class="container-fluid">
    <a class="navbar-brand" @click="goToMenu('/')">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" @click="goToMenu('/admin')" href="#">Admin</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
            주류
          </a>
          <ul class="dropdown-menu">
            <li><p class="inner-title">하이볼</p></li>
            <li><a class="dropdown-item" @click="goToMenu('/test')">버번 위스키 하이볼</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/string')">코슈 하이볼</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/html')">로얄 오크 하이볼</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/attribute')">고베 쿄류치 하이볼</a></li>
            <li><p class="inner-title">위스키</p></li>
            <li><a class="dropdown-item" @click="goToMenu('/class')">잭 다니엘스 테네시 허니</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/list')">탈리스만</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/input')">에반 윌리엄스 블랙</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/tt')">라벨 5</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/CBS')">제임슨 스탠다드</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
            Day3
          </a>
          <ul class="dropdown-menu">
            <li ><p class="inner-title">Event</p></li>
            <li><a class="dropdown-item" @click="goToMenu('/click')">Click</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/change')">Change</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/change2')">Change2</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/key')">Key</a></li>
            <li ><p class="inner-title">Extra</p></li>
            <li><a class="dropdown-item" @click="goToMenu('/render')">Render</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/rendershow')">RenderShow</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/computed')">Computed</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/watch')">Watch</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/lifecycle')">LifeCycle</a></li>
          </ul>
        </li>
          <!-- 커뮤니티 -->
          <li class="nav-item">
            <a class="nav-link" href="#">커뮤니티</a>
          </li>
      </ul>
    </div>
  </div>
</nav>
</div>
</template>

<script>
    export default{
    methods :{
    goToMenu(path){
    this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
        }
      }
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

  /* navbar 호버 기능 추가 */
  /* 드롭다운을 호버로 열리도록 설정 */
  .dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0; /* Bootstrap 기본 설정으로 생기는 간격 제거 */
    width: 200px; /* 원하는 너비로 조절 */
    min-width: 100%; /* 원하는 너비를 설정 */
  }

</style>

