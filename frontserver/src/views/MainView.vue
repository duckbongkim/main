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
            <img src="img\배너2.jpg" class="d-block w-100" alt="01">
        </div>
        <div class="carousel-item test">
          <img src="img\배너3.jpg" class="d-block w-100" alt="02">
        </div>
        <div class="carousel-item test">
          <img src="img\배너4.jpg" class="d-block w-100" alt="03">
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
          <img src="img\부모님.png" class="left-image" alt="04" />
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

  <!--swiper 3-->
    <section>
        <div class="bar1"></div>
        <div class="recommendation-banner">"30대"에게 추천</div>
        <div class="container swiper-container-thirties">
          <div class="swiper-wrapper">
            <div 
              class="swiper-slide" 
              v-for="item in mainData.expensive" 
              :key="item.id"
              @click="goProducts(item.id)"
            >
              <img :src="item.product_image" alt="Product Image" />
              <strong>{{ item.product_name }} -</strong> <strong>{{ item.product_price }}원</strong>
            </div>
          </div>
          <!-- Navigation buttons -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
    </section>

 

    <!--swiper 20대 추천-->
    <section class="bar1">
        <div class="container swiper-container-good">
          <div class="swiper-wrapper bar1-wrapper">
            
            <div class="swiper-slide bar1-slide" v-for="item in mainData.expensive" :key="item.id" @click="goProducts(item.id)">
              
              <div class="product-content">
                <div class="product-img">
                  <img :src="item.product_image" alt="Product Image" />
                </div>
                <div class="product-text">
                  <p>{{ item.product_name }}</p> 
                  <p>{{ item.product_price }}원</p>
                </div>
              </div>
            
            </div>

          </div>
          <!-- Navigation buttons -->
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

<style scoped>



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



.swiper-container-good {
  max-width: 960px;
  margin: 0 auto;
  /* overflow: hidden; */
  position: relative;
}

.swiper-container-good .swiper-slide {
  width: auto;
  transition: all 0.25s ease-out;
  opacity: 1;
}

.swiper-container-good .swiper-slide img {
  width: 300px;
  height: 300px;
  object-fit: contain;
  max-width: 100%;
  transition: all 0.25s ease-out;
  transform: scale(0.55);
  transform-origin: center;
}

.swiper-container-good .swiper-slide-active img {
  transform: scale(1.0);
} 

 .swiper-container-thirties {
  max-width: 960px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.swiper-container-thirties .swiper-slide {
  width: auto;
  transition: all 0.25s ease-out;
  opacity: 1;
}

.swiper-container-thirties .swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 100%;
  transition: all 0.25s ease-out;
  transform: scale(0.55);
  transform-origin: center;
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


/* 20대 추천 swiper */
.bar1 {
  width: 100%;
  margin-top: 100px;
}

.bar1-slide{
  width: 400px;
}

.product-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
}

.product-content .product-img {
 

}
.product-text {
 
}



/* swiper-container-good */
.swiper-container-good .swiper-wrapper img {
  width: 300px;
  height: 300px;
  object-fit: contain;
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


</style>