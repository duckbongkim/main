<template>
    <div>
        <div>
            <h1>주문목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>주문번호</th>
                        <th>상품정보</th>
                        <th>수량</th>
                        <th>상품금액</th>
                        <th>주문상태</th>
                        <th>주문취소</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="info in orderList" :key="info.id" >
                        <td>{{ formatDate(info.created_at) }}</td>
                        <td>{{ info.id }}</td>
                        <td>
                            <img :src="info.Product.product_image" alt="info.Product.product_name">
                            <span>{{ info.Product.product_name }}</span>
                        </td>
                        <td>{{ info.count }}개</td>
                        <td>{{ (info.count * info.Product.product_price).toLocaleString()}}원</td>
                        <td>{{ info.OrderStatus.status }}</td>
                        <td>
                            <!-- 주문상태가 주문접수, 결제 완료, 배송준비중 일 경우에만 '주문취소'버튼 활성화 -->
                            <button v-if="info.status_id === 1 || info.status_id === 2 || info.status_id === 3 "
                                @click="cancelOrder(info)">
                                주문취소
                            </button>
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
            orderList: [],
            //{"id":1,"count":2,"address":"ㅇㄹ","addressNumber":23534,"addressDetail":"ㄴㅇㅀ","orderMessage":"ㅁ오","created_at":"2025-01-12T17:38:22.000Z","updated_at":"2025-01-12T17:38:22.000Z","cancel_date":null,"cancel_reason":null,"final_paid_price":5580000,"account_id":1,"product_id":4,"status_id":1,
            // "Product":{"product_name":"달모어 25년 700ml","product_image":"http://www.kajawine.kr/data/item/4363187205/thumb-TheDalmore25YearsOldbottle_360x480.jpg"},
            // "OrderStatus":{"status":"주문 접수"}}
            userid: 0,
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getOrderList();
    },
    unmounted(){},
    methods:{

        formatDate(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },

        // Order READ
        async getOrderList() {
            try{
                this.userid = this.$route.params.userId;
                const response = await axios.get(`http://localhost:3000/orders/order/${this.userid}`);
                this.orderList = response.data.sort((a, b) => b.id - a.id); // 주문번호순으로 정렬렬
                console.log(`################orderList: ${JSON.stringify(this.orderList)}`);
            }catch(err){
                console.error(err);
            }
        },

        // Order UPDATE
        async cancelOrder(cancelingOrder){
            try{
                const response = await axios.patch(`http://localhost:3000/orders/cancelledOrder/${this.userid}`, {cancelingOrderId : cancelingOrder.id});
                if(response.status === 200) {
                    alert("주문이 취소되었습니다.")
                    this.orderList = this.orderList.filter(order =>  order.id != cancelingOrder.id);
                }
            }catch(err){
                alert("주문이 취소실패패")
                console.error(err);
            }
        }

        
    },
}

</script>

<style scoped>

</style>