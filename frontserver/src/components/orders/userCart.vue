<template>
<div>
    <div>
        <h1>장바구니</h1>
        <table>
            <thead>
                <tr>
                    <th>상품 이미지</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>상품금액</th>
                    <th>합계금액</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cartedProduct in cartedProducts" :key="cartedProduct.id">
                    <td><img :src="cartedProduct.Product.product_image" alt=""></td>                  
                    <td>{{cartedProduct.Product.product_name}}</td>
                    <td>
                        <button @click="minusC(cartedProduct)">-</button>
                        {{cartedProduct.count}}
                        <button @click="plusC(cartedProduct)">+</button></td>
                    <td>{{cartedProduct.Product.product_price}}</td>
                    <td>{{cartedProduct.count * cartedProduct.Product.product_price}}원</td>
                    <td><button @click="deleteProduct(cartedProduct.id)">삭제</button></td>
                </tr>
            </tbody>
        </table>
        <div>
            <p>주문수량 및 총액</p>
            <table>
                <thead>
                    <tr>
                        <th>총 NNNN개의 상품금액 </th>
                        <th>배송비</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <tb>###모든 합계금액 다 합친 값 ###원</tb>
                        <tb>###배송비###원</tb>
                        <tb>###모든 합계금액 다 합친 값 + 배송비### 원</tb>
                    </tr>
                </tbody>
            </table>

        </div>
        <div>
            <button>선택상품삭제</button>
        </div>
        <div>
            <button>선택상품 주문</button>
            <button @click="setProductSession()">전체상품 주문</button>
        </div>
    </div>
</div>
</template>


<script>
import axios from 'axios';


export default{ 
    name:'',
    components:{},
    data(){
        return{
            cartedProducts : [],
            //selectedProducts: [],
            userid : 0,
            productInfoForOrder : [],

        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getCartedProducts()
    },
    unmounted(){},
    methods:{
        // 제품 수량 변경 함수
        plusC(cartedProduct){
            cartedProduct.count += 1 
        },

        minusC(cartedProduct){
            if(cartedProduct.count > 0){
                cartedProduct.count -= 1 
            } return;
            
        },
        //Cart READ
        async getCartedProducts() {
            try {
                this.userid = this.$route.params.userId
                const response = await axios.get(`http://localhost:3000/orders/cart/${this.userid}`);
                this.cartedProducts = response.data;
                
            }catch(err){
                console.error(err);
            }            
        },

        //Cart DELETE
        async deleteProduct(cartedProduct_id){
            try{
                const deleteCart = confirm("해당 제품을 장바구니에서 삭제하시겠습니까?");
                if(!deleteCart){return;}
                const response = await axios.delete(`http://localhost:3000/orders/cart/${cartedProduct_id}`);
                if (response.status === 200) {
                    alert("찜에서 삭제되었다");
                    this.cartedProducts = this.cartedProducts.filter(c => c.id !== cartedProduct_id);
                }
                console.log(response);
            }catch(err){
                console.error(err);
            }
        },


        //Order CREATE
        //주문할 제품정보를 세션에 저장하여 쓰기
        setProductSession(){
            this.productInfoForOrder = this.cartedProducts;
            console.log(`##############this.productInfoForOrder:${this.productInfoForOrder}`)
            //세션에 저장
            sessionStorage.setItem('productInfo',JSON.stringify(this.productInfoForOrder));
        },
    }
}

</script>

