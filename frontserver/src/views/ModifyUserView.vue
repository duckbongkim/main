<template>
<div>

    <div>
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>닉네임</th>
                    <th>이메일</th>
                    <th>주소</th>
                    <th>상세주소</th>
                    <th>우편번호</th>             
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{user.name}}</td>
                    <td>{{user.nickname}}</td>
                    <td>{{user.address}}</td>
                    <td>{{user.addressDetail}}</td>
                    <td>{{user.addressNumber}}</td>
                </tr>
            </tbody>
            <button>정보 수정</button>
            <button>회원탈퇴</button>
        </table>
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
            user:{ },
        };
    },
    setup(){},
    created(){
        this.getUser()
    },
    mounted(){},
    unmounted(){},
    methods:{
        async getUser(){
            try{
                const res = await axios.get('http://localhost:3000/modify',{withCredentials: true})
                this.user = res.data
                console.log(res)
            }catch(err){
                console.error(err)
            }
        }
        
        
    }
}
</script>