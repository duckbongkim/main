<template>
  <div class="div1">
    <div>
      <input v-model="searchQuery" placeholder="검색어를 입력하세요" @keyup.enter="searchProducts" />
      <button @click="searchProducts">검색</button>
    </div>
    <h1>상품 목록</h1>
    <div v-if="filteredProducts && filteredProducts.length">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card" @click="goProducts(product.id)" >
        <img :src="product.product_image" :alt="product.name" />
        <div class="product-details">
          <div class="tags">
            <p v-if="product.isTagged" class="recommended-badge">👍추천상품</p>
            <p v-if="product.isTagged" class="popular-badge">🔥인기상품</p>
          </div>
          <h2 class="product-title">{{ product.product_name }}</h2>
          <p class="product-price">{{ product.product_price }} 원</p>
        <!-- 호버시 장바구니 찜 하기 버튼 추가 1월 12일 동진-->
         <div class="product-actions">
          <button @click.stop="addWish(product)">
            <i class="fas fa-heart"></i> 
          </button>
          <button @click.stop="addCarts(product)">
            <i class="fas fa-shopping-cart"></i> 
          </button>
        </div>
        
        </div>
      </div>
    </div>


    <div v-if="noResultsMessage" class="no-results">
      {{ noResultsMessage }}
    </div>

    <!-- 페이지네이션 -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="currentPage--">이전</a>
        </li>
        <li class="page-item" v-for="page in displayedPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="currentPage++">다음</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['drink_type'],
  data() {
    return {
      products: [],             // 전체 상품 목록
      filteredProducts: [],     // 필터된 상품 목록
      searchQuery: '',          // 검색어
      currentPage: 1,           // 현재 페이지
      itemsPerPage: 15,         // 한 페이지에 보여줄 상품 수
      noResultsMessage: '',     // 검색 결과가 없을 때 메시지
    };
  },
<<<<<<< HEAD
  created(){
this.fetchProductsByType(this.drink_type);
  },
  mounted() {
      
  },
=======
>>>>>>> 9d5a3790eacfc60886d7ec3cf8dab8e9c08e9604
  watch: {
    '$route.query.search'(newSearch) {
      if (newSearch) {
        this.searchQuery = newSearch;
        this.filterProductsBySearch();
      } else {
        this.searchQuery = '';
        this.fetchProductsByType(this.drink_type);
      }
    },
    drink_type(newDrinkType) {
      this.fetchProductsByType(newDrinkType);  // drink_type이 변경되면 다시 필터링
    },
  },
  computed: {
    // 현재 페이지에 맞게 상품 목록을 잘라서 보여줌
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    displayedPages() {
      const pages = [];
      let start, end;

      if (this.totalPages <= 3) {
        start = 1;
        end = this.totalPages;
      } else {
        if (this.currentPage === 1) {
          start = 1;
          end = 3;
        } else if (this.currentPage === this.totalPages) {
          start = this.totalPages - 2;
          end = this.totalPages;
        } else {
          start = this.currentPage - 1;
          end = this.currentPage + 1;
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  mounted() {
    this.fetchProductsByType(this.drink_type);  // 초기 로드 시 drink_type에 맞는 상품들만 불러오기
  },
  methods: {
    // drink_type에 맞는 상품 목록을 불러오는 메서드
    async fetchProductsByType(drinkType) {
      try {
        const response = await axios.get(`http://localhost:3000/liqueur/liqueur/${drinkType}`);
        this.products = response.data;
        this.filteredProducts = this.products;  // 초기에는 모든 상품을 표시
        this.searchProducts();  // 검색어가 있다면 필터링
      } catch (error) {
        console.error('상품을 불러오는 데 실패했습니다.', error);
      }
    },
    
    // 검색 기능
    searchProducts() {
      if (this.searchQuery.trim() === '') {
        this.filteredProducts = this.products;  // 검색어가 없으면 모든 상품을 표시
        this.noResultsMessage = '';  // 메시지 초기화
      } else {
        this.filterProductsBySearch();
      }
    },

    // 검색어로 상품 필터링
    filterProductsBySearch() {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.product_name.toLowerCase().includes(query) ||
        product.product_description.toLowerCase().includes(query) ||
        product.drink_type.toLowerCase().includes(query)
      );
      if (this.filteredProducts.length === 0) {
        this.noResultsMessage = '검색 내용이 없습니다.';
      } else {
        this.noResultsMessage = '';
      }
    },

    // 상품 상세 페이지로 이동
    goProducts(productId) {
      this.$router.push(`/products/${productId}`);
    }
  },
};
</script>


<style scoped>
/* 스타일링을 필요에 맞게 수정해주세요 */
.div1{
  margin-top:100px
}
.product-card {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  cursor: pointer;
}

.product-card img {
  width: 100%;
  height: auto;
}

.product-details {
  padding: 10px;
}

.product-title {
  font-size: 1.2em;
  font-weight: bold;
}

.product-price {
  color: #888;
}

.tags p {
  display: inline-block;
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 3px;
}

.recommended-badge {
  background-color: #ffeb3b;
}

.popular-badge {
  background-color: #ff5722;
}

.no-results {
  text-align: center;
  color: #888;
}

.pagination {
  margin-top: 20px;
}

.page-item .page-link {
  cursor: pointer;
}
</style>

<style scoped>
.buy-button {
  /* display: block; */
  margin-bottom: 10px; /* 구매 버튼 아래 여백 */
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  align-items: center; /* 중앙 정렬 */
}
.container {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 왼쪽 정렬 */
  gap: 50px; /* 아이템 간의 간격 */
}

.product-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 250px;
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;
  transition: transform 0.3s;
}
.product-card:hover {
  transform: scale(1.05);
}
.product-card img {
  max-width: 100%;
  height: 200px;
}
.product-details {
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  padding: 15px;
}
.product-title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}
.product-price {
  font-size: 16px;
  color: #e63946;
}
.buy-button {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.buy-button:hover {
  background-color: #0056b3;
}

/* 배지들을 세로가 아닌 가로로 나란히 배치 */
.tags {
  display: flex;
  justify-content: center; /* 배지들 가로로 중앙 정렬 */
  margin-top: 10px; /* 배지와 버튼 간의 여백 */
}

.recommended-badge, .popular-badge {
  font-size: 14px; /* 배지 크기 */
  margin-right: 3px; /* 배지 간의 간격을 설정 */
}

/* 인기상품 배지 색상 */
.popular-badge {
  color: red;
  display: inline-block;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
}
/* 추천상품 배지 색상 */
.recommended-badge {
  display: inline-block;
  /* background-color: #ffcc00; */
  color: blue;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
}

/* 마지막 배지는 오른쪽 여백 없애기 */
.popular-badge:last-child {
  margin-right: 0;
}
</style>