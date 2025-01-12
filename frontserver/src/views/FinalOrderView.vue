<template>
<div class="container">
  <div class="content-wrapper">
    <div class="order-header">
      <h1>주문/결제</h1>
      <div class="order-steps">
        <span class="step completed">장바구니</span>
        <span class="step-arrow"></span>
        <span class="step active">주문/결제</span>
        <span class="step-arrow"></span>
        <span class="step">주문완료</span>
      </div>
    </div>

    <!-- 주문 상품 정보 -->
    <div class="order-section">
      <h2 class="section-title">주문 상품 정보</h2>
      <div class="product-table">
        <table>
          <thead>
            <tr>
              <th>상품 정보</th>
              <th>수량</th>
              <th>상품금액</th>
              <th>합계금액</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="info in productInfo" :key="info.id">
              <td class="product-info">
                <img :src="info.Product.product_image" :alt="info.Product.product_name">
                <span class="product-name">{{info.Product.product_name}}</span>
              </td>
              <td>{{info.count}}개</td>
              <td>{{info.Product.product_price.toLocaleString()}}원</td>
              <td class="price">{{(info.count * info.Product.product_price).toLocaleString()}}원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 배송지 정보 -->
    <div class="order-section">
      <h2 class="section-title">배송지 정보</h2>
      <div class="delivery-form">
        <div class="form-group">
          <label>우편번호</label>
          <div class="zipcode-input">
            <input type="text" v-model="zipCode" v-zipcode placeholder="우편번호">
            <button class="btn-search">주소 검색</button>
          </div>
        </div>
        <div class="form-group">
          <label>배송 주소</label>
          <input type="text" v-model="address" placeholder="기본주소">
        </div>
        <div class="form-group">
          <label>상세 주소</label>
          <input type="text" v-model="addressDetail" placeholder="상세주소">
        </div>
        <div class="form-group">
          <label>배송메세지</label>
          <input type="text" v-model="orderMessage" placeholder="배송메세지">
        </div>
      </div>
    </div>

    <!-- 결제 정보 -->
    <div class="order-section">
      <h2 class="section-title">결제 정보</h2>
      <div class="payment-summary">
        <div class="summary-row">
          <span>상품 금액</span>
          <span class="price">{{finalTotalPrice.toLocaleString()}}원</span>
        </div>
        <div class="summary-row">
          <span>배송비</span>
          <span class="price">{{deliveryFee.toLocaleString()}}원</span>
        </div>
        <div class="summary-row total">
          <span>최종 결제 금액</span>
          <span class="price">{{(finalTotalPrice + deliveryFee).toLocaleString()}}원</span>
        </div>
      </div>
    </div>

    <div class="order-button">
      <button @click="dummy" class="btn-order">더미함수실행행</button>
      <button @click="order" class="btn-order">결제하기</button>      
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
            address:'',
            addressDetail:'',
            zipCode:'',
            productInfo :[{
              id: 37,
              count: 2,
              account_id: 1, // /:userid로 적용해야함함
              product_id: 4,
              Product: {
                product_name: "달모어 25년 700ml",
                product_price: 2790000,
                product_image: "http://www.kajawine.kr/data/item/4363187205/thumb-TheDalmore25YearsOldbottle_360x480.jpg"
              },
              selected: true
            },
            {
              id: 38,
              count: 1,
              account_id: 1,////더미아이디, /:userid로 적용해야함함
              product_id: 1,
              Product: {
                product_name: "산토리 히비끼 30년",
                product_price: 12000000,
                product_image: "http://www.kajawine.kr/data/item/1499736192/7IKw7Yag66as7Z6I67mE64G83064WE.jpg"
              },
              selected: true
            }],
            //{"id":37,"count":2,"total_price":5580000,"createdAt":"2025-01-09T08:21:30.000Z","updatedAt":"2025-01-09T08:34:15.000Z","account_id":4,"product_id":4,
            //"Product":{"product_name":"달모어 25년 700ml","product_price":2790000,"product_image":"http://www.kajawine.kr/data/item/4363187205/thumb-TheDalmore25YearsOldbottle_360x480.jpg"},
            //"selected":true}
            //orderInfo:[],
            finalTotalPrice: 0,
            deliveryFee : 3000,
        };
    },
    setup(){},
    created(){},
    mounted(){
        // 쿼리 선별 코드
        // 들어오는 쿼리에 따라 다른 파라메터를 넣어 같은 함수를 실행시키는 코드

        // if(this.$route.query.productInfoQuery){
        //     this.getProductInfo('productInfoQuery');
            
        // // orderingInfoQuary가 있으면, 문자열 'orderingInfoQuary'를 넣어서 함수 실행
        // }else if (this.$route.query.orderingInfoQuary){
        //     this.getProductInfo('orderingInfoQuary');
        // }else {
        //     console.error("주문할 제품 정보(쿼리)를 받지 못합니다.")
        // }
        

    },
    unmounted(){},
    methods:{
        dummy(){
          console.log(`############################${JSON.stringify(this.productInfo)}`);
          this.calculateTotal()
        },

        //총액 계산 함수
        calculateTotal(){
            this.finalTotalPrice = this.productInfo.reduce((acc, info) => acc + info.Product.product_price * info.count, 0 );
        },


        // MAKE Ordering Product List 
        async getProductInfo(query){
            try{
                if(query === 'productInfoQuery'){
                    this.productInfo = JSON.parse(this.$route.query.productInfoQuery);
                    //console.log(`############################${JSON.stringify(this.productInfo)}`)
                }else if(query === 'orderingInfoQuary') {
                    const InfoFromProductView = this.$route.query.orderingInfoQuary;
                    const response = await axios.get(`http://localhost:3000/orders/ordering/${InfoFromProductView}`);
                    this.productInfo = [response.data];
                }
                //총액 계산
                this.calculateTotal()
            }catch(err){
                console.error(err);
            }
        },

        // Order CREATING
        async order(){
          try {
            const orderInfos = this.productInfo.map(product => ({
              count : product.count,
              account_id : product.account_id,
              product_id : product.product_id,

              address : this.address,              
              addressDetail : this.addressDetail,
              addressNumber : this.zipCode,
              orderMessage : this.orderMessage,

              final_paid_price : product.count * product.Product.product_price, //final_paid_price 속성이름 바꿀지?

              // 제품별 오더 하나하나에 배송비, 할인 속성 만들지 회의.
              //discount_amount : ((로직짜야됨됨))
              //deliveryFee : this.deliveryFee,
            }));
            console.log(`################orderInfos:${JSON.stringify(orderInfos)}`);
            const reaponse = await axios.post('http://localhost:3000/orders/order', orderInfos);
            
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
  background-color: #f8f9fa;
}

.content-wrapper {
  width: 80%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
}

.order-header {
  text-align: center;
  margin-bottom: 3rem;
}

.order-header h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.order-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.step {
  color: #999;
  font-weight: 500;
}

.step.completed {
  color: #28a745;
}

.step.active {
  color: #007bff;
  font-weight: 700;
}

.step-arrow {
  color: #999;
}

.order-section {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f1f1;
}

/* 상품 테이블 스타일 */
.product-table table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th {
  background: #f8f9fa;
  padding: 1rem;
  text-align: center;
}

.product-table td {
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #f1f1f1;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-info img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

/* 배송지 폼 스타일 */
.delivery-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
}

.form-group input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.zipcode-input {
  display: flex;
  gap: 1rem;
}

.btn-search {
  padding: 0.8rem 1.5rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 결제 정보 스타일 */
.payment-summary {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.summary-row.total {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #ddd;
  font-size: 1.2rem;
  font-weight: 700;
}

.price {
  font-weight: 600;
  color: #dc3545;
}

/* 주문 버튼 스타일 */
.order-button {
  text-align: center;
  margin-top: 3rem;
}

.btn-order {
  padding: 1rem 4rem;
  font-size: 1.2rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-order:hover {
  background: #0056b3;
}
</style>