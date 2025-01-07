<template>
  <div>
    <div>
      <input v-model="searchQuery" placeholder="검색어를 입력하세요" @keyup.enter="searchProducts" />
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
  props: ['drink_type'],
  data() {
    return {

      products: [],  
      searchQuery: '',  
      filteredProducts: [], 
      noResultsMessage: '',  

    };
  },
  mounted() {
    this.fetchProductsByType(this.drink_type);  
  },
  watch: {
    '$route.query.search'(newSearch) {
      if (newSearch) {
        this.fetchProducts().then(() => {
          this.filterProductsBySearch(newSearch);
        });
      } else {
        this.fetchProducts();
      }
    },
    drink_type(newDrinkType) {
      this.fetchProductsByType(newDrinkType);  
    },
  },
  methods: {
    // drink_type에 맞는 상품 목록을 불러오는 메서드
    async fetchProductsByType(drinkType) {
      try {
        const response = await axios.get(`http://localhost:3000/liqueur/${drinkType}`);
        console.log('서버에서 받은 데이터:', response.data);
        this.products = response.data;
        this.filteredProducts = this.products;  // 처음에는 모든 상품을 표시
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
        this.filteredProducts = this.products.filter(product =>
          product.product_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.product_description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.drink_type.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        
        //검색 메세지 설정
        if (this.filteredProducts.length === 0) {
          this.noResultsMessage = '검색 내용이 없습니다.';  
        } else {
          this.noResultsMessage = '';  
        }
      }
    },

    // 검색어로 상품 필터링하는 새로운 메소드
    filterProductsBySearch(searchQuery) {
      const query = searchQuery.toLowerCase();
      this.products = this.products.filter(product => 
        product.product_name.toLowerCase().includes(query) ||
        product.product_description.toLowerCase().includes(query) ||
        product.drink_type.toLowerCase().includes(query)
      );
    }
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

input {
  padding: 5px;
  margin-right: 10px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>