<template>
<div class="container">
  <div class="content-wrapper">
    <h1>최종 주문 페이지</h1>
    <div class="orderAdressInputContainer">
        <form>
            <h2>배송지 정보</h2>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">우편번호</span>
                <input type="text" v-model="zipCode" v-zipcode class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">배송 주소</span>
                <input type="text" v-model="address" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">상세 주소</span>
                <input type="text" v-model="addressDetail" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
        </form>
    </div>
    <div>
        누님이 상품 데이터 뿌릴 곳. 누님 끝나면 누님이 만들어요
    </div>
    <div>
        <button @click="order" class="btn btn-primary">주문하기</button>
    </div>
  </div>
</div>
</template>


<script>
export default{ 
    name:'',
    components:{},
    computed:{},
    directives:{
        zipcode:{//우편번호 입력 제한
            mounted(el) {
                el.addEventListener('input', () => {
                    // 우편번호 형식: 5자리 숫자
                    const zipcodePattern = /^\d{5}$/;
                    // 숫자만 남기고 제거
                    el.value = el.value.replace(/[^0-9]/g, '').slice(0, 5);
                    
                    if (!zipcodePattern.test(el.value)) {
                        el.setCustomValidity('우편번호는 5자리 숫자여야 합니다.');
                    } else {
                        el.setCustomValidity('');
                    }
                });
            }
        }
    },
    data(){
        return{
            orderList:[],
            address:'',
            addressDetail:'',
            zipCode:'',
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{},
    watch:{}
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.content-wrapper {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>