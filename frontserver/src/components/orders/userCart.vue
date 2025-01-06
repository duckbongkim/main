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
                        <button @click="plusC()">-</button>
                        {{cartedProduct.count}}
                        <button @click="minusC()">+</button></td>
                    <td>{{cartedProduct.Product.product_price}}</td>
                    <td>{{cartedProduct.total_price}}원</td>
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
                        <tbody>###모든 합계금액 다 합친 값 ###원</tbody>
                        <tbody>###배송비###원</tbody>
                        <tbody>###모든 합계금액 다 합친 값 + 배송비### 원</tbody>
                    </tr>
                </tbody>
            </table>

        </div>
        <div>
            <button>선택상품삭제</button>
        </div>
        <div>
            <button>선택상품 주문</button>
            <button>전체상품 주문</button>
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
            userid : 0,
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getCartedProducts()
    },
    unmounted(){},
    methods:{

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
                console.log(`######################response:${response}`);
                if (response.status === 200) {
                    alert("찜에서 삭제되었다");
                    this.cartedProducts = this.cartedProducts.filter(c => c.id !== cartedProduct_id);
                }
                console.log(response);
            }catch(err){
                console.error(err);
            }
        }
    }
}

</script>