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
        console.log('데이터 가져오기',response)
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
.div1{
  margin-top:100px
}

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