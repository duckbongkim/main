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
                        <th>총 {{numberOfProducts}}개 상품의 상품금액 </th>
                        <th>배송비</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <tb>{{finalTotalPrice}}원</tb>
                        <tb>{{deliveryFee}}원</tb>
                        <tb>{{finalTotalPrice + deliveryFee}}원</tb>
                    </tr>
                </tbody>
            </table>

        </div>
        <div>
            <button>선택상품삭제</button>
        </div>
        <div>
            <button>선택상품 주문</button>
            <button @click="makeOrder()">전체상품 주문</button>
        </div>
    </div>
</div>
</template>


<script>
import axios from 'axios';


export default{ 
    name:'',
    components:{},
    computed : {

    },
    data(){
        return{
            cartedProducts : [],
            //selectedProducts: [],
            userid : 0,
            productInfoForOrder : [],
            //{"id":8,"count":1,"total_price":2790000,"createdAt":"2025-01-08T04:14:53.000Z","updatedAt":"2025-01-08T04:14:53.000Z","account_id":4,"product_id":4,
            // "Product":{"product_name":"달모어 25년 700ml","product_price":2790000,"product_image":"http://www.kajawine.kr/data/item/4363187205/thumb-TheDalmore25YearsOldbottle_360x480.jpg"}},
            numberOfProducts : 0,
            finalTotalPrice: 0,
            deliveryFee : 3000,
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


        //총액 계산 함수

        total_products(){
            this.numberOfProducts= this.cartedProducts.length
        },
        productTotalPrice(){
            this.finalTotalPrice = this.cartedProducts.reduce((acc, cartedProduct) => acc + cartedProduct.Product.product_price * cartedProduct.count, 0 )
        },

        calculateTotal(){
            this.total_products()
            this.productTotalPrice()
        },

        //Cart READ
        async getCartedProducts() {
            try {
                this.userid = this.$route.params.userId
                const response = await axios.get(`http://localhost:3000/orders/cart/${this.userid}`);
                this.cartedProducts = response.data;

                //총액 계산
                this.calculateTotal()
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
                    alert("장바구니에서 삭제되었다");
                    this.cartedProducts = this.cartedProducts.filter(c => c.id !== cartedProduct_id);
                }
                console.log(response);

                //총액 계산
                this.calculateTotal()
            }catch(err){
                console.error(err);
            }
        },


        // //Ordering Product PUSH to makeOrder.vue '/order/:userId'
        // async makeOrder(){
        //     try{
        //         // (변경예정) productInfoForOrder 는 장바구니 리스트에서 '선택된' 애들만 들여보내주는걸로 
        //         this.userid = this.$route.params.userId
        //         this.productInfoForOrder = this.cartedProducts //(임시)
        //         console.log(`##############this.productInfoForOrder:${JSON.stringify(this.productInfoForOrder)}`)
        //         //this.$router.push(`/order/${this.userid}/${this.productInfoForOrder}`);
        //          this.$router.push({
        //             path: `/order/${this.userid}`,
        //             query : {productInfoQuery : JSON.stringify(this.productInfoForOrder)}
        //         });
        //     }catch(err){
        //         console.error(err);
        //     }
        // },

        //Ordering Product PUSH to FinalOrderView.vue '/finalOrder/:userId'
        async makeOrder(){
            try{
                // (변경예정) productInfoForOrder 는 장바구니 리스트에서 '선택된' 애들만 들여보내주는걸로 
                this.userid = this.$route.params.userId
                this.productInfoForOrder = this.cartedProducts //(임시)
                console.log(`##############this.productInfoForOrder:${JSON.stringify(this.productInfoForOrder)}`)
                //this.$router.push(`/order/${this.userid}/${this.productInfoForOrder}`);
                 this.$router.push({
                    path: `/finalOrder/${this.userid}`, /////// 뷰 변경!!!!!!
                    query : {productInfoQuery : JSON.stringify(this.productInfoForOrder)}
                });
            }catch(err){
                console.error(err);
            }
        },

    }
}

</script>

