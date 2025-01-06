<template>
<div>

    <div class="mypage-container">
    <!-- User Info Section -->
     <div class="user-info">
      <div class="user-details">
        <div>
          <h3><span>{{ user.nickname }}</span> 님 은 <span>{{rating.rating_name}}</span> 등급입니다.</h3>
        </div>
      </div>

    <div class="user-balance">
         <div class="balance-item">
            <h4 class="rating_name">예치금</h4>
            <p><span>{{ user.savedMoney }}</span>원</p>
        </div> 
       
        <div class="balance-item">
            <h4>적립금</h4>
            <p class="ratingPoint"><span>{{ user.ratingPoint }}</span>원</p>
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

            dummy : {userId : 102},
            user:{}, // 유저 데이터를 받아올수있도록 data 에 작성 1월5일 동진
            rating:{},
        };
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
        
    }
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
  padding: 50px;
  border-radius: 8px;
  font-size: calc(12px + 0.5vw); 
  gap: 20px;
  margin: 50px 0 50px 0;
  background-color: rgb(254, 245, 231);
}

.user-details,
.user-balance {
  flex: 1; 
  text-align: center; 
}

.user-details {
  flex-direction: column;
}

.user-details div {
  gap: 10px; 
}

.user-details h3 {
  margin: 0; 
  line-height: 1.2; 
  font-size: 1.1em;
}

.user-details h3 span {
  font-weight: 700;
  color: black;
}

.edit-btn {
  color: rgb(255, 255, 255);
  background-color:rgb(120, 85, 50) ;
  padding: 6px 10px; 
  border: none;
  border-radius: 4px;
  font-size: calc(10px + 0.3vw);
  margin-top: 20px; 
  display: inline-block; 
  height: auto; 
}

.user-balance {
  display: flex;
  justify-content: center;
  gap: 10%;
}

.balance-item {
  display: flex; 
  flex-direction: column;
  align-items: center;
  gap:50px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
}

.balance-item h4 {
  margin: 0; 
  font-size: 1rem;
}


.balance-item p {
  margin: 0; 
  text-align: right;
  font-weight: 700;
}

.balance-item p span {
  color: rgb(80,80,80);
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
    padding: 30px 30px;
    background-color: rgb(254,245,231);
    border-radius: 10px;
    
}

.order-list-ul li {
    list-style: none;
    padding: 10px;
    background-color: rgb(120,85,50);
    
}

.order-list-ul li a {
    font-size: 1rem;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: #fff
}

.order-list-com {
    margin-top: 50px;
}



</style>

