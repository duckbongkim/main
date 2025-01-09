<template>
<div class="container">
    <div class="input-form-backgroud row">
        <div class="input-form col-md-12 mx-auto">
            <h4 class="mb-3">회원가입</h4>
            <form class="validation-form" @submit.prevent="submitCreateAccount">
                
                <div class="mb-3">
                    <label for="email">이메일(필수)</label>
                    <input ref="emailInput" type="email" v-model="createAccountData.email" v-directive="email_format" class="form-control" id="email" placeholder="you@example.com" required>
                </div>
                <div class="mb-3">
                    <label for="password">비밀번호(필수)</label>
                    <input type="password" v-model="createAccountData.password" v-directive="password_format" class="form-control" id="password" required>
                </div>
                <div class="mb-3">
                    <label for="passwordConfirm">비밀번호 확인(필수)</label>
                    <input type="password" v-model="passwordConfirm" class="form-control" :class="{ 'is-invalid': !passwordMatch && passwordConfirm, 'is-valid': passwordMatch && passwordConfirm }" id="passwordConfirm" required>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="name">이름(필수)</label>
                        <input type="text" v-model="createAccountData.name" class="form-control" id="name" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="nickname">닉네임(필수)</label>
                        <input type="text" v-model="createAccountData.nickname" class="form-control" id="nickname" required>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="birth">생년월일(필수)</label>
                    <input type="date" v-model="createAccountData.birth" class="form-control" id="birth" required>
                </div>
                <div class="mb-3">
                    <label for="phone">핸드폰 번호(필수)</label>
                    <input type="tel" v-model="createAccountData.phone_number" v-directive="phone_format" class="form-control" id="phone" placeholder="010-0000-0000" required>
                </div>
                <div class="mb-3">
                    <label for="address">주소(필수)</label>
                    <input type="text" v-model="createAccountData.address" class="form-control" id="address" required>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="addressDetail">상세주소(선택)</label>
                        <input type="text" v-model="createAccountData.addressDetail" class="form-control" id="addressDetail">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="addressNumber">우편번호(선택)</label>
                        <input type="number" v-model="createAccountData.addressNumber" class="form-control" id="addressNumber">
                    </div>
                </div>
                <button class="btn btn-primary btn-lg btn-block" type="submit">가입하기</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default{ 
    name:'',
    components:{},
    computed:{
        passwordMatch() {
            return this.createAccountData.password && this.passwordConfirm && this.createAccountData.password === this.passwordConfirm;
        }
    },
    directives:{
        //입력 양식 제한
        email_format:{
            mounted(el) {
                el.addEventListener('input', () => {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(el.value)) {
                        el.setCustomValidity('올바른 이메일 형식을 입력하세요.');
                    } 
                    else {
                        el.setCustomValidity('');
                    }
                });
            }
        },
        number_format:{
            mounted(el) {
                el.addEventListener('input', () => {
                    // 한국 핸드폰 번호 형식: 010-XXXX-XXXX
                    const phonePattern = /^010-\d{4}-\d{4}$/;
                    el.value = el.value.replace(/[^0-9-]/g, ""); // 숫자와 '-'만 허용
                    if (!phonePattern.test(el.value)) {
                        el.setCustomValidity('올바른 한국 핸드폰 번호 형식을 입력하세요. 예: 010-1234-5678');
                    } else {
                        el.setCustomValidity('');
                    }
                });
            }
        },
        password_format:{
            mounted(el) {
                el.addEventListener('input', () => {
                    // 비밀번호는 12-16자리, 특수문자 최소 1개 포함
                    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,16}$/;
                    if (!passwordPattern.test(el.value)) {
                        el.setCustomValidity('비밀번호는 12자리 이상 16자리 이하이어야 하며, 특수문자를 최소 1회 이상 포함해야 합니다.');
                    } else {
                        el.setCustomValidity('');
                    }
                });
            }
        }
    },
    data(){
        return{
            passwordConfirm: '',
            createAccountData:{
                email: null,
                password: null,
                name: null,
                nickname: null,
                birth: null,
                phone_number: null,
                address: null,
                addressDetail: null,
                addressNumber: null
            }
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        async submitCreateAccount(){
            if(!this.passwordMatch){
                alert('비밀번호가 일치하지 않습니다.');
                document.getElementById('password').focus();
                return;
            }
            try{
                const response = await axios.post('http://localhost:3000/auth/signup',this.createAccountData,{withCredentials:true});
                // 성공 시 알림 표시 후 루트로 이동
                alert('회원가입이 성공적으로 완료되었습니다.');
                this.$router.push('/login');
                
            }catch(error){
                if(error.response.status === 400){
                    alert(error.response.data.message);
                    this.$nextTick(() => {
                      this.$refs.emailInput.focus();
                    });
                }
            }
        }
    },
    watch:{}
}
</script>

<style scoped>
.container {
    max-width: 800px;
}

.input-form {
    max-width: 680px;
    margin-top: 80px;
    padding: 32px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
}

.btn-block {
    width: 100%;
    margin-top: 24px;
}

label {
    margin-bottom: 0.5rem;
}

.is-invalid {
    border-color: #ff8080 !important;
}

.is-valid {
    border-color: #66cc99 !important;
}
</style>
