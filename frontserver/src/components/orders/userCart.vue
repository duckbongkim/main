<template>
<div>
    <div>
        <h1>장바구니</h1>
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" v-model="allSelected" @click="selectAll()"></th>
                    <!-- @click 말고 @change 하면 클릭시 체크 해제가 안됨. 꼬여서그러나 -->
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
                    <td>
                        <input type="checkbox" v-model="cartedProduct.selected" @change="updateSelectedProduct()" >
                    </td>
                    <td><img :src="cartedProduct.Product.product_image" alt=""></td>
                    <td>{{cartedProduct.Product.product_name}}</td>
                    <td>
                        <button @click="minusC(cartedProduct)">-</button>
                        {{cartedProduct.count}}
                        <button @click="plusC(cartedProduct)">+</button></td>
                    <td>{{cartedProduct.Product.product_price.toLocaleString()}}</td>
                    <td>{{(cartedProduct.count * cartedProduct.Product.product_price).toLocaleString()}}원</td>
                    <td><button @click="deleteProduct(cartedProduct.id)">삭제</button></td>
                </tr>
            </tbody>
        </table>
        
        <div>
            <p>주문수량 및 총액</p>
            <table>
                <thead>
                    <tr>
                        <th>선택상품금액 </th>
                        <th>배송비</th>
                        <th>주문금액</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{finalTotalPrice}}원</td>
                        <td>{{deliveryFee}}원</td>
                        <td>{{finalTotalPrice + deliveryFee}}원</td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div>
            <button @click="deleteSelectedProduct()">선택상품삭제</button>
        </div>
        <div>
            <button @click="makeOrder(false)">선택상품 주문</button>
            <button @click="makeOrder(true)">전체상품 주문</button>
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
            selectedProducts: [],
            userid : 0,
            productInfoForOrder : [],
            //{"id":8,"count":1,"total_price":2790000,"createdAt":"2025-01-08T04:14:53.000Z","updatedAt":"2025-01-08T04:14:53.000Z","account_id":4,"product_id":4,
            // "Product":{"product_name":"달모어 25년 700ml","product_price":2790000,"product_image":"http://www.kajawine.kr/data/item/4363187205/thumb-TheDalmore25YearsOldbottle_360x480.jpg"}},
            finalTotalPrice: 0,
            deliveryFee : 3000,
            allSelected : false,
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getCartedProducts()
    },
    unmounted(){},
    methods:{
        //총액 계산 함수
        calculateTotal(){
            this.finalTotalPrice = this.selectedProducts.reduce((acc, selectedProduct) => acc + selectedProduct.Product.product_price * selectedProduct.count, 0 )
        },

        // 제품 수량 변경 함수
        plusC(cartedProduct){
            cartedProduct.count += 1 
            this.calculateTotal()
        },

        minusC(cartedProduct){
            if(cartedProduct.count > 1){
                cartedProduct.count -= 1 
                this.calculateTotal()
            } return;
        },

        // 선택함수
        updateSelectedProduct(){
            this.selectedProducts = this.cartedProducts.filter((cartedProduct) => cartedProduct.selected);
            this.allSelected = (this.selectedProducts.length === this.cartedProducts.length);
            this.calculateTotal();
            console.log(`#####################${JSON.stringify(this.cartedProducts)}, ${this.cartedProducts.length}`)
            console.log(`#####################${JSON.stringify(this.selectedProducts)}, ${this.selectedProducts.length}`)
        },

        selectAll(){
            this.allSelected = !this.allSelected;
            this.cartedProducts.forEach((cartedProduct) => {cartedProduct.selected = this.allSelected;});
            this.updateSelectedProduct();
        },

        //Cart READ
        async getCartedProducts() {
            try {
                this.userid = this.$route.params.userId
                const response = await axios.get(`http://localhost:3000/orders/cart/${this.userid}`);
                this.cartedProducts = response.data;

                this.cartedProducts = this.cartedProducts.map(cartedProduct => ({...cartedProduct, selected : true})); // selected 기본값 true
                console.log(`#####################this.cartedProducts${JSON.stringify(this.cartedProducts)}`)
                // 선택된 제품을 selectedProducts 배열에 넣기
                this.updateSelectedProduct();
                //총액 계산
                this.calculateTotal();
            }catch(err){
                console.error(err);
            }            
        },

        //Cart DELETE
        async deleteProduct(cartedProduct_id){
            try{
                const deleteCart = confirm("해당 제품을 장바구니에서 삭제하시겠습니까?");
                if(!deleteCart){return;}

                const response = await axios.delete(`http://localhost:3000/orders/cart`, {data : {ids : [cartedProduct_id]}});
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

        async deleteSelectedProduct() {
            try{
                const selectedIds = this.selectedProducts.map((selectedProduct) => selectedProduct.id );
                const deleteCart = confirm("선택 제품을 장바구니에서 삭제하시겠습니까?");
                if(!deleteCart){return;}       

                const response =await axios.delete(`http://localhost:3000/orders/cart`, {data : {ids : [selectedIds]}})
                if (response.status === 200) {
                    alert("장바구니에서 삭제되었다");
                    this.cartedProducts = this.cartedProducts.filter(c => !selectedIds.includes(c.id));
                }
                console.log(response);
                this.calculateTotal()
            }catch(err){
                console.error(err);
            };
        },


        //Ordering Product PUSH to FinalOrderView.vue '/finalOrder/:userId'
        async makeOrder(order){
            try{                
                this.userid = this.$route.params.userId
                //전체주문 = true / 선택주문 = false
                if(order){
                    this.productInfoForOrder = this.cartedProducts;
                }else{
                    this.productInfoForOrder = this.selectedProducts;
                }               
                console.log(`##############this.productInfoForOrder:${JSON.stringify(this.productInfoForOrder)}`)
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

