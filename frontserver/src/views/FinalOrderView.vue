<template>
<div class="container">
  <div class="content-wrapper">
    <div class="order-header">
      <h1>주문/결제</h1>
      <div class="order-steps">
        <span class="step completed">장바구니</span>
        <span class="step-arrow">></span>
        <span class="step active">주문/결제</span>
        <span class="step-arrow">></span>
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

    <!-- 적립금, 쿠폰 적용 -->
    <div class="order-section">
      <h2 class="section-title">할인 적용</h2>
      <div class="discount-form">
        <!-- 쿠폰 적용 -->
        <div class="form-group">
          <label>쿠폰 적용</label>
          <div class="coupon-select">
            <select v-model="selectedCoupon">
              <option value="">쿠폰을 선택해주세요</option>
              <option v-for="coupon in userCoupons" 
                      :key="coupon.id" 
                      :value="coupon">
                {{coupon.Coupon.coupon_name}} ({{coupon.Coupon.coupon_discount_rate*100}}% 할인)
              </option>
            </select>
          </div>
        </div>
        
        <!-- 적립금 적용 -->
        <div class="form-group">
          <label>적립금 적용</label>
          <div class="point-input">
            <div class="point-input-group">
                <input type="number" 
                       v-model="tempUsePoint" 
                       :max="user.savedMoney" 
                       min="0" 
                       placeholder="사용할 적립금을 입력해주세요">
                <button class="btn-apply-point" @click="applyPoint">적립금 적용</button>
            </div>
            <span class="available-point">사용 가능한 적립금: {{user.savedMoney?.toLocaleString()}}원</span>
          </div>
        </div>
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
      </div>
    </div>

    <!-- 결제 정보 -->
    <div class="order-section">
      <h2 class="section-title">결제 정보</h2>
      <div class="payment-summary">
        <div class="summary-row">
          <span>상품 금액</span>
          <span class="price">{{originalTotalPrice.toLocaleString()}}원</span>
        </div>
        <!-- 쿠폰 할인 표시 -->
        <div class="summary-row discount" v-if="selectedCoupon">
          <span>쿠폰 할인</span>
          <span class="price discount-price">
            -{{(originalTotalPrice * selectedCoupon.Coupon.coupon_discount_rate).toLocaleString()}}원
          </span>
        </div>
        <!-- 적립금 사용 표시 -->
        <div class="summary-row discount" v-if="usePoint > 0">
          <span>적립금 사용</span>
          <span class="price discount-price">-{{usePoint.toLocaleString()}}원</span>
        </div>
        <div class="summary-row">
          <span>배송비</span>
          <span class="price">{{deliveryFee.toLocaleString()}}원</span>
        </div>
        <div class="summary-row total">
          <span>최종 결제 금액</span>
          <span class="price">{{totalPaymentAmount.toLocaleString()}}원</span>
        </div>
      </div>
    </div>

    <div class="order-button">
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
    computed:{
    },
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
            user:{},
            userCoupons:[],
            selectedCoupon:null,
            tempUsePoint: 0,
            usePoint: 0,
            originalTotalPrice: 0,
            totalPaymentAmount: 0,
        };
    },
    setup(){},
    created(){
      this.getUser();
      this.getCoupons();
    },
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
        //총액 계산 함수
        total_products(){
            this.numberOfProducts= this.productInfo.length
        },
        productTotalPrice(){
            this.finalTotalPrice = this.productInfo.reduce((acc, info) => acc + info.Product.product_price * info.count, 0 )
        },
        calculateTotal(){
            // 총 상품 개수 계산
            this.total_products();
            
            // 원래 총액 계산 (모든 상품의 가격 * 수량의 합)
            this.originalTotalPrice = this.productInfo.reduce((acc, info) => 
                acc + (info.Product.product_price * info.count), 0);
            
            // 최종 가격을 원래 총액으로 초기화
            this.finalTotalPrice = this.originalTotalPrice;
            
            // 쿠폰 할인 적용
            if (this.selectedCoupon) {
                const discountAmount = this.originalTotalPrice * this.selectedCoupon.Coupon.coupon_discount_rate;
                this.finalTotalPrice -= discountAmount;
            }
            
            // 적립금 사용 적용
            if (this.usePoint) {
                this.finalTotalPrice -= Number(this.usePoint);
            }

            // 최종 결제 금액 (배송비 포함)
            this.totalPaymentAmount = this.finalTotalPrice + this.deliveryFee;
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

        //유저도 가져와야 해
        async getUser(){
            try{
              const response = await axios.get('http://localhost:3000/profile',{withCredentials:true});
              this.user = response.data;
            }catch(err){
              console.error(err);
            }
        },
        //쿠폰 가져와야 해
        async getCoupons(){
            try{
                const response = await axios.get('http://localhost:3000/profile/coupons',{withCredentials:true});
                this.userCoupons = response.data;
            }catch(err){
                console.error(err);
            }
        },
        applyPoint() {
            if (this.tempUsePoint > this.user.savedMoney) {
                alert('보유한 적립금을 초과할 수 없습니다.');
                this.tempUsePoint = this.user.savedMoney;
                return;
            }
            if (this.tempUsePoint > this.finalTotalPrice) {
                alert('상품 금액을 초과하여 사용할 수 없습니다.');
                this.tempUsePoint = this.finalTotalPrice;
                return;
            }
            
            this.usePoint = Number(this.tempUsePoint);
            this.calculateTotal();
        },
    },
    watch: {
        selectedCoupon: {
            handler() {
                this.calculateTotal();
            }
        }
    }
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

.summary-row.discount {
  color: #666;
  font-size: 0.95rem;
}

.discount-price {
  color: #2b8a3e;  /* 할인 금액은 초록색으로 표시 */
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

/* 할인 적용 스타일 */
.discount-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.coupon-select select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.point-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.point-input input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.available-point {
  color: #6c757d;
  font-size: 0.9rem;
}

.point-input-group {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.point-input-group input {
    width: 200px;
    height: 40px;
}

.btn-apply-point {
    padding: 0.5rem 1rem;
    height: 40px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    font-size: 0.9rem;
}

.btn-apply-point:hover {
    background: #5a6268;
}
</style>