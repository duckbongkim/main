<template>
<div class="container" style="margin-top: 20vh">
    <h2 class="mb-4 text-center">사용자 정보 수정</h2>
    <div class="row justify-content-center">
        <div class="col-md-6">
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
                    <input type="tel" v-phone_format class="form-control" id="account_phone_number" v-model="modifyUser.phone_number" required>
                </div>
                <div class="mb-3">
                    <label for="account_address" class="form-label">주소</label>
                    <div class="input-group mb-2">
                        <input type="text" class="form-control" id="account_addressNumber" v-model="modifyUser.addressNumber" placeholder="우편번호" readonly required>
                        <button type="button" class="btn btn-secondary" @click="execDaumPostcode" id="address-search">주소 검색</button>
                    </div>
                    <input type="text" class="form-control mb-2" id="account_address" v-model="modifyUser.address" placeholder="기본주소" readonly required>
                    <input type="text" class="form-control" id="account_addressDetail" v-model="modifyUser.addressDetail" placeholder="상세주소를 입력해주세요" required>
                </div>
                <div class="mt-4">
                    <button type="submit" class="btn btn-primary me-2">저장</button>
                    <button v-if="!checkDropOut" type="button" class="btn btn-danger me-2" @click="deleteUser">회원탈퇴</button>
                    <button v-else type="button" class="btn btn-danger me-2" @click="cancleDropOut">회원탈퇴 취소</button>
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
            },
        },
        phone_format: {
            mounted(el) {
                el.addEventListener('input', () => {
                    // 숫자만 추출
                    let number = el.value.replace(/[^0-9]/g, "");
                    
                    // 길이에 따라 하이픈 추가
                    if (number.length > 3 && number.length <= 7) {
                        number = number.slice(0, 3) + "-" + number.slice(3);
                    } else if (number.length > 7) {
                        number = number.slice(0, 3) + "-" + number.slice(3, 7) + "-" + number.slice(7, 11);
                    }
                    
                    // 입력 값 업데이트
                    el.value = number;

                    // 유효성 검사
                    const phonePattern = /^010-\d{4}-\d{4}$/;
                    if (!phonePattern.test(el.value)) {
                        el.classList.add('is-invalid');
                        el.setCustomValidity('올바른 핸드폰 번호 형식을 입력하세요. (예: 010-1234-5678)');
                    } else {
                        el.classList.remove('is-invalid');
                        el.classList.add('is-valid');
                        el.setCustomValidity('');
                    }
                    el.reportValidity();
                });
            }
        },
        
    },
    data(){
        return{
            user:{},
            modifyUser: {},
            passwordConfirm: '',
            newPassword: '',
            checkDropOut:false    
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
                if(this.user.delete_time){
                    this.checkDropOut = true;
                }
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
                if(!this.modifyUser.addressNumber || !this.modifyUser.address || !this.modifyUser.addressDetail){
                    alert('주소를 입력해주세요.');
                    this.$nextTick(() => {
                        document.getElementById('address-search').focus();
                    });
                    return;
                }
                const response = await axios.patch(`http://localhost:3000/profile/modifyUser`,this.modifyUser,{withCredentials:true});
                if(response.status === 200){
                    alert('사용자 정보가 수정되었습니다.');
                    this.$router.replace('/mypage');
                }
            }catch(err){
                if(err.response.status === 400){
                    alert(err.response.data.message);
                }
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
         },
         async deleteUser() {
            if (confirm('정말로 탈퇴하시겠습니까? 14일 뒤에 회원 정보가 삭제됩니다. (탈퇴 취소는 14일 내에 현재 페이지에서 진행이 가능합니다.)')) {
                try {
                    
                    const response = await axios.patch('http://localhost:3000/profile/dropOut',{}, { withCredentials: true });
                    if (response.status === 200) {
                        alert('회원 탈퇴가 완료되었습니다.');
                        await axios.post('http://localhost:3000/auth/logout',{}, { withCredentials: true });
                        this.$router.push('/');
                    }
                } catch (err) {
                    console.error(err);
                    alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
                }
            }
        },
        async cancleDropOut(){
            try{
                const response = await axios.patch('http://localhost:3000/profile/cancleDropOut',{}, { withCredentials: true });
                if(response.status === 200){
                    alert('회원 탈퇴가 취소되었습니다.');
                    this.checkDropOut = false;
                    this.$router.replace('/mypage');
                }
            }catch(err){
                console.error(err);
            }
        },
        //주소 검색 api 메서드
        execDaumPostcode() {
          // Daum Postcode API 호출
          new daum.Postcode({
            oncomplete: (data) => {
              let roadAddr = data.roadAddress; // 도로명 주소
              let extraRoadAddr = ""; // 참고 항목

              // 참고항목 조합 (법정동, 건물명 등)
              if (data.bname && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
              }
              if (data.buildingName && data.apartment === "Y") {
                extraRoadAddr += extraRoadAddr
                  ? `, ${data.buildingName}`
                  : data.buildingName;
              }
              if (extraRoadAddr) {
                extraRoadAddr = ` (${extraRoadAddr})`;
              }

              // 데이터 바인딩
              this.modifyUser.addressNumber = data.zonecode; // 우편번호
              this.modifyUser.address = roadAddr; // 도로명 주소

              // 가이드 메시지 처리
              if (data.autoRoadAddress) {
                this.guide = `예상 도로명 주소: ${data.autoRoadAddress} ${extraRoadAddr}`;
              } else if (data.autoJibunAddress) {
                this.guide = `예상 지번 주소: ${data.autoJibunAddress}`;
              } else {
                this.guide = "";
              }
            },
          }).open(); // 팝업 창 열기
        },
    }
}
</script>
<style scoped>
.input-group .btn {
    min-width: 100px;
}

.form-control[readonly] {
    background-color: #f8f9fa;
    cursor: default;
}

.input-group input[type="text"] {
    max-width: 150px;
}
</style>