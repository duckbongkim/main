<template>
  <div class="login-container">
    <div class="login-box">
      <h2>로그인</h2>
      
      

      <!-- 이메일/비밀번호 폼 -->
      <form class="login-form" @submit.prevent="localLogin">
        <div class="form-group">
          <input type="email" placeholder="이메일" class="form-input" v-model="loginFrom.email" required/>
        </div>
        <div class="form-group">
          <input type="password" placeholder="비밀번호" class="form-input" v-model="loginFrom.password" required/>
        </div>
        <button type="submit" class="login-btn">로그인</button>
      </form>

      <!-- 소셜 로그인 버튼 -->
      <div class="social-login">
        <button class="kakao-btn">카카오 로그인</button>
        <button class="naver-btn">네이버 로그인</button>
      </div>

      <!-- 회원가입 링크 -->
      <div class="signup-link">
        <p>아직 계정이 없으신가요? <router-link to="/createAccount">회원가입</router-link></p>
      </div>

      <!-- 로그아웃 버튼 추가 -->
      <button v-if="isLoggedIn" @click="logout" class="logout-btn">로그아웃</button>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default{ 
    name:'',
    components:{},
    computed:{},
    data(){
        return{
            loginFrom:{
                email:'',
                password:'',
            },
            isLoggedIn: false,
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.checkLogin();
    },
    unmounted(){},
    methods:{
        async checkLogin() {
            try {
                const response = await axios.get('http://localhost:3000/auth/check',{withCredentials:true});
                console.log("response",response);
                this.isLoggedIn = response.data.isLoggedIn;
            } catch (error) {
                this.isLoggedIn = false;
            }
        },
        async localLogin(){
            try{
                const response = await axios.post('http://localhost:3000/auth',this.loginFrom,{withCredentials:true});
                if(response.status === 200){
                    alert('로그인 성공');
                    this.checkLogin();
                }
                else if(response.status === 401){
                    alert(response.data.message);
                }
            }catch(error){
                console.error(error);
            }
        },
        async logout() {
            try {
                const response = await axios.post('http://localhost:3000/auth/logout',{},{withCredentials:true});
                console.log("response",response);
                if (response.status === 200) {
                    this.isLoggedIn = false;
                    alert('로그아웃되었습니다');
                    this.$router.push('/login');
                }
            } catch (error) {
                console.error('로그아웃 실패:', error);
            }
        },
    },
    watch:{}
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.login-btn:hover {
  background-color: #45a049;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.kakao-btn {
  width: 100%;
  padding: 12px;
  background-color: #FEE500;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.naver-btn {
  width: 100%;
  padding: 12px;
  background-color: #03C75A;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.signup-link {
  text-align: center;
}

.signup-link a {
  color: #4CAF50;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

.logout-btn {
  width: 100%;
  padding: 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.logout-btn:hover {
  background-color: #d32f2f;
}
</style>

