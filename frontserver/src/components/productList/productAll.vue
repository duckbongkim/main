<template>
  <div>
    <!-- 상품 목록 -->
    <div class="container">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card" @click="goProducts(product.id)">
        <img :src="product.product_image" :alt="product.product_name" />
        <div class="product-details">
          <div class="tags">
            <p v-if="product.isTagged" class="recommended-badge">👍 추천상품</p>
            <p v-if="product.isTagged" class="popular-badge">🔥 인기상품</p>
          </div>
          <h2 class="product-title">{{ product.product_name }}</h2>
          <p class="product-price">{{ product.product_price }}</p>
        </div>
      </div>
    </div>

    <div>
      <input v-model="searchQuery" placeholder="검색어를 입력하세요" @keyup.enter="searchProducts" />
      <button @click="searchProducts">검색</button>
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
  data() {
    return {
      products: [],           // 전체 상품 목록
      filteredProducts: [],   // 필터된 상품 목록
      searchQuery: '',        // 검색어
      currentPage: 1,         // 현재 페이지
      itemsPerPage: 15,       // 한 페이지에 보여줄 상품 수
      noResultsMessage: '',   // 검색 결과가 없을 때 메시지
    };
  },
  computed: {
    // 현재 페이지에 맞게 상품 목록을 잘라서 보여줌
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    // 전체 페이지 수 계산
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    // 페이지네이션 버튼에 표시할 페이지 번호
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
  created() {
    this.fetchProducts();  // 컴포넌트 생성 시 상품 데이터를 가져옵니다.
  },
  methods: {
    // 상품 목록 조회
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/liqueur/liqueur'); // 상품 데이터 가져오기
        this.products = response.data;
        this.filteredProducts = this.products;  // 모든 상품을 필터링된 목록에 설정
      } catch (error) {
        console.error(error);
      }
    },

    // 검색 기능
    searchProducts() {
      if (this.searchQuery.trim() === '') {
        // 검색어가 없으면 전체 상품 목록을 표시
        this.filteredProducts = this.products;  
        this.noResultsMessage = '';  // 메시지 초기화
        this.currentPage = 1;  // 첫 페이지로 리셋
      } else {
        // 검색어가 있을 경우 필터링
        this.filteredProducts = this.products.filter(product =>
          product.product_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.product_description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.drink_type.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        // 검색 결과 메시지 처리
        if (this.filteredProducts.length === 0) {
          this.noResultsMessage = '검색 내용이 없습니다.';  
        } else {
          this.noResultsMessage = '';  
        }
        this.currentPage = 1;  // 검색 후 첫 페이지로 이동
      }
    },

    // 상품 상세 페이지로 이동
    goProducts(productId) {
      this.$router.push(`/products/${productId}`);
    }
  }
};
</script>

<style scoped>
/* 스타일링을 필요에 맞게 수정해주세요 */
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