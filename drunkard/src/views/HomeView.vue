<template>
<div>
    <div>
      
    </div>
    <!--navbar -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <!--주류 종류-->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              주류 종류
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">와인</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">위스키</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">막걸리</a></li>
            </ul>
          </li>
          <!--부가 상품-->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
              부가 상품
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">잔</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">음식</a></li>
            </ul>
          </li>
          <!-- 커뮤니티 -->
          <li class="nav-item">
            <a class="nav-link" href="#">커뮤니티</a>
          </li>
        </ul>
        <!-- Search -->
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>   
    </div>
    </nav>

    <!-- 슬라이드 -->
    <div id="carouselExampleIndicators" class="carousel slide centered-carousel" data-bs-ride="carousel" data-bs-theme="dark">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active test">
          <img src="img\소주.jpg" class="d-block w-100" alt="01">
        </div>
        <div class="carousel-item test">
          <img src="img\청하.jpg" class="d-block w-100" alt="02">
        </div>
        <div class="carousel-item test">
          <img src="img\dnltmzl.jpg" class="d-block w-100" alt="03">
        </div>
      </div>
      <button class="carousel-control-prev" data-bs-theme="dark" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" >
        <span class="carousel-control-prev-icon test" aria-hidden="true" ></span>
        <span class="visually-hidden test" >Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>













</div>
</template>


<script>
export default{ 
  name:'',
  components:{},
  data(){
    return{

    };
  },
  setup(){},
  created(){},
  mounted(){},
  unmounted(){},
  methods:{},
  computed:{},
  watch:{}
}
</script>


<style>
  /* navbar 호버 기능 추가 */
  /* 드롭다운을 호버로 열리도록 설정 */
  .dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0; /* Bootstrap 기본 설정으로 생기는 간격 제거 */
    width: 200px; /* 원하는 너비로 조절 */
    min-width: 100%; /* 원하는 너비를 설정 */
  }
  .dropdown-item {
    padding-left: 20px; /* 왼쪽 여백 조절 */
    text-align: center; /* 텍스트 가운데 정렬 */
  }



  /* body부분 - 캐러셀 */
  /* 기본 캐러셀 스타일 */

  .carousel-item img {
    width: 300px; /* 이미지를 캐러셀 아이템 너비에 맞춤 */
    height: 500px; /* 높이는 자동으로 조절 */
    object-fit: contain; /* 이미지 비율 유지하며 최대한 크게 보여줌 */
  }
  .carousel-item{
    width: 300px;
  }
  .test{
    color:black;
  }

</style>
