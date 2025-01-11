<template>
  <div class="div1">

    <!-- <div>
      <input v-model="searchQuery"  type="text"  placeholder="검색어를 입력하세요"  @keyup.enter="searchProducts" />
      <button @click="searchProducts">검색</button>
    </div>
    
    <h1>상품 목록</h1>
    <div v-for="product in fetchProducts" :key="product.id" class="product-card">
      <router-link :to="'/products/' + product.id">
        <h3>{{ product.product_name }}</h3>
        <p>{{ product.product_description }}</p>
        <p>{{ product.drink_type }}</p>
        <p>{{ product.product_price }} 원</p>
      </router-link>
        
    </div>
    <div v-if="noResultsMessage" class="no-results">
      {{ noResultsMessage }}
    </div> -->

    <div class="container">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card" @click="goProducts(product.id)" >
        <img :src="product.product_image" :alt="product.name" />
        <div class="product-details">
          <div class="tags">
            <p v-if="product.isTagged" class="recommended-badge">👍추천상품</p>
            <p v-if="product.isTagged" class="popular-badge">🔥인기상품</p>
          </div>
          <h2 class="product-title">{{ product.product_name }}</h2>
          <p class="product-price">{{ product.product_price }} 원</p>
          
        </div>
      </div>
    </div>

    <div>
      <input v-model="searchQuery"  type="text"  placeholder="검색어를 입력하세요"  @keyup.enter="searchProducts" />
      <button @click="searchProducts">검색</button>
    </div>

     <div v-if="noResultsMessage" class="no-results">
      {{ noResultsMessage }}
    </div>

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
   computed:{
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.products.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.products.length / this.itemsPerPage);//math.ceil은 소수점 이하를 올림하는 함수
        },
        displayedPages() {
            const pages = [];
            let start, end;
            
            if (this.totalPages <= 3) {
                // 전체 페이지가 3개 이하인 경우
                start = 1;
                end = this.totalPages;
            } else {
                // 전체 페이지가 3개 ��과인 경우
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
    data() {
    return {
      products: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 20,
      filteredProducts: [],
      noResultsMessage: '',
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    getRandomIndexes(arrayLength, count) {
      const indexes = [];
      while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * arrayLength);
        if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex);
        }
      }
      return indexes;
    },

    // 상품 목록 조회
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/liqueur');
        this.products = response.data;

        const randomIndexes = this.getRandomIndexes(this.products.length, 6);
        this.products = this.products.map((product, index) => ({
          ...product,
          isTagged: randomIndexes.includes(index),
        }));

        this.filteredProducts = this.products;  // 처음엔 모든 상품을 표시
      } catch (error) {
        console.error(error);
      }
    },
    // 상품 검색
    searchProducts() {
      if (this.searchQuery.trim() === '') {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(product =>
          product.product_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.product_description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.drink_type.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        if (this.filteredProducts.length === 0) {
          this.noResultsMessage = '검색 내용이 없습니다.';
          this.noResultsMessage = '';
        }
      }
      this.searchQuery = '';
    },

    goProducts(productId) {
        // 제품 페이지 이동 로직 (예: 라우터 사용)
        this.$router.push(`/products/${productId}`);
      },

  },
};
</script>

<style scoped>
.div1 {
  margin-top: 100px;
}

.buy-button {
  /* display: block; */
  margin-bottom: 10px; /* 구매 버튼 아래 여백 */
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  align-items: center; /* 중앙 정렬 */
}
.container {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* 반응형으로 카드 배치 */
  gap: 20px; /* 카드 간의 간격 */
}

.product-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: space-between; /* 공간을 균등 분배 */
  height: 100%; /* 카드 높이를 반응형으로 조정 */
}

.product-card:hover {
  transform: scale(1.05);
}

.product-card img {
  width: 100%; /* 이미지가 카드의 폭을 채우도록 설정 */
  height: auto; /* 이미지 비율 유지 */
  aspect-ratio: 4 / 3; /* 고정된 비율로 카드 크기 조정 */
  object-fit: contain; /* 이미지 비율을 유지하며 카드 내부에 맞춤 */
}

.product-details {
  padding: 15px;
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  justify-content: space-between; /* 공간 균등 분배 */
}

.tags {
  display: flex;
  justify-content: center; /* 배지들 가로 중앙 정렬 */
  gap: 5px; /* 배지 간 간격 */
  margin-bottom: 10px;
  min-height: 20px; /* 배지 영역 높이 고정 */
}

.recommended-badge,
.popular-badge {
  font-size: 14px;
  padding: 5px 10px;
  font-weight: bold;
  border-radius: 5px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
}

.popular-badge {
  color: red;
}

.recommended-badge {
  color: blue;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  min-height: 40px; /* 제목 영역 높이 고정 */
}

.product-price {
  font-size: 14px;
  color: #e63946;
  min-height: 20px; /* 가격 영역 높이 고정 */
}

</style>