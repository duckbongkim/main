<template>
  
  <div class="mypage-container">
    <!-- User Info Section -->
    <div class="user-info">
      <div class="user-details">
        <div>
          <h3>{{ user.nickname }} 님 반갑습니다.</h3>
          <button class="edit-btn">내 정보 수정</button>
        </div>
      </div>

    <div class="user-balance">
        
        <div class="balance-item">
            <h4 class="rating_name">등급</h4>
            <p>{{ rating.rating_name }}</p>
        </div>
        <hr class="balance-line">
        <div class="balance-item">
            <h4>적립금</h4>
            <p class="ratingPoint">{{ user.ratingPoint }}원</p>
        </div>
    </div>
    
    </div>

    <!-- Icon Menu Section -->
    <div class="icon-menu">
      <div class="menu-item" @click="$router.push('/mypage/orderList')">주문/배송</div>
      <div class="menu-item">찜 리스트</div>
      <div class="menu-item" @click="$router.push('/mypage/postList')">내 게시글 보기</div>
      <div class="menu-item">문의 내역</div>
      <div class="menu-item">최근 본 상품</div>
    </div>

    <!-- Recommended Products -->
    <div class="recommend-section">
      <router-view />
    </div>

    <!-- Regular Purchase Section -->
    <div class="regular-purchase">
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default{ 
    name:'',
    components:{
    },
    data(){
        return{
            user:{},
            rating:{},
           
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getUser()
        this.getRating()
    },
    unmounted(){},
    methods:{
         async getUser(){
            try{
                const res = await axios.get(`http://localhost:3000/profile`,{withCredentials:true})
                this.user = res.data
                console.log(res)
            }catch(err){
                if (err.status===403) {
                alert('로그인이 필요함')
                this.$router.push(`/login`)
                console.error(err)
                }  
            }
         },

         async getRating(){
            try{
                const res = await axios.get(`http://localhost:3000/profile/ratings`,{withCredentials:true})
                this.rating = res.data
                this.rating = this.rating.find((rating)=>rating.id === this.user.rating_id)
                console.log('유저 등급',this.rating)
            }catch(err){
                console.error(err)
            }
         },
         
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


.icon-menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  text-align: center;
  font-size: calc(10px + 0.4vw);
}

.menu-item {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
    cursor: pointer;
}


.recommend-section {
  background: yellow;
  padding: 20px;
  border-radius: 8px;
  font-size: calc(11px + 0.5vw); 
  margin: 30px 0 50px 0;
}

.recommend-categories {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.product-slider {
  display: flex;
  gap: 15px;
  overflow-x: auto;
}

.product-card {
  flex: 0 0 auto;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: calc(10px + 0.4vw); 
}


.regular-purchase {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  font-size: calc(11px + 0.5vw); 
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.product-card {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: calc(10px + 0.4vw); 
}
</style>
