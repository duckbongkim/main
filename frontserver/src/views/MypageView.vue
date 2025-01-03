<template>
<div>
    <div class="container">

        <section class="top-content"> 
            <div class="div1">
              <p>{{user.nickname}}</p> 
              <span>내 정보 수정</span>
            </div> <!-- 유저 의 닉네님 이메일이 보여주는 구역-->

            <div class="div2">
            <p>등급</p>
            <p>적립금</p>    
            </div> <!-- 유저의 등급과 적립금을 보여주는 구역-->
        </section>

        <section class="middle-content"> <!-- 주문목록 찜목록 이동할수 있는 링크 버튼들  -->
            <div class="middle-div1">
                <p>주문목록</p>
                <p>찜</p>
                <p>내가 쓴 게시글 조회</p>
                <p>최근 본 상품</p>
            </div> 
        </section>

        <section class="middle-content2"> <!--  -->
            <div class="middle-div2"></div>
        </section>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default{ 
    name:'',
    components:{},
    data(){
        return{
            user:{
                nickname:'',
                email:''
                }
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getUser()
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
         }
        }
    }
    
</script>

<style scoped>
.container {
    width: 100%;
    margin: 0 auto;
}

.top-content {
    width: 60%;
    display: flex;
    justify-content: center;
    gap: 5%;
    margin:30px auto 0 auto;
}

.div1 {
    width: 50%;
    height: 100px;
    float: left;
    border-radius: 10px;
   
}
.div2 {
    background-color: yellow;
    width: 50%;
    height: 100px;
    border-radius: 10px;
 
}

.middle-content {
    width: 60%;
    margin: 30px auto 0 auto;
    border-radius: 10px;
}

.middle-div1 {
    height: 150px;
    width: 100%;
    background-color: yellow;
    border-radius: 10px;
}

.middle-content2 {
    width: 60%;
    margin: 30px auto 0 auto;
}

.middle-div2 {
    width: 100%;
    height: 250px;
    background-color: black;
    border-radius: 10px;
}

</style>