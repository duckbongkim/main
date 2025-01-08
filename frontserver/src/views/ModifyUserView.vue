<template>
<div class="container mt-4">
    <h2 class="mb-4">사용자 정보 수정</h2>
    <div class="row">
        <div class="col-md-8">
            <form @submit.prevent="submitModifyPassword">
                <div class="mb-3">
                    <label for="password">비밀번호(필수)</label>
                    <input type="password" v-model="newPassword" v-password_format class="form-control" id="password" required>
                </div>
                <div class="mb-3">
                    <label for="passwordConfirm">비밀번호 확인(필수)</label>
                    <input type="password" v-model="passwordConfirm" class="form-control" :class="{ 'is-invalid': !passwordMatch && passwordConfirm, 'is-valid': passwordMatch && passwordConfirm }" id="passwordConfirm" required>
                </div>
                <button type="submit" class="btn btn-primary me-2">비밀번호 변경</button>
                <button type="button" class="btn btn-secondary" @click="$router.go(-1)">취소</button>
            </form>
            <form @submit.prevent="submitModifyUser">
                <div class="mb-3">
                    <label for="account_name" class="form-label">name</label>
                    <input type="text" class="form-control" id="account_name" v-model="modifyUser.name" required>
                </div>
                <div class="mb-3">
                    성인인증 들어갈 자리(생년월일 받을 것)
                </div>
                <div class="mb-3">
                    <label for="account_nickname" class="form-label">nickname</label>
                    <input type="text" class="form-control" id="account_nickname" v-model="modifyUser.nickname" required>
                </div>
                <div class="mb-3">
                    <label for="account_phone_number" class="form-label">phone_number</label>
                    <input type="text" class="form-control" id="account_phone_number" v-model="modifyUser.phone_number" required>
                </div>
                <div class="mb-3">
                    <label for="account_address" class="form-label">address</label>
                    <input type="text" class="form-control" id="account_address" v-model="modifyUser.address" required>
                </div>
                <div class="mb-3">
                    <label for="account_addressNumber" class="form-label">addressNumber</label>
                    <input type="text" class="form-control" id="account_addressNumber" v-model="modifyUser.addressNumber" required>
                </div>
                <div class="mb-3">
                    <label for="account_addressDetail" class="form-label">addressDetail</label>
                    <input type="text" class="form-control" id="account_addressDetail" v-model="modifyUser.addressDetail" required>
                </div>
                <div class="mt-4">
                    <button type="submit" class="btn btn-primary me-2">저장</button>
                    <button type="button" class="btn btn-secondary" @click="$router.go(-1)">취소</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'

export default{ 
    name:'ModifyUserView',
    components:{},
    computed:{
        passwordMatch() {
            return this.newPassword && this.passwordConfirm && this.newPassword === this.passwordConfirm;
        }
    },
    directives:{
        password_format:{
            mounted(el) {
                el.addEventListener('input', () => {
                    // 비밀번호는 12-16자리, 특수문자 최소 1개 포함
                    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,16}$/;
                    if (!passwordPattern.test(el.value)) {
                        el.classList.add('is-invalid');
                        el.setCustomValidity('비밀번호는 12자리 이상 16자리 이하이어야 하며, 특수문자를 최소 1회 이상 포함해야 합니다.');
                    } else {
                        el.classList.remove('is-invalid');
                        el.classList.add('is-valid');
                        el.setCustomValidity('');
                    }
                    el.reportValidity(); // 유효성 메시지를 즉시 표시
                });
            }
        }
    },
    data(){
        return{
            user:{},
            modifyUser: {},
            passwordConfirm: '',
            newPassword: '',    
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
                const res = await axios.get(`http://localhost:3000/profile`,{withCredentials:true});
                this.user = res.data;
                this.modifyUser = {
                    id: this.user.id,
                    name: this.user.name,
                    nickname: this.user.nickname,
                    phone_number: this.user.phone_number,
                    address: this.user.address,
                    addressNumber: this.user.addressNumber,
                    addressDetail: this.user.addressDetail
                };
            }catch(err){
                if (err.status===403) {
                alert('로그인이 필요함');
                this.$router.push(`/login`);
                console.error(err);
                }
            }
         },
         async submitModifyUser(){
            try{
                const response = await axios.patch(`http://localhost:3000/profile/modifyUser`,this.modifyUser,{withCredentials:true});
                if(response.status === 200){
                    alert('사용자 정보가 수정되었습니다.');
                    this.$router.replace('/mypage');
                }
            }catch(err){
                console.error(err);
            }
         },
         async submitModifyPassword(){
            try{
                const response = await axios.patch(`http://localhost:3000/profile/modifyPassword`,{password:this.newPassword},{withCredentials:true});
                if(response.status === 200){
                    alert('비밀번호가 변경되었습니다.');
                    this.$router.replace('/mypage');
                }
            }catch(err){
                console.error(err);
            }
         }
    }
}
</script>