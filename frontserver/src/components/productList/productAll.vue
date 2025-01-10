<template>
  <div>
    <div>
      <input v-model="searchQuery"  type="text"  placeholder="검색어를 입력하세요"  @keyup.enter="searchProducts" />
      <button @click="searchProducts">검색</button>
    </div>

    <h1>상품 목록</h1>
    <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
      <router-link :to="'/products/' + product.id">
        <h3>{{ product.product_name }}</h3>
        <p>{{ product.product_description }}</p>
        <p>{{ product.drink_type }}</p>
        <p>{{ product.product_price }}</p>
      </router-link>
        
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

    <div v-if="noResultsMessage" class="no-results">
      {{ noResultsMessage }}
    </div>

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
      itemsPerPage: 15,   
      filteredProducts: [],
      noResultsMessage: '',
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    // 상품 목록 조회
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/liqueur');
        this.products = response.data;
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
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  text-align: center;
}

.error-message {
  color: red;
  font-weight: bold;
}

input {
  padding: 5px;
  margin-right: 10px;
}
button {
  padding: 5px 10px;

  border: none;
  cursor: pointer;
}

</style>