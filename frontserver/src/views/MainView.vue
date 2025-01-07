<template>
<div>
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

    <!--추천 판매량-->
    <div class="promotion">

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="2021 뉴이어, 스타벅스와 함께 즐겁고 활기차게 시작하세요!" />
            <p>곰표 쉽지않네.</p>
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="기간 내 스타벅스 카드 e-Gift를 3만원 이상 선물 시, 아메리카노 e-쿠폰을 드립니다." />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="뉴이어 푸드와 제조 음료를 세트로 구매 시, 뉴이어 음료 BOGO(1+1) 쿠폰을 드립니다." />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="신년 MD 상품 포함 3만원 이상 구매 고객께 아메리카노(톨사이즈) 쿠폰을 드립니다." />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="2017 DIGITAL LUCKY DRAW 100% 당첨의 행운을 드립니다!" />
            <a href="javascript:void(0)" class="btn btn-primary">자세히 보기</a>
          </div>
        </div>
      </div>

      <div class="swiper-pagination"></div>

      <div class="swiper-prev swiper-button">
        <span class="material-icons arrow_back">arrow_back_ios</span>
      </div>
      <div class="swiper-next swiper-button">
        <span class="material-icons arrow_forward">arrow_forward_ios</span>
      </div>
    </div>

    <!--신상품 판매량-->
    <div class="promotion">

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
            <img src="img\곰표.jpg" alt="2021 뉴이어, 스타벅스와 함께 즐겁고 활기차게 시작하세요!" />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="기간 내 스타벅스 카드 e-Gift를 3만원 이상 선물 시, 아메리카노 e-쿠폰을 드립니다." />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="뉴이어 푸드와 제조 음료를 세트로 구매 시, 뉴이어 음료 BOGO(1+1) 쿠폰을 드립니다." />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="신년 MD 상품 포함 3만원 이상 구매 고객께 아메리카노(톨사이즈) 쿠폰을 드립니다." />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="2017 DIGITAL LUCKY DRAW 100% 당첨의 행운을 드립니다!" />
            <a href="javascript:void(0)" class="btn btn-primary">자세히 보기</a>
          </div>
        </div>
      </div>

      <div class="swiper-pagination"></div>

      <div class="swiper-prev swiper-button">
        <span class="material-icons arrow_back">arrow_back_ios</span>
      </div>
      <div class="swiper-next swiper-button">
        <span class="material-icons arrow_forward">arrow_forward_ios</span>
      </div>
    </div>

    <!-- 비싼 가격대 추천 -->
    <div class="promotion">

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="2021 뉴이어, 스타벅스와 함께 즐겁고 활기차게 시작하세요!" />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="기간 내 스타벅스 카드 e-Gift를 3만원 이상 선물 시, 아메리카노 e-쿠폰을 드립니다." />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="뉴이어 푸드와 제조 음료를 세트로 구매 시, 뉴이어 음료 BOGO(1+1) 쿠폰을 드립니다." />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="신년 MD 상품 포함 3만원 이상 구매 고객께 아메리카노(톨사이즈) 쿠폰을 드립니다." />
            <a href="javascript:void(0)" class="btn">자세히 보기</a>
          </div>
          <div class="swiper-slide">
            <img src="img\곰표.jpg" alt="2017 DIGITAL LUCKY DRAW 100% 당첨의 행운을 드립니다!" />
            <a href="javascript:void(0)" class="btn btn-primary">자세히 보기</a>
          </div>
        </div>
      </div>

      <div class="swiper-pagination"></div>
        <div class="swiper-prev swiper-button">
          <span class="material-icons arrow_back">arrow_back_ios</span>
        </div>
        <div class="swiper-next swiper-button">
          <span class="material-icons arrow_forward">arrow_forward_ios</span>
      </div>
    </div>
   
    <!-- 비싼 가격대 추천 -->
    <div class="promotion">
        <div class="swiper-container" ref="swiperContainer">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in mainData.expensive" :key="item.id" @click="goProducts(item.id)">
              <img :src="item.product_image" alt="Product Image" />
              <p>{{ item.product_description }}</p>
              <strong>{{ item.product_name }} -</strong> <strong> {{ item.product_price }}원</strong>
            </div>
          </div>
        </div>

        <!-- 이전 버튼 -->
        <div class="swiper-prev swiper-button">
          <span class="material-icons arrow_back">arrow_back_ios</span>
        </div>

        <!-- 다음 버튼 -->
        <div class="swiper-next swiper-button">
          <span class="material-icons arrow_forward">arrow_forward_ios</span>
        </div>
      </div>

        
        </div>






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
import Swiper from 'swiper'; // Swiper import (Vue에서는 컴포넌트로 불러와야 함)
import 'swiper/swiper-bundle.css';


export default{ 
    name:'',
    components:{},
    computed:{},
    data(){
        return{
          swiperInstance: null,
          mainData:{
            expensive:[],
            cheap:[],
            newProduct:[],
            recommend:{},
          },
          bestSeller:{
            
          },
        };
    },
    setup(){},
    created(){},
    mounted(){
      // swiper 설정
      this.initializeSwiper();
      window.addEventListener('resize', () => {
        if (this.swiperInstance) {
          this.swiperInstance.update();
        }
      });      
      this.getmain();

      new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    
  },
    updated() {
      if (this.swiperInstance) {
        this.swiperInstance.update();
      }
    },
    unmounted(){},
    methods:{
      async getmain(){
        try{
          const response = await axios.get("http://localhost:3000/") 
          this.mainData = response.data
          console.log(response)
        }catch(err){
          console.error(err)
        }
      },
      goProducts(product_id){ // 1월1일(동진) 상품 클릭시 해당 상품의 아이디를 가지고 이동되는 메소드
        this.$router.push(`/products/${product_id}`)
    },
      initializeSwiper() {
        
      this.swiperInstance = new Swiper(this.$refs.swiperContainer, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true, //// 루프 모드 (선택 사항) 2025-01-07
          navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
          init: () => {
            console.log('Swiper initialized');
          },
          slideChange: () => {
            console.log('Slide changed');
          }
        }
      });
    },
  }
}
</script>

<style>
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


  /* 추천 기능*/
  /*PROMOTION*/
  /* 기본 스타일 */
  .promotion {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f6f5ef;
    height: 693px;
    overflow: hidden;
    transition: height .4s;
  }

  .promotion.hide {
    height: 0;
  }

  .swiper-container {
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 40px;
    left: 50%;
    margin-left: -50%; /* Swiper를 가운데 정렬 */
    height: 553px;
    display: flex;
    transition: transform 0.5s ease;
  }

  .swiper-wrapper {
    display: flex;
  }

  /* 상품 슬라이드 내부 */
  .swiper-slide {
    flex: 0 0 100%;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
    position: relative;  /* 위치를 설정할 수 있도록 추가 */
  }

  /* 이미지 스타일 */
  .swiper-slide img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  /* '자세히 보기' 버튼 스타일 */
  .swiper-slide .btn {
    width: 130px;
    margin: 10px auto 0;  /* 위쪽 마진을 줘서 이미지 아래에 위치하도록 함 */
    position: relative;  /* 버튼의 위치를 상대적으로 설정 */
    display: block; /* 버튼을 블록 요소로 설정하여 가운데 정렬 */
  }

  .swiper-pagination {
    text-align: center;
    margin-top: 10px;
    z-index: 0;
  }

  .swiper-pagination .swiper-pagination-bullet {
    background-color: black;
    width: 13px;
    height: 12px;
    margin-right: 6px;
    outline: none;
  }

  .swiper-pagination .swiper-pagination-bullet:last-child {
    margin-right: 0;
  }

  /* 이전/다음 버튼 */
  .swiper-prev, .swiper-next {
    width: 42px;
    height: 42px;
    border: 2px solid #333;
    border-radius: 50%;
    position: absolute;
    top: 300px;
    z-index: 1;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .4s;
  }

  .swiper-prev {
    left: 50%;
    margin-left: -480px;
  }

  .swiper-next {
    right: 50%;
    margin-right: -480px;
  }

  .swiper-prev:hover,
  .swiper-next:hover {
    background-color: #333;
    color: #fff;
  }

  /* 아이콘 조정 */
  .material-icons {
    font-size: 24px;
    color: #333;
  }

  .material-icons:hover {
    color: #000;
  }

  /* 상품 목록 */
  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px;
  }

  .product-list li {
    list-style: none;
    cursor: pointer;
  }
</style>