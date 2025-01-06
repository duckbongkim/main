
<template>
    <div class="container">
        <div class="input-form-background row">
            <div class="input-form col-md-12 max-auto">
                <h4>주문창</h4>
                <table>
                    <thead>
                        <tr>
                            <th>상품 이미지</th>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>상품금액</th>
                            <th>합계금액</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in productInfo" :key="product.id">                
                            <td>{{product.product_id}}</td>
                            <td>{{product.product_id}}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{ 
    name:'',
    components:{},
    data(){
        return{
            productInfo :[],
            orderingProducts : [],
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.setInfo();
        this.getOrderingProducts();

    },
    unmounted(){},
    methods:{
        setInfo(){
            const sessionData = sessionStorage.getItem('productInfo');
             console.log(`##############sessionData${sessionData}`)
            if(sessionData){
                this.productInfo = JSON.parse(sessionData) //저장된 문자열을 원래의 객체나 배열 형태로 복원
                //console.log(this.productInfo);
            }
        },
        
        async getOrderingProducts(){
            try{
                const productIds = this.productInfo.map(p => p.product_id);
                console.log(`##############productIds${productIds}`)
                const response = await axios.get(`http://localhost:3000/orders/orderingProducts/${productIds}`,)
                this.orderingProducts = response.data;
                
            }catch(err){
                console.error(err);
            }
        }

    }
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
