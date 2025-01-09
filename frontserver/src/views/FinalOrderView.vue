<template>
<div class="container">
  <div class="content-wrapper">
    <h1>최종 주문 페이지</h1>
    <div>
        <div class="input-form col-md-12 max-auto">
            <h4>주문창</h4>
            <table>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>상품금액</th>
                        <th>합계금액</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="info in productInfo " :key="info.id">                
                        <td><img :src="info.Product.product_image"></td>
                        <td>{{info.Product.product_name}}</td>
                        <td>
                            <button @click="minusC(info)">-</button>
                            {{info.count}}
                            <button @click="plusC(info)">+</button></td>
                        <td>{{info.Product.product_price}}</td>
                        <td>{{info.count * info.Product.product_price}}</td>
                    </tr>
                </tbody>
            </table>
        </div> 
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
    </div>
    <div class="orderAdressInputContainer">
        <form>
            <h2>배송지 정보</h2>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">우편번호</span>
                <input type="text" v-model="zipCode" v-zipcode class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">배송 주소</span>
                <input type="text" v-model="address" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">상세 주소</span>
                <input type="text" v-model="addressDetail" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
        </form>
    </div>
    <div>
        <button @click="order" class="btn btn-primary">주문하기</button>
    </div>
  </div>
</div>
</template>


<script>
import axios from 'axios';

export default{ 
    name:'',
    components:{},
    computed:{},
    directives:{
        zipcode:{//우편번호 입력 제한
            mounted(el) {
                el.addEventListener('input', () => {
                    // 우편번호 형식: 5자리 숫자
                    const zipcodePattern = /^\d{5}$/;
                    // 숫자만 남기고 제거
                    el.value = el.value.replace(/[^0-9]/g, '').slice(0, 5);
                    
                    if (!zipcodePattern.test(el.value)) {
                        el.setCustomValidity('우편번호는 5자리 숫자여야 합니다.');
                    } else {
                        el.setCustomValidity('');
                    }
                });
            }
        }
    },
    data(){
        return{
            orderList:[],
            address:'',
            addressDetail:'',
            zipCode:'',
            productInfo :[],
            numberOfProducts : 0,
            finalTotalPrice: 0,
            deliveryFee : 3000,
        };
    },
    setup(){},
    created(){},
    mounted(){

        // 쿼리 선별 코드
        // 들어오는 쿼리에 따라 다른 파라메터를 넣어 같은 함수를 실행시키는 코드
        if(this.$route.query.productInfoQuery){
            this.getProductInfo('productInfoQuery');
        // orderingInfoQuary가 있으면, 문자열 'orderingInfoQuary'를 넣어서 함수 실행
        }else if (this.$route.query.orderingInfoQuary){
            this.getProductInfo('orderingInfoQuary');
        }else {
            console.error("주문할 제품 정보(쿼리)를 받지 못합니다.")
        }

    },
    unmounted(){},
    methods:{
        // 제품 수량 변경 함수
        plusC(info){
            info.count += 1 
        },

        minusC(info){
            if(info.count > 0){
                info.count -= 1 
            } return;
        },


        //총액 계산 함수
        total_products(){
            this.numberOfProducts= this.productInfo.length
        },
        productTotalPrice(){
            this.finalTotalPrice = this.productInfo.reduce((acc, info) => acc + info.Product.product_price * info.count, 0 )
        },

        calculateTotal(){
            this.total_products()
            this.productTotalPrice()
        },


        // MAKE Ordering Product List 
        async getProductInfo(query){
            try{
                if(query === 'productInfoQuery'){
                    this.productInfo = JSON.parse(this.$route.query.productInfoQuery);
                }else if(query === 'orderingInfoQuary') {
                    const InfoFromProductView = this.$route.query.orderingInfoQuary;
                    const response = await axios.get(`http://localhost:3000/orders/order/${InfoFromProductView}`);
                    this.productInfo = [response.data];
                }
                //총액 계산
                this.calculateTotal()
            }catch(err){
                console.error(err);
            }
        },
    },
    watch:{}
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.content-wrapper {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>