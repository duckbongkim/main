<template>
<div class="container">
  <form class="content-wrapper" @submit.prevent="order">
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
            <input type="text" :value="postcode" placeholder="우편번호" readonly required>
            <button ref="addressSearch" type="button" class="btn-search" @click="execDaumPostcode">주소 검색</button>
            <button type="button" class="btn-search" @click="useUserAddress">사용자 주소 사용</button>
          </div>
        </div>
        <div class="form-group">
          <label>배송 주소</label>
          <input type="text" :value="roadAddress" placeholder="기본주소" readonly required>
        </div>
        <div class="form-group">
          <label>상세 주소</label>
          <input type="text" v-model="addressDetail" placeholder="상세주소" required>
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
      <button type="submit" class="btn-order">결제하기</button>
    </div>
  </form>
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
            address:'',
            addressDetail:'',
            zipCode:'',
            productInfo :[],
            //{"id":37,"count":2,"total_price":5580000,"createdAt":"2025-01-09T08:21:30.000Z","updatedAt":"2025-01-09T08:34:15.000Z","account_id":4,"product_id":4,
            //"Product":{"product_name":"달모어 25년 700ml","product_price":2790000,"product_image":"http://www.kajawine.kr/data/item/4363187205/thumb-TheDalmore25YearsOldbottle_360x480.jpg"},
            //"selected":true}

            //orderInfo:[],

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
            postcode:null,
            roadAddress:'',
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
                    //console.log(`############################${JSON.stringify(this.productInfo)}`)
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
            }));
            console.log(`################orderInfos:${JSON.stringify(orderInfos)}`);
            await axios.post(`http://localhost:3000/orders/order`, orderInfos);
            
          }catch(err){
            console.error(err);
          }
        },
        //유저도 가져와야 해
        async getUser(){
            try{
              const response = await axios.get('http://localhost:3000/profile',{withCredentials:true});
              this.user = response.data;
              console.log("user@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.user);
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
        useUserAddress(){
            if(!this.user.addressNumber || !this.user.address || !this.user.addressDetail){
                alert('사용자 주소가 없습니다.(사용자 정보 수정을 통해 주소를 입력해주세요)');
                this.$nextTick(() => {
                    this.$refs.addressSearch.focus();
                });
                return;
            }
            this.postcode = this.user.addressNumber;
            this.roadAddress = this.user.address;
            this.addressDetail = this.user.addressDetail;
        },
        //주소 검색 api 메서드
        execDaumPostcode() {
          // Daum Postcode API 호출
          new daum.Postcode({
            oncomplete: (data) => {
              let roadAddr = data.roadAddress; // 도로명 주소
              let extraRoadAddr = ""; // 참고 항목

              // 참고항목 조합 (법정동, 건물명 등)
              if (data.bname && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
              }
              if (data.buildingName && data.apartment === "Y") {
                extraRoadAddr += extraRoadAddr
                  ? `, ${data.buildingName}`
                  : data.buildingName;
              }
              if (extraRoadAddr) {
                extraRoadAddr = ` (${extraRoadAddr})`;
              }

              // 데이터 바인딩
              this.postcode = data.zonecode; // 우편번호
              this.roadAddress = roadAddr; // 도로명 주소

              // 가이드 메시지 처리
              if (data.autoRoadAddress) {
                this.guide = `예상 도로명 주소: ${data.autoRoadAddress} ${extraRoadAddr}`;
              } else if (data.autoJibunAddress) {
                this.guide = `예상 지번 주소: ${data.autoJibunAddress}`;
              } else {
                this.guide = "";
              }
            },
          }).open(); // 팝업 창 열기
        },

        order(){
            //결제 전에 주문지 들어갔는지 확인 코드 필요함.!
        }
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f1f1;
}

/* 상품 테이블 스타일 */
.product-table {
  overflow-x: auto; /* 작은 화면에서 가로 스크롤 허용 */
  width: 100%;
}

.product-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* 작은 화면에서 테이블 최소 너비 설정 */
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
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  word-break: keep-all; /* 단어가 잘리지 않도록 설정 */
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

.product-info .product-name {
  text-align: left;
  font-size: 1rem;
  word-break: break-word; /* 긴 텍스트 줄바꿈 */
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
  flex-wrap: wrap; /* 작은 화면에서 줄바꿈 허용 */
  gap: 0.5rem;
}

.zipcode-input input {
  flex: 1;
  min-width: 150px;
}

.zipcode-input button {
  flex: 1;
  min-width: 150px;
  text-align: center;
  white-space: nowrap;
  padding: 0.8rem;
  background: #F3EFE0;
  color: #4A4A4A;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.zipcode-input button:hover {
  background: #E5DCC3;
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
  color: #2b8a3e; /* 할인 금액은 초록색으로 표시 */
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
  background: #F3EFE0;
  color: #4A4A4A;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.btn-order:hover {
  background: #E5DCC3;
  transform: scale(1.05);
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
  background: #F3EFE0;
  color: #4A4A4A;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn-apply-point:hover {
  background: #E5DCC3;
}

/* 반응형 설계 */
/* 화면 너비가 768px 이하일 때 */
@media (max-width: 768px) {
  .zipcode-input {
    flex-direction: column; /* 버튼이 세로로 배치 */
  }

  .product-info {
    flex-direction: column; /* 이미지와 텍스트를 세로로 정렬 */
    align-items: center;
  }

  .product-info img {
    width: 60px; /* 이미지 크기 축소 */
    height: 60px;
  }

  .product-info .product-name {
    font-size: 0.85rem;
    text-align: center;
  }

  .product-table th,
  .product-table td {
    font-size: 0.85rem; /* 텍스트 크기 축소 */
  }

  .btn-order {
    padding: 0.6rem 2rem;
    font-size: 0.9rem;
  }
}

/* 화면 너비가 480px 이하일 때 */
@media (max-width: 480px) {
  .product-table table {
    min-width: 400px; /* 최소 너비 축소 */
  }

  .btn-order {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .content-wrapper {
    width: 95%;
    padding: 0 10px;
  }
}




</style>