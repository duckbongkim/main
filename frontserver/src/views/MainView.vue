<template>
<div class="div1">

  
    <!-- 광고형 슬라이드 -->
    <div id="carouselExampleIndicators" class="carousel slide centered-carousel" data-bs-ride="carousel" data-bs-theme="dark">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active test">
            <img src="img\1122.jpg" class="d-block w-100" alt="01">
        </div>
        <div class="carousel-item test">
          <img src="img\1122.jpg" class="d-block w-100" alt="02">
        </div>
        <div class="carousel-item test">
          <img src="img\1122.jpg" class="d-block w-100" alt="03">
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
    <section>
      <!-- 캐러셀 코드 -->
      <v-carousel v-if="mainData.expensive.length > 0" height="400" show-arrows="hover" cycle hide-delimiter-background>
        <v-carousel-item
          v-for="item in mainData.expensive"
          :key="item.id"
          @click="goProducts(item.id)"
        >
          <v-sheet color="white lighten-2" height="100%">
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-center">
                <img :src="item.product_image" alt="Product Image" style="max-height: 200px; object-fit: contain;" />
                <strong class="text-h5">{{ item.product_name }}</strong>
                <div class="text-h6 mt-2">{{ item.product_price }}원</div>
              </div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </section>

    <!-- swiper expensive-container-->
      <div class="slider expensive-slider">
        <!-- 추천 배너 텍스트 추가 -->
        <div class="expensive-image">
          <img src="img\배너0.jpg" class="left-image" alt="04" />
        </div>
        <div class="swiper-container expensive-container">
          
          <div class="expensive-title">
            <h2>고가 상품추천</h2>
            <p>아이우에오</p>
          </div>
          
          <div class="swiper-wrapper expensive-wrapper">
            <div class="swiper-slide expensive-slide" v-for="item in mainData.cheap" :key="item.id" @click="goProducts(item.id)">
              <img :src="item.product_image" alt="Product Image" />
              <p>{{ item.product_name }}</p> 
              <p>{{ item.product_price }}원</p>
            </div>
          </div>

          <!-- Navigation buttons -->
          <!-- <div class="swiper-button-prev expensive-prev"></div> -->
          <div class="swiper-button-next expensive-next"></div>
          <!-- Scrollbar -->
          <div class="swiper-scrollbar"></div>
        </div>

      </div>
      <div class="bar1"></div>
    <!-- swiper 3 -->
    <section>
      <div class="bar1"></div>
      <div class="recommendation-banner">"30대"에게 추천</div>
      <div class="container swiper-container-thirties">

        <div class="swiper1-title">
          <h2>30대 상품추천</h2>
          <p>30대 추천 상품</p>
        </div>

        <div class="swiper-wrapper">
          <div 
            class="swiper-slide" 
            v-for="item in mainData.expensive" 
            :key="item.id"
            @click="goProducts(item.id)"
          >
            <img :src="item.product_image" alt="Product Image" />
            <!-- 텍스트와 가격을 감싸는 div 추가 -->
            <div class="text-container">
              <p>{{ item.product_name }}</p>
              <p>{{ item.product_price }}원</p>
            </div>
          </div>
        </div>
        <!-- Navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </section>
    <div class="bar1"></div>
    <!-- swiper 2 -->
    <section>
      <div class="bar1"></div>
      <!-- 추천 문구 추가 -->
      <div class="recommendation-banner">"20대"에게 추천</div>
      <div class="container swiper-container-good">
        <div class="swiper-wrapper">
          <div 
            class="swiper-slide" 
            v-for="item in mainData.expensive" 
            :key="item.id"
            @click="goProducts(item.id)"
          >
            <img :src="item.product_image" alt="Product Image" />
            <p>{{ item.product_name }} -</p> 
            <p>{{ item.product_price }}원</p>
          </div>
        </div>
        <!-- 네비게이션 버튼 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </section>


</div>
</template>

<script>
import axios from 'axios';


export default{ 
    name:'',
    components:{},
    computed:{},
    data(){
      return{
        mainData:{
          expensive:[],
          cheap:[],
          newProduct:[],
          recommend:{},
          slides:[],
        },
        bestSeller:{
          
        },
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
      ],
        watch: {
        'mainData.expensive': {
          handler() {
            this.$nextTick(() => {
              this.initSwiper();
            });
          },
          deep: true,
        },
      },
      };
    },
    setup(){},
    created(){
      this.getmain(); // 메인 데이터 가져오기 
    },
    mounted(){
    // jQuery 기반 Swiper 초기화 제거
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    updated() {},
    unmounted(){},
    methods:{
      async getmain() {
        try {
          const response = await axios.get("http://localhost:3000/");
          this.mainData = response.data;

          // 데이터가 렌더링된 후 Swiper 초기화
          this.$nextTick(() => {
            this.initSwiper();
          });

          console.log(response);
        } catch (err) {
          console.error(err);
        }
      },
      goProducts(productId) {
        // 제품 페이지 이동 로직 (예: 라우터 사용)
        this.$router.push(`/products/${productId}`);
      },
      initSwiper() {
        new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: true,
          slidesPerView: 3, // 한 화면에 표시할 슬라이드 수
          spaceBetween: 20, // 슬라이드 간격
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },

          breakpoints: {
            1920: { slidesPerView: 3 }, // 데스크탑
            992: { slidesPerView: 3 },  // 태블릿
            320: { slidesPerView: 2 },  // 모바일
          },
        });
      new Swiper('.swiper-container-good', {
        slidesPerView: 3, // 한 화면에 표시할 슬라이드 개수
        centeredSlides: true, // 활성 슬라이드를 가운데 정렬
        loop: true, // 무한 반복 활성화
        spaceBetween: 20, // 슬라이드 간격 없음
        navigation: {
          nextEl: '.swiper-button-next', // 다음 버튼
          prevEl: '.swiper-button-prev', // 이전 버튼
        },
        on: {
          // DOM 준비 이후 업데이트
          init: function () {
            this.update(); // 강제 업데이트 호출
          },
        },
        breakpoints: {
          1920: { slidesPerView: 1 }, // 데스크탑 설정
          992: { slidesPerView: 1 },  // 태블릿 설정
          320: { slidesPerView: 1 },  // 모바일 설정
        },
      });
      new Swiper('.swiper-container-thirties', {
        slidesPerView: 2, // 한 화면에 표시할 슬라이드 개수
        loop: true, // 무한 반복
        spaceBetween: 15, // 슬라이드 간격
        slidesPerGroup: 2, // 한 번에 넘어갈 슬라이드 수
        navigation: {
          nextEl: '.swiper-button-next', // 다음 버튼
          prevEl: '.swiper-button-prev', // 이전 버튼
        },
        breakpoints: {
          1920: { slidesPerView: 2 }, // 데스크탑 설정
          992: { slidesPerView: 2 },  // 태블릿 설정
          320: { slidesPerView: 1 },  // 모바일 설정
        },
      });
    },    
    goProducts(productId) {
      // 제품 페이지 이동 로직 (예: 라우터 사용)
      this.$router.push(`/products/${productId}`);
    },
  },
}       

</script>

<style>
  .div1 {
    margin-top: 100px;
  }
  /* recommendation-banner */
  .recommendation-banner {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    width: 65%;
    margin-left: 20%;
  }
  .container {
  width: 100vw; /* 화면 너비를 100%로 */
  max-width: none; /* 최대 너비 제한 해제 */
  margin: 0; /* 여백 제거 */
  padding: 0; /* 패딩 제거 */
  }
  body, html {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden; /* 수평 스크롤 제거 */
  }


  /* body부분 - 캐러셀 */
  /* 기본 캐러셀 스타일 */
  .carousel-item img {
    width: 100%; /* 이미지를 캐러셀 아이템 너비에 맞춤 */
    height: 500px; /* 높이는 자동으로 조절 */
    object-fit: contain; /* 이미지 비율 유지하며 최대한 크게 보여줌 */
  }
  .carousel-item{
    width: 300px;
  }
  .test{
    color:black;
  }
  
  /* 기본 swiper 설정 */
  .slider {
    margin: 0 auto;
    /* max-width: 1200px; */
    position: relative;
  }

  .swiper-container {
    
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .swiper-wrapper {
    display: flex;
    transition: all 0.3s ease;
  }

  .swiper-slide {
    flex: 0 0 auto;
    text-align: center;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

    /* 비싼가격순 css */
  .slider.expensive-slider {
    margin-top: 200px;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .expensive-image {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .left-image {
    width: 100%;
    height: auto;
    border-radius: 15px;
    object-fit: cover;
  }

  .expensive-container {
    padding-left: 20px;
    margin-left: 50px;
    margin-top: 100px;
  }

  .expensive-title {
    float: left;
  }

  .expensive-title p {
    float: left;
  }

  .expensive-wrapper {
    width: 1000px;
    height: 350px;
  }

  .swiper-wrapper img {
    width: 250px;
    height: 250px;
    object-fit: contain;
    cursor: pointer;
  }

  .swiper-scrollbar {
    background: #d6d6d6;
  }

  .swiper-container-horizontal > .swiper-scrollbar {
    border-radius: 2px;
    height: 5px;
    width: 200px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .swiper-button-next.expensive-next {
    margin-top: 10px;
    margin-right: -10px;
  }
  /* swiper 2 */
  /* 슬라이드 컨테이너 */
  .swiper-container-good {
    max-width: 100%;
    height: 400px; /* 슬라이드 높이 고정 (원하는 높이로 조정 가능) */
    margin: 0 auto;
    overflow: hidden; /* 슬라이드 영역 밖의 이미지를 숨깁니다. */
    position: relative; /* 버튼 위치를 슬라이더 컨테이너 기준으로 설정 */
  }

  /* 개별 슬라이드 */
  .swiper-container-good .swiper-slide {
    width: 100%; /* 슬라이드가 컨테이너 크기에 맞게 펼쳐집니다. */
    height: 100%; /* 슬라이드 높이를 100%로 설정 */
    transition: all 0.25s ease-out;
    opacity: 1;
    display: flex;
    flex-direction: column; /* 이미지 위에 텍스트를 세로로 배치 */
    justify-content: center; /* 세로로 가운데 정렬 */
    align-items: center; /* 가로로 가운데 정렬 */
  }

  /* 이미지 */
  .swiper-container-good .swiper-slide img {
    width: 300px; /* 이미지가 슬라이드 영역을 가득 채우도록 합니다. */
    height: 300px; /* 이미지 높이를 80%로 설정하여 텍스트가 들어갈 공간을 확보 */
    object-fit: cover; /* 비율을 유지하면서 슬라이드 영역을 채우도록 설정 */
    transition: all 0.25s ease-out;
    transform: scale(0.55); /* 비활성 슬라이드는 크기를 작게 만듭니다. */
    transform-origin: center; /* 이미지 크기 변형을 중앙을 기준으로 합니다. */
  }

  /* 활성화된 슬라이드 (가운데 이미지) */
  .swiper-container-good .swiper-slide-active img {
    transform: scale(1.0); /* 활성화된 이미지의 크기를 원래대로 설정 */
    width: 300px; /* 이미지가 슬라이드 영역을 가득 채우도록 합니다. */
    height: 300px; /* 이미지 높이를 80%로 설정하여 텍스트가 들어갈 공간을 확보 */
  }

  /* 슬라이드 내 텍스트 */
  .swiper-container-good .swiper-slide p {
    margin: 5px 0; /* 텍스트 간 간격 */
    color: black; /* 텍스트 색상 */
    font-size: 16px; /* 텍스트 크기 조정 */
    text-align: center; /* 텍스트를 가운데 정렬 */
    padding: 5px; /* 텍스트 주변 여백 */
  }

  /* 네비게이션 버튼 위치 조정 */
  .swiper-button-prev, .swiper-button-next {
    top: 50%;
    transform: translateY(-50%); /* 버튼을 수직 중앙에 배치 */
    z-index: 10; /* 버튼이 다른 콘텐츠 위에 있도록 설정 */
  }
  /* p태그  */
  .expensive-container {
    padding-left: 20px;
    margin-left: 50px;
    margin-top: 100px;
  }

  .s-title {
    float: left;
  }

  
  /* swiper 3 */
  .swiper-container-thirties {
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }

  .swiper-wrapper {
    display: flex;
    justify-content: flex-start; /* 슬라이드를 왼쪽으로 정렬 */
    gap: 10px; /* 슬라이드 간의 간격 조정 */
  }

  .swiper-container-thirties .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center; /* 이미지와 텍스트를 수직, 수평 중앙 정렬 */
    height: 250px; /* 슬라이드 높이를 일정하게 설정 */
    transition: all 0.25s ease-out;
    opacity: 1;
    box-sizing: border-box;
    padding: 0 20px; /* 슬라이드 안의 내용에 좌우 여백을 추가 */
    width: auto;
  }

  /* 이미지 크기 고정 */
  .swiper-container-thirties .swiper-slide img {
    width: 150px; /* 이미지의 고정 크기 */
    height: 150px; /* 이미지의 고정 크기 */
    object-fit: contain; /* 비율 유지하면서 영역을 꽉 채우기 */
    transition: all 0.25s ease-out;
  }

  /* 텍스트 크기 줄이기 */
  .swiper-container-thirties .swiper-slide .text-container {
    margin-left: 20px; /* 이미지와 텍스트 사이에 여백 */
    display: flex;
    flex-direction: column; /* 텍스트와 가격을 세로로 나열 */
    justify-content: center; /* 텍스트와 가격을 수직으로 가운데 정렬 */
    align-items: flex-start; /* 왼쪽 정렬 */
  }

  /* 텍스트 스타일 */
  .swiper-container-thirties .swiper-slide p {
    margin: 5px 0; /* 텍스트 간 간격 */
    color: black; /* 텍스트 색상 */
    font-size: 12px; /* 텍스트 크기 조정 (이미지 크기에는 영향 주지 않음) */
    text-align: left; /* 텍스트 왼쪽 정렬 */
    padding: 0; /* 불필요한 여백 제거 */
  }
  .swiper1-title { 
    top: 50%;
  }
  .swiper1-title h2 {
    margin: 0;
    font-size: 24px; /* 타이틀 크기 */
  }

  .swiper1-title p {
    margin-top: 10px;
    font-size: 16px; /* 부제목 크기 */
  }
  .bar1{
    margin:200px;
  }
</style>