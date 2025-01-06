<template>
<div>

    <div class="mypage-container">
    <!-- User Info Section -->
    <div class="user-info">
      <div class="user-details">
        <div>
          <h3>{{user.nickname}} 님 반갑습니다.</h3>
        </div>
      </div>

    <div class="user-balance">
        <div class="balance-item">
            <h4 class="rating_name">등급</h4>
            <p>{{rating.rating_name}}</p>
        </div>
        <hr class="balance-line">
        <div class="balance-item">
            <h4>적립금</h4>
            <p class="ratingPoint">{{user.ratingPoint}}원</p>
        </div>
    </div>
    </div>

    <div class="order-list">
        <ul class="order-list-ul">
            <li>
                <a @click="goWish(dummy.userId)"> 찜 리스트 </a>
            </li>
            <li>
                <a @click="goCart(dummy.userId)"> 장바구니 </a>
            </li>
            <li>
                <a @click="goOrder(dummy.userId)"> 주문목록 </a>
            </li>
            <li>
                <a href="#">취소/환불 목록</a>
            </li>
        </ul>

        <router-view /> 
    </div>
  
  </div>



</div>

</template>


<script>
import axios from 'axios';

export default{ 
    name:'OrderView',
    components:{

    },
    data(){
        return{

            dummy : {userId : 22},
            user:{}, // 유저 데이터를 받아올수있도록 data 에 작성 1월5일 동진
            rating:{
        }
        }
    },
    setup(){},
    created(){},
    mounted(){
      this.getUserData(); // getuserdata 를 마운트에 작성 1월 5일 동진
      this.getRating();
      },
    unmounted(){},
    methods:{

        

        goWish(userId){
            this.$router.push(`/wish/${userId}`)
        },
        goCart(userId){
            this.$router.push(`/cart/${userId}`)
        },
        goOrder(userId){
            this.$router.push(`/order/${userId}`)
        },

      // 마이페이지에서 유저 정보를 받아오는 get 작성 1월5일 동진
      async getUserData(){
        try {
          const res = await axios.get('http://localhost:3000/orders',{withCredentials: true})
          this.user = res.data
          console.log('user',res)
        }catch(err){
          console.error(err)
        }
      },
      // 유저의 레이팅 등급을 받아오는 get 작성 1월 5일 동진
      async getRating(){
        try{
          const res = await axios.get('http://localhost:3000/profile/ratings',{withCredentials:true})
          this.rating = res.data.find((rating)=>rating.id === this.user.rating_id)
        }catch(err) {
          console.error(err)
        }
      }
        
    },
}


</script>

<style scoped>

.mypage-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}



.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  font-size: calc(12px + 0.5vw); 
  gap: 20px;
  margin: 50px 0 50px 0;
}

.user-details,
.user-balance {
  flex: 1; 
  text-align: center; 
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 10px; 
  text-align: left;
}

.user-details div {
  display: flex; 
  align-items: center; 
  gap: 10px; 
}

.user-details h3 {
  margin: 0; 
  line-height: 1.2; 
}

.edit-btn {
  color: white;
  padding: 6px 10px; 
  border: none;
  border-radius: 4px;
  font-size: calc(10px + 0.3vw);
  margin: 0; 
  display: inline-block; 
  height: auto; 
}

.user-balance {
  display: flex;
  flex-direction: column;
  margin: 50px 0 50px 0;
}

.balance-item {
  display: flex; 
  justify-content: space-between; 
  align-items: center;
}

.balance-item h4 {
  margin: 0; 
}


.balance-item p {
  margin: 0; 
  text-align: right;
  font-weight: 700;
}

.balance-line {
  border-bottom: 1px solid #ccc; 
  margin: 10px 0 10px 0;
}

.order-list {
    margin-top: 100px;
}

.order-list-ul{
    display: flex;
    justify-content: space-between;
}

.order-list-ul li {
    list-style: none;
}

.order-list-ul li a {
    font-weight: 700;
    font-size: 1.4em;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: black;
}

.order-list-com {
    margin-top: 50px;
}



</style>

