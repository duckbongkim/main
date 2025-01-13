<template>
    <div>
        <div>
            <h1>취소/환불</h1>
            <table>
                <thead>
                    <tr>
                        <th>주문취소날짜</th>
                        <th>주문번호</th>
                        <th>상품정보</th>
                        <th>수량</th>
                        <th>상품금액</th>
                        <th>주문상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="info in cancelledList" :key="info.id" >
                        <td>{{ formatDate(info.updated_at) }}</td>
                        <td>{{ info.id }}</td>
                        <td>
                            <img :src="info.Product.product_image" alt="info.Product.product_name">
                            <span>{{ info.Product.product_name }}</span>
                        </td>
                        <td>{{ info.count }}</td>
                        <td>{{ (info.count * info.Product.product_price).toLocaleString()}}</td>
                        <td>{{ info.OrderStatus.status }}</td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default{ 
    name:'',
    components:{},
    data(){
        return{
            cancelledList: [],
            //{"id":1,"count":2,"address":"ㅇㄹ","addressNumber":23534,"addressDetail":"ㄴㅇㅀ","orderMessage":"ㅁ오","created_at":"2025-01-12T17:38:22.000Z","updated_at":"2025-01-12T17:38:22.000Z","cancel_date":null,"cancel_reason":null,"final_paid_price":5580000,"account_id":1,"product_id":4,"status_id":1,
            // "Product":{"product_name":"달모어 25년 700ml","product_image":"http://www.kajawine.kr/data/item/4363187205/thumb-TheDalmore25YearsOldbottle_360x480.jpg"},
            // "OrderStatus":{"status":"주문 접수"}}
            userid: 0,
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getCancelledList();
    },
    unmounted(){},
    methods:{

        formatDate(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },

        // Order READ
        async getCancelledList() {
            try{
                this.userid = this.$route.params.userId;
                const response = await axios.get(`http://localhost:3000/orders/cancelledOrder/${this.userid}`);
                this.cancelledList = response.data //.sort((a, b) => b.id - a.id); // 주문번호순으로 정렬
                this.cancelledList = this.cancelledList.filter(cancel => cancel.OrderStatus.id > 5);
                console.log(`################cancelledList: ${JSON.stringify(this.cancelledList)}`);
            }catch(err){
                console.error(err);
            }
        },

        
    },
}

</script>

<style scoped>

</style>