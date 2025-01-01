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

    <!-- 싼 가격대 추천 -->
    <!-- <div class="promotion">

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
    </div> -->
    <div class="promotion">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- v-for로 동적으로 슬라이드 생성 -->
          <div class="swiper-slide" v-for="(item, index) in main" :key="index">
            <img :src="item.imgSrc" :alt="item.altText" />
            <a href="javascript:void(0)" class="btn">{{ mainData }}</a>
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

    <section>
      <h2>가격순</h2>
      <ul>
        <li v-for="item in mainData.expensive" :key="item.id" @click="goDetail(item.id)">
          <strong>{{ item.product_name }}</strong> - {{ item.product_price }}원
          <p>{{ item.product_description }}</p>
          <img :src="item.product_image" alt="Product Image" />
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
          mainData:{expensive:[]},
          bestSeller:{
            
          },


        };
    },
    setup(){},
    created(){},
    mounted(){
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
    // axios
    //   .get("http://localhost:3000/") 
    //   .then((response) => {
    //     console.log(response)
    //     this.items = response.data; // 응답 데이터를 items 저장
    //   })
    //   .catch((error) => {
    //     console.error("데이터를 불러오는 중 오류 발생:", error);
    //   });
    unmounted(){},
    methods:{
      async getmain(){
        try{
          const response = await axios.get("http://localhost:3000/") 
          this.mainData = response.data     
        }catch(err){
          console.error(err)
        }
      },

      goDetail(product_id){ // 1월1일(동진) 상품 클릭시 해당 상품의 아이디를 가지고 이동되는 메소드
        this.$router.push(`/products/${product_id}`)
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
  .promotion {
    width: auto;
    height: 693px;
    background-color: #f6f5ef;
    position: relative;
    overflow: hidden;
    transition: height .4s;
  }
  .promotion.hide {
    height: 0;
  }

  .promotion .swiper-container {
    /* 819px 슬라이드 3개와 그 사이 여백 10px씩 = 2477px */
    width: calc(819px * 3 + 20px);
    height: 553px;
    position: absolute;
    top: 40px;
    left: 50%;
    margin-left: calc((819px * 3 + 20px) / -2);
  }
  .promotion .swiper-slide {
    position: relative;
    opacity: .5;
    transition: opacity 1s;
  }
  .promotion .swiper-slide-active {
    opacity: 1;
  }

  
  .promotion .swiper-slide .btn {
    width: 130px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .promotion .swiper-pagination {
    bottom: 40px;
    left: 0;
    right: 0;
    z-index: 0;
  }
  .promotion .swiper-pagination .swiper-pagination-bullet {
    background-color: black;
  
    width: 13px;
    height: 12px;
    margin-right: 6px;
    outline: none;
  }
  .promotion .swiper-pagination .swiper-pagination-bullet:last-child {
    margin-right: 0;
  }
  
  .promotion .swiper-prev,
  .promotion .swiper-next {
    width: 42px;
    height: 42px;
    outline: none;
    border: 2px solid #333;
    border-radius: 50%;
    position: absolute;
    /* Swiper Container 높이의 절반만큼 끌어올림 /
    /* 버튼 높이의 절반만큼 추가로 끌어올림 */
    top: 300px;
    z-index: 1;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .4s;
  }
  .promotion .swiper-prev {
    left: 50%;
    margin-left: -480px;
  }
  .promotion .swiper-next {
    right: 50%;
    margin-right: -480px;
  }
  .promotion .swiper-prev:hover,
  .promotion .swiper-next:hover {
    background-color: #333;
    color: #fff;
  }
  .swiper-button {
    position: relative;
  }
  .arrow_back{
    position: absolute;
    left: 25%;
    right: 0;
  }
  .arrow_forward{
    position: absolute;
    right: 15%;
  }

</style>