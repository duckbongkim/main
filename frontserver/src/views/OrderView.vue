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
                <a @click="goWish(user.id)"> 찜 리스트 </a>
            </li>
            <li>
                <a @click="goCart(user.id)"> 장바구니 </a>
            </li>
            <li>
                <a @click="orderBefore(user.id)"> 주문목록 </a>
            </li>
            <li>
                <a @click="orderNow(user.id)"> 주문창(작업중) </a>
            </li>
            <li>
                <a @click="goRefund()">취소/환불 목록</a>
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
            user:{}, //  250108 누리) getUserProfile()에서 사용하는 변수로 변경. <= 이전 : 250105 동진)유저 데이터를 받아올수있도록 data 에 작성
            rating:{},
        };

    },
    setup(){},
    created(){
      //this.getUserData(); // getuserdata 를 마운트에 작성 1월 6일 동진
      this.getUserProfile() // 250108 누리) router_profile 에서 userdata 받아오기로 변경
      this.getRating();
    },
    mounted(){},
    unmounted(){},
    methods:{

        

        goWish(userId){
            this.$router.push(`/wish/${userId}`)
        },
        goCart(userId){
            this.$router.push(`/cart/${userId}`)
        },
        orderBefore(userId){
            this.$router.push(`/order/${userId}`)
        },
        orderNow(userId){
            this.$router.push(`/finalOrder/${userId}`)
        },

      // 마이페이지에서 유저 정보를 받아오는 get 작성 1월5일 동진
      // async getUserData(){
      //   try {
      //     const res = await axios.get('http://localhost:3000/orders',{withCredentials: true})
      //     this.user = res.data
      //     console.log('user',res)
      //   }catch(err){
      //     console.error(err)
      //   }
      // },


      
      // GET user profile / 250108 누리) router_profile에서 user data 받아오기로 변경
      async getUserProfile(){
        try{
            const response = await axios.get(`http://localhost:3000/profile/`, {withCredentials:true}); 
            //알아서 req.user.email 조회해서 유저 data 쏴주는 controller_profile
            //쿠키세션 쓸때는 무조건 {withCredentials:true} 써줘야됨
            this.user = response.data
            //console.log(`################userInfo${JSON.stringify(this.user)}`);
        }catch(err){
            console.error(err);
        }
      },  

      
      // 유저의 레이팅 등급을 받아오는 get 작성 1월 5일 동진
      // 
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
  background-color: rgb(249, 249, 249);
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    padding: 30px 30px;
    background-color: rgb(249,249,249);
    border-radius: 10px;
    gap: 10px;
    
}

.order-list-ul li {
    list-style: none;
    padding: 10px;
    background-color: rgb(254,245,231);
    border-radius: 10px;
}

.order-list-ul li a {
    font-size: 1rem;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: #000;
}

.order-list-com {
    margin-top: 50px;
}



</style>

