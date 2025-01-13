<template>
<div>
    <div>
      <input v-model="searchQuery" placeholder="검색어를 입력하세요" @keyup.enter="searchProducts" />
      <button @click="searchProducts">검색</button>
    </div>
    

   <div class="container">
      <div 
        v-for="product in paginatedProducts" 
        :key="product.id" 
        class="product-card"
        :class="{ 'out-of-stock': product.isOutOfStock }"
        @click="goProducts(product.id)"
        :disabled="product.isOutOfStock">
        <img :src="product.product_image" :alt="product.name" />
        <div class="product-details">
          <h2 class="product-title">{{ product.product_name }}</h2>
          <p class="product-price">{{ product.product_price }}</p>
          <button @click="addToCart(product)" class="buy-button" :disabled="product.isOutOfStock">구매</button>
          <!-- 추천상품 표시 -->
          <div v-if="product.isRecommended" class="item_icon_box" >
              <!-- 추천상품 아이콘을 특정 상품에만 추가 -->
              <img src="https://pobsmbsool.cdn-nhncommerce.com/data/icon/goods_icon/good_icon_recomm.gif" alt="추천상품" title="추천상품" class="middle recomm">
              <!-- 신상품 아이콘은 다른 상품에만 추가 -->
              <img src="https://pobsmbsool.cdn-nhncommerce.com/data/icon/goods_icon/good_icon_new.gif" alt="신상품" title="신상품" class="middle new">
          </div>
        </div>
      </div>

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
  props: ['product_kind'],
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
      currentPage: 1,
      itemsPerPage: 15,  
      searchQuery: '',  
      filteredProducts: [], 
      noResultsMessage: '',  

    };
  },
  mounted() {
    this.fetchProductsByType(this.product_kind);  
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
    drink_type(newproductKind) {
      this.fetchProductsByType(newproductKind);  
    },
  },
  methods: {
    async fetchProductsByType(productKind) {
      console.log('axios 준비즁')
      try {
        const response = await axios.get(`http://localhost:3000/etc/${productKind}`);
        this.products = response.data.map(product => {
      return {
        ...product,
        isOutOfStock: product.stack === 0 // stack이 0이면 품절로 처리
      };
    });
        this.filteredProducts = this.products;  // 처음에는 모든 상품을 표시
      } catch (error) {
        console.error('상품을 불러오는 데 실패했습니다.', error);
      }
    },
     
    //품절기능 
    addToCart(product) {
      if (product.isOutOfStock) {
        alert('품절된 상품입니다.');
        return;
      }
      console.log(`상품 ${product.product_name}을(를) 장바구니에 추가했습니다.`);
    },

    goProducts(productId) {
        // 제품 페이지 이동 로직 (예: 라우터 사용)
        this.$router.push(`/products/${productId}`);
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
          product.product_kind.toLowerCase().includes(this.searchQuery.toLowerCase())
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
        product.product_kind.toLowerCase().includes(query)
      );
    }
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
}
.product-card.out-of-stock {
  opacity: 0.5; /* 흐리게 만들기 */
  background-color: #f0f0f0; /* 배경색 변경 */
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