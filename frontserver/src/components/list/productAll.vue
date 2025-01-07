<template>
  <div>
    <div>
      <input v-model="searchQuery"  type="text"  placeholder="검색어를 입력하세요"  @keyup.enter="searchProducts" />
      <button @click="searchProducts">검색</button>
    </div>

    <h1>상품 목록</h1>
    <div v-for="product in filteredProducts" :key="product.id" class="product-card">
      <router-link :to="'/products/' + product.id">
        <h3>{{ product.product_name }}</h3>
        <p>{{ product.product_description }}</p>
        <p>{{ product.drink_type }}</p>
        <p>{{ product.product_price }}</p>
      </router-link>
    </div>

    <div v-if="noResultsMessage" class="no-results">
      {{ noResultsMessage }}
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      searchQuery: '',  
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