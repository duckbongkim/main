<template>
  <div>
    <h1>상품 목록</h1>
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.product_name }}</h3>
        <p>{{ product.product_description }}</p>
        <p>{{ product.drink_type }}</p>
        <p>{{ product.product_price }}</p>
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
    };
  },
  created() {
    this.fetchProducts();  
  },
  mounted() {
    this.fetchProductsByType(this.drink_type);
  },
  watch: {
    drink_type(newDrinkType) {
      this.fetchProductsByType(newDrinkType);
    },
  },
  methods: {
    // 상품 목록 조회
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/liqueur'); 
        this.products = response.data; 
      } catch (error) {
        this.error = '상품 데이터를 불러오는 데 실패했습니다.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // 상품 검색 (검색창 기능)
    async searchProducts() {
      const productName = ''; 
      const productDescription = '';  
      const drinkType = '';   
      const productKind ='';         
      try {
        const response = await axios.get('http://localhost:3000/liqueur/search', {
          params: { product_name: productName, product_description: productDescription, drink_type: drinkType,product_kind: productKind },
        });
        this.products = response.data; 
      } catch (error) {
        this.error = '상품 검색에 실패했습니다.';
        console.error(error);
      }
    },
    // 특정 품목별 상품 조회
    async fetchProductsByType(drinkType) {
      try {
        
        const response = await axios.get(`http://localhost:3000/liqueur/${drinkType}`
        );
        console.log('서버에서 받은 데이터:', response.data);  
        this.products = response.data;
      } catch (error) {
        this.error = '품목별 상품을 불러오는 데 실패했습니다.';
        console.error(error);
      }
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
</style>