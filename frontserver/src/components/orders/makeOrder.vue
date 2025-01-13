
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="info in productInfo " :key="info.id">                
                            <td><img :src="info.Product.product_image"></td>
                            <td>{{info.Product.product_name}}</td>
                            <td>{{info.count}}</td>
                            <td>{{info.Product.product_price.toLocaleString()}}</td>
                            <td>{{info.count * info.Product.product_price.toLocaleString()}}</td>
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
            //{"id":8,"count":1,"total_price":2790000,"createdAt":"2025-01-08T04:14:53.000Z","updatedAt":"2025-01-08T04:14:53.000Z","account_id":4,"product_id":4,
            // "Product":{"product_name":"달모어 25년 700ml","product_price":2790000,"product_image":"http://www.kajawine.kr/data/item/4363187205/thumb-TheDalmore25YearsOldbottle_360x480.jpg"}},
            //{"id":10,"count":1,
            //"Product":{"id":10,"product_name":"글렌피딕 30년산","product_price":1100000,"product_description":"글렌피딕의 대표 30년 숙성 제품","product_description_img":null,"product_stock":12,"product_image":"http://www.kajawine.kr/data/item/1219550509/thumb-6riA66CM7ZS865SV30_360x480.jpg","drink_type":"위스키","product_kind":"drink","created_at":"2025-01-07T15:00:35.000Z","updated_at":"2025-01-07T15:00:35.000Z","product_location_id":null,"supply_factory_id":null}}
        };
    },
    setup(){},
    created(){     
    },
    mounted(){
    //// 들어오는 쿼리에 따라 다른 파라메터를 넣어 같은 함수를 실행시키는 코드
        //'productInfoQuery'가 있으면, 문자열'productInfoQuery'를 넣어서 함수 실행
        if(this.$route.query.productInfoQuery){
            this.getProductInfo('productInfoQuery');
        // orderingInfoQuary가 있으면, 문자열 'orderingInfoQuary'를 넣어서 함수 실행
        }else if (this.$route.query.orderingInfoQuary){
            this.getProductInfo('orderingInfoQuary');
        }else {
            console.error("주문할 제품 정보(쿼리)를 받지 못합니다.")
        }


    },
    unmounted(){},
    methods:{
        async getProductInfo(query){
            try{
                if(query === 'productInfoQuery'){
                    this.productInfo = JSON.parse(this.$route.query.productInfoQuery);
                }else if(query === 'orderingInfoQuary') {
                    const InfoFromProductView = this.$route.query.orderingInfoQuary;
                    const response = await axios.get(`http://localhost:3000/orders/order/${InfoFromProductView}`);
                    this.productInfo = [response.data];
                }
            }catch(err){
                console.error(err);
            }
        },
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
