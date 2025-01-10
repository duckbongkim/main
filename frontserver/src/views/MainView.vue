<template>
<div>
    <!-- 광고형 슬라이드 -->
    <div id="carouselExampleIndicators" class="carousel slide centered-carousel" data-bs-ride="carousel" data-bs-theme="dark">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active test">
            <img src="img\곰표.jpg" class="d-block w-100" alt="01">
        </div>
        <div class="carousel-item test">
          <img src="img\청하.jpg" class="d-block w-100" alt="02">
        </div>
        <div class="carousel-item test">
          <img src="img\하이볼.jpg" class="d-block w-100" alt="03">
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
   
    <v-carousel v-if="mainData.expensive.length > 0" height="400" show-arrows="hover" cycle hide-delimiter-background>
      <!-- 캐러셀 코드 -->
      <v-carousel-item
        v-for="item in mainData.expensive"
        :key="item.id"
        @click="goProducts(item.id)"
      >
        <v-sheet color="white lighten-2" height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-center">
              <img :src="item.product_image" alt="Product Image" style="max-height: 200px; object-fit: contain;" />
              <p class="text-h6">{{ item.product_description }}</p>
              <strong class="text-h5">{{ item.product_name }}</strong>
              <div class="text-h6 mt-2">{{ item.product_price }}원</div>
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <!-- swiper -->
    <section> 
      <div class="bar1"></div>
      <div class="slider">
        <!-- 추천 배너 텍스트 추가 -->
        <div class="recommendation-banner">높은 가격대 추천</div>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div 
              class="swiper-slide" 
              v-for="item in mainData.expensive" 
              :key="item.id"
              @click="goProducts(item.id)"
            >
              <img :src="item.product_image" alt="Product Image" />
              <p>{{ item.product_description }}</p>
              <strong>{{ item.product_name }} -</strong> <strong>{{ item.product_price }}원</strong>
            </div>
          </div>
          <!-- Navigation buttons -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <!-- Scrollbar -->
          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    </section>

    <!--test-->
    <section>
        <div class="bar1"></div>
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
              <p>{{ item.product_description }}</p>
              <strong>{{ item.product_name }} -</strong> <strong>{{ item.product_price }}원</strong>
            </div>
          </div>
          <!-- Navigation buttons -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
    </section>


    <section>
      <h2>비싼 가격순</h2>
      <ul class="product-list">
        <li v-for="item in mainData.expensive" :key="item.id" @click="goProducts(item.id)">
          <img :src="item.product_image" alt="Product Image" />
          <p>{{ item.product_description }}</p>
          <strong>{{ item.product_name }} -</strong> <strong> {{ item.product_price }}원</strong>
        </li>
      </ul>
    </section>

    <section>
      <h2>싼 가격순</h2> <!-- 1월1일 동진 데이터 바인딩을 위해 작성-->
      <ul class="product-list">
        <li v-for="item in mainData.cheap" :key="item.id" @click="goProducts(item.id)">
          <img :src="item.product_image" alt="Product Image" />
          <p>{{ item.product_description }}</p>
          <strong>{{ item.product_name }} -</strong> <strong> {{ item.product_price }}원</strong>
        </li>
      </ul>
    </section>

    <section>
      <h2>20대 추천</h2> <!-- 1월1일 동진 데이터 바인딩을 위해 작성-->
      <ul class="product-list">
        <li v-for="item in mainData.recommend['20대 베스트']" :key="item.id" @click="goProducts(item.id)">
          <img :src="item.product_image" alt="Product Image" />
          <p>{{ item.product_description }}</p>
          <strong>{{ item.product_name }} -</strong> <strong> {{ item.product_price }}원</strong>
        </li>
      </ul>
    </section>

    <section>
      <h2>30대 추천</h2> <!-- 이건 어떻게 받아와야 하지? -->
      <ul class="product-list">
        <li v-for="item in mainData.recommend['30대 베스트']" :key="item.id" @click="goProducts(item.id)">
          <img :src="item.product_image" alt="Product Image" />
          <p>{{ item.product_description }}</p>
          <strong>{{ item.product_name }} -</strong> <strong> {{ item.product_price }}원</strong>
        </li>
      </ul>
    </section>

    <section>
      <h2>신상품</h2> <!-- 1월1일 동진 데이터 바인딩을 위해 작성-->
      <ul class="product-list">
        <li v-for="item in mainData.newProduct" :key="item.id" @click="goProducts(item.id)">
          <img :src="item.product_image" alt="Product Image" />
          <p>{{ item.product_description }}</p>
          <strong>{{ item.product_name }} -</strong> <strong> {{ item.product_price }}원</strong>
        </li>
      </ul>
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
        breakpoints: {
          1920: { slidesPerView: 3 }, // 데스크탑 설정
          992: { slidesPerView: 3 },  // 태블릿 설정
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
  /* swiper 3개씩 넘겨지는*/
  .slider {
    margin: 0 auto;
    max-width: 1200px;
    position: relative;
  }

  .swiper-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  .swiper-section {
    flex: 0 0 70%;  /* swiper 슬라이더는 전체의 70% 차지 */
    padding-right: 20px;  /* 이미지와 간격을 주기 위해 */
  }

  .image-container {
    flex: 0 0 28%;  /* 이미지 컨테이너는 30% 차지 */
    text-align: center;
  }

  .recommendation-banner {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .swiper-container {
    padding-bottom: 20px;
  }
  .swiper-wrapper img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  .swiper-slide img {
    width: auto;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
  .bar1{
    margin:150px;
  }
    /* 추천 배너 스타일 */
  .recommendation-banner {
    font-size: 36px; /* 글씨 크기 */
    font-weight: bold; /* 굵은 글씨 */
    text-align: center; /* 가운데 정렬 */
    margin-bottom: 20px; /* 슬라이더와 배너 사이의 간격 */
    color: #333; /* 글씨 색상 */
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10; /* 다른 요소들 위에 배치 */
  }
  #carouselExampleIndicators {
    width: 100%; /* 캐러셀 컨테이너 너비를 100%로 설정 */
    margin: 0; /* 양옆 여백 제거 */
    padding: 0; /* 양옆 패딩 제거 */
  }
  /* swiper 2 */  
  .swiper-container-good {
    max-width: 960px;
    margin: 0 auto;
    overflow: hidden; /* 슬라이더 영역 밖의 이미지 숨기기 */
    position: relative; /* 버튼 위치를 컨테이너 기준으로 설정하기 위함 */    
  }

  .swiper-container-good .swiper-slide {
    width: auto; /* 슬라이드 개수를 Swiper 옵션에서 제어 */
    transition: all 0.25s ease-out;
    opacity: 1;
  }

  .swiper-container-good .swiper-slide img {
    width: 100%; /* 슬라이드 영역에 맞춰 이미지 크기 조정 */
    height: 100%; /* 이미지 높이를 일정하게 설정 */
    object-fit: contain; /* 이미지 비율 유지하면서 슬라이드 영역에 맞게 채움 */
    max-width: 100%;
    transition: all 0.25s ease-out;
    transform: scale(0.55);
    transform-origin: center;
  }

  .swiper-container-good .swiper-slide-active img {
    transform: scale(1.0);
  }
</style>