<template>
  <div>
   
   <div class="container">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="product-card" @click="goProducts(product.id)">
        <img :src="product.product_image" :alt="product.name" />
        <div class="product-details">
          <span>👍</span><p v-if="product.isTagged" class="recommended-badge">추천</p>
          <p v-if="product.isTagged" class="recommended-badge">인기</p>
          <h2 class="product-title">{{ product.product_name }}</h2>
          <p class="product-price">{{ product.product_price }}</p>
          
          
          <!-- 추천상품 표시 -->
          <div v-if="product.isRecommended" class="item_icon_box">
              <!-- 추천상품 아이콘을 특정 상품에만 추가 -->
              <img src="https://pobsmbsool.cdn-nhncommerce.com/data/icon/goods_icon/good_icon_recomm.gif" alt="추천상품" title="추천상품" class="middle recomm">
              <!-- 신상품 아이콘은 다른 상품에만 추가 -->
              <img src="https://pobsmbsool.cdn-nhncommerce.com/data/icon/goods_icon/good_icon_new.gif" alt="신상품" title="신상품" class="middle new">
          </div>
        </div>
      </div>
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

        const randomIndexes = this.getRandomIndexes(this.products.length, 4);
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
.Child-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.buy-button {
  display: block;
  margin-bottom: 10px; 
}

.recommended-badge {
  display: inline-block;
  background-color: #ffcc00;
  color: #000;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
}
.container {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
  gap: 50px; 
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
  cursor: pointer;
}
.product-card:hover {
  transform: scale(1.05);
}
.product-card img {
  max-width: 100%;
  height: auto;
}
.product-details {
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
</style>