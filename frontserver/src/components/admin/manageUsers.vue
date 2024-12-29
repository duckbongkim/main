<template>
<div>
    <h1>사용자 관리</h1>
    <div class='manage-users-container'>
        <table class="table">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>이메일</th>
                    <th>비밀번호</th>
                    <th>이름</th>
                    <th>생년월일</th>
                    <th>닉네임</th>
                    <th>전화번호</th>
                    <th>주소</th>
                    <th>우편번호</th>
                    <th>상세주소</th>
                    <th>계정등급 포인트</th>
                    <th>계정등급 아이디</th>
                    <th>적립금</th>
                    <th>가입일</th>
                    <th>탈퇴예정일</th>
                    <th>관리자 여부</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.password}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.birth}}</td>
                    <td>{{user.nickname}}</td>
                    <td>{{user.phone_number}}</td>
                    <td>{{user.address}}</td>
                    <td>{{user.addressNumber}}</td>
                    <td>{{user.addressDetail}}</td>
                    <td>{{user.ratingPoint}}</td>
                    <td>{{user.rating_id}}</td>
                    <td>{{user.savedMoney}}</td>
                    <td>{{user.created_at}}</td>
                    <td>{{user.delete_time}}</td>
                    <td>{{user.super_admin ? '관리자' : '사용자'}}</td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">수정</button></td>
                    <td><button class="btn btn-danger">삭제</button></td>
                </tr>
            </tbody>
        </table>
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
            users:[],
           

        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getUsers();
    },
    unmounted(){},
    methods:{
        async getUsers(){
            try{
                const response = await axios.get('http://localhost:3000/admin/users');
                this.users = response.data;
                console.log(this.users);
            }
            catch(error){
                alert('사용자 목록을 불러오는데 실패했습니다.');
                console.log("사용자 목록을 불러오는데 실패했습니다.",error);
            }
        }
    },
    watch:{}
}
</script>

<style scoped>
.manage-users-container{
    margin-top: 20px;
    margin-left:250px;
}

.btn {
    padding: 3px 8px;  /* 버튼의 내부 여백을 줄임 */
    font-size: 0.8rem; /* 글자 크기를 줄임 */
}
</style>
