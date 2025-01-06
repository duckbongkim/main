<template>
<div>


            
    <section class="product-main container d-flex justify-content-center align-items-center flex-wrap">
        
        <div class="product-image-container text-center">
            <img :src="selectedProduct.product_image" alt="product_img" class="product-img img-fluid">
        </div>

    
        <div class="product-info-container text-center text-md-start">
            <div class="product-info">
                <div>
                    <h3 class="product-name mb-5">{{selectedProduct.product_name}}</h3>
                    <p class="price-text">{{selectedProduct.product_price}}원</p>
                    <div class="product-stock"><p>남은수량</p><p> {{selectedProduct.product_stock}}개</p></div>
                    
                </div>
            
                <div class="delivery-box">
                    <div class="delivery-info"><p>배송예정일</p> <p>평일기준 2일</p></div>
                    <div class="delivery-corpor"><p>택배사</p><p>CJ대한통운</p></div>
                </div>
            </div>
            
            <div class="quantity-group gap-3 mb-3">
                <p id="quantity-label" class="mb-0">수량</p>
                <div class="quantity-controls d-flex align-items-center">
                    <button @click="minusQ" class="btn btn-light border">-</button>
                    <input type="number" v-model="orderQuantity" class="input-box form-control text-center" style="width: 50px;">
                    <button @click="plusQ" class="btn btn-light border">+</button>
                </div>
            </div>

            <div class="total-price-container">
                    <p>총 합계금액</p>
                    <p class="price-txt">{{selectedProduct.product_price * orderQuantity}}원</p>
            </div>

            
            <div class="button-group d-flex flex-wrap gap-3">
                <button @click="addWish()" class="btn btn-outline-secondary heart-button">
                    <i class="bi bi-heart wish-heart"></i>
                </button>
                <button @click="addCarts()" class="btn btn-outline-dark cart-button">장바구니</button>
                <button @click="dirOrder()" class="btn btn-dark buy-button">구매하기</button>
            </div>



        </div>
    </section>



    <!-- <section class="recoment-section">
    <h3>추천상품 구성??</h3>
        <div class="recoment-container">
            <ul class="recomend-product">
                <li v-for="(pro,i) in recommendProduct" :key="i">
                    <a href="#">
                        <img :src="pro.product_image" alt="product_img" class="recomend-img">
                        <p class="recoment-name">{{pro.product_name}}</p>
                        <p class="recoment-price">{{pro.product_price}}원</p>
                    </a>
                </li>
            </ul>
        </div>
    </section> -->


<!-- 추천상품 -->
<section class="recomend-section">
    <h3> ##어떤걸 추천해줄지 정해야합니다## // 1월1일 현재 기능만 구현한 상태(동진)</h3>
    <div class="recomend-container">
        <div v-for="pro in recommendProduct" :key="pro.id" class="recomend-product">
            <a @click="reRendRecommend(pro.id)">
                <img :src="pro.product_image" alt="product_img" class="recomend-img">
                <p>{{pro.product_name}}</p>
                <p>{{pro.product_price}}원</p>
            </a>

        </div>
    </div>
</section>

<productInfoVue :product="selectedProduct"/>
</div>
</template>


<script>
import axios from 'axios'; 
import productInfoVue from '../components/productLayout/productInfo.vue';
import footerVue from '../components/layout/FooterLayout.vue';
export default{ 
    name:'',
    components:{
      productInfoVue,
      footerVue
    },
    watch:{
       
    },
    data(){
        return{
            

            selectedProduct : {
                id:null,
                product_name : '',
                product_price : null,
                product_description:'',
                product_stock:'',
                product_image:'',
            },

            recommendProduct :[], //1월1일 추천상품 목록 진열 기능 확인 위해 주석제거(동진)

            product_id: null,
            orderQuantity : 1,
            dummy: {

                userid: 22,
            }
            
        };
    },
    setup(){},
    created(){
    },
    mounted(){
        
        
        this.getProducts()
        this.getRecommendProducts() //1월1일 추천상품 목록 진열 기능 확인 위해 주석제거(동진)
    },
    unmounted(){},
    methods:{

        // 해당 뷰 메소드
        
        plusQ() {
            this.orderQuantity += 1;
        },
        minusQ() {
            if(this.orderQuantity > 1){
                this.orderQuantity -= 1;
            }
        },

        // axios 요청 메소드

        // Product 정보 가져오기
        async getProducts() {
            try {
                //도메인 요청, 돌아오는 response 잡기
                this.product_id = this.$route.params.product_id;
                //console.log(this.product_id)
                const response = await axios.get(`http://localhost:3000/products/${this.product_id}`);
                // product_id에 해당하는 제품 data object를 받아온다.
                //console.log(response)
                this.selectedProduct = response.data ; 
                
            }catch(err) {
                console.error(err);
            }
        },

        async getRecommendProducts() {
            try {
                const response = await axios.get(`http://localhost:3000/products/${this.product_id}/recommend/`);
                this.recommendProduct = response.data ; 
            }catch(err) {
                console.error(err);
            }
        },

        async reRendRecommend(productId){
            try{
                this.$router.push(`/products/${productId}`)
                const response = await axios.get(`http://localhost:3000/products/${productId}`);
                this.selectedProduct = response.data;
            }catch(err){
                console.error(err)
            }
        },
        

        async addWish() {
            try {
                //1. selectedProduct.id 를 likes DB에 추가

                    //먼저 백단에서 사용자 인증 정보를 세션에 저장한 상태여야함.
                    //세션에서 userid를, data에서 productid를 따와 params으로 만들기.

                //const userId = this.session.userId;
                const userId = this.dummy.userid;
                const userWish = {
                    userId,
                    product_Id : this.selectedProduct.id,
                };
                
                const response = await axios.post(`http://localhost:3000/orders/wish`, userWish);
                if(response.status == 201) {
                    console.log(response.data.message);
                }




                // 2. 찜에 추가되었습니다.
                const GotoWish = confirm("찜가실?");
                if(GotoWish) {
                    const response = await this.$router.push('/orders');   
                    /// frontserver/src/router/index.js 에 라우터 추가 
                } else {
                    alert("상품이 찜에 추가됐다.");
                }
            } catch(err) {
                //찜에 중복된 상품이 들어갈 경우(409) 에러처리
                // 에러가 있는지, 그 에러의 status가 409인지
                if(err.response && err.response.status == 409){
                    alert(err.response.data.message);
                } else {
                console.error(err);
                }
            }
        },

        async addCarts() {
            try{

            // 1. selectedProduct.id 와 orderQuantity 를 carts DB에 추가.
                //세션에서 userid를, data에서 productid와 orderQ를를 따와 params으로 만들기.
                //const userId = this.session.userId;
                const userId = this.dummy.userid;
                const userOrder = {
                    userId,
                    product_Id :this.selectedProduct.id,
                    quantity : this.orderQuantity, 
                }
                await axios.post(`http://localhost:3000/carts/`, userOrder);

                // "장바구니 갈래? y/n"
                const GotoCart = confirm("장바구니가실?");
                if(GotoCart) {
                    this.$router.push('/cart');              
                    /// frontserver/src/router/index.js 에 라우터 추가 
                } else {
                    alert("상품이 장바구니에 추가됐다.");
                }
            }catch(err){
                console.error(err);
            }
            
        },

        async dirOrder() {
            try {
                await axios.post(`http://localhost:3000/orders/`,{
                    product_id : this.selectedProduct.id,
                    quantity : this.orderQuantity
                });
            }catch(err){
                console.error(err)
            }
        }
            // selectedProduct.id 와 orderQuantity 를 orders DB에 추가. 
            // 주문 페이지로 이동
        }        
    }


</script>

<style scoped>



.price-text {
    font-weight: bold;
    font-size: 1.3rem;
}


input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.product-main{
    padding: 20px;
    gap: 15%;
    width: 100%;
}

.product-name {
    font-weight: bold;
}

.product-info-container{
    width: 30%;
    padding: 10px 10px;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
}

.product-image-container {
    max-width:1 1 300px;
    text-align: center; 
}

.input-box{
    width: 50px;
    border: none;
    background-color: #f1f1f1;
}

.product-img {
    width: 100%; 
    height: auto; 
}

.product-stock {
    display: flex; 
    justify-content: space-between; 
    padding: 20px 0;
}

.delivery-info {
    padding: 20px 0;
    display: flex; 
    justify-content: space-between; 
    
}

.delivery-corpor{
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
}

.quantity-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 20px;
    height: 70px;
    background-color: #f1f1f1;
    border-radius: 10px;
}

.total-price-container {
    display: flex; 
    justify-content: space-between; 
    align-items: center;
}

.total-price-container p {
    margin: 0;
    padding: 15px 0;
}

.total-price-container .price-txt{
    font-weight: bold; 
    font-size: 1.5rem;
}



.quantity-group p,
.delivery-info p {
    margin: 0; 
}

.button-group button {
    flex: 1; 
}

.heart-button {
    
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
}

.wish-heart {
    color: red;
}

.cart-button {
   
    padding: 10px 20px; 
    border-radius: 0; 
    text-align: center;
    white-space: nowrap;
}

.buy-button {
   
    
    border-radius: 0; 
    color: white; 
    background-color: black; 
    border: none; 
    text-align: center;
    white-space: nowrap;
}

.quantity-controls .btn {
    width:2.5rem;
    height: 2.5rem;
    font-size: 1.2rem;
    align-items: center;
}



/* 추천상품 */

.recomend-section{
    width: 100%;
    margin: 50px 0;
}

.recomend-section h3 {
    width: 40%;
    padding: 20px 0;
    margin: 0 auto;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

.recomend-container{
    display: flex;
    justify-content: center;
    gap: 3%;
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;

}

.recomend-product {
    width: 25%;
    text-align: center;
}

.recomend-product p {
    margin-bottom: 0;
    padding: 5px 0 5px 0;
    font-size: 1em;
    font-weight: 600;
}


/* .recoment-product ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
} */

.recomend-product a {
    display: block;
    font-style: normal;
    text-decoration: none;
    color: #000;
}

.recomend-img{
    height: auto;
    width: 30%;
    object-fit: cover;
}

.recoment-name {
    font-size: 0.9em;
    font-weight: bold;
    margin: 0 auto 0 auto;
    text-align: center;
    width: fit-content;
    
}

.recoment-price{
    font-size: 0.9em;
    font-weight: bold;
    margin: 0 auto 0 auto;
    text-align: center;
    width: fit-content;
}





</style>

