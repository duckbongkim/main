<template>
<div>
    <h1>주문 관리</h1>
    <table class="order-table">
        <thead>
            <tr>
                <th>주문 ID</th>
                <th>주문자 아이디</th>
                <th>주문자 이메일</th>
                <th>상품 아이디</th>
                <th>상품명</th>
                <th>수량</th>
                <th>주문지 주소</th>
                <th>주문지 상세주소</th>
                <th>주문 메시지</th>
                <th>주문일자</th>
                <th>수정일자</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.account_id }}</td>
                <td>{{ order.Account.email }}</td>
                <td>{{ order.product_id }}</td>
                <td>{{ order.Product.product_name }}</td>
                <td>{{ order.count }}</td>
                <td>{{ order.address }}</td>
                <td>{{ order.addressDetail }}</td>
                <td>{{ order.orderMessage }}</td>
                <td>{{ new Date(order.created_at).toLocaleString() }}</td>
                <td>{{ new Date(order.updated_at).toLocaleString() }}</td>
            </tr>
        </tbody>
    </table>
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
            orders:[]
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getOrders();
    },
    unmounted(){},
    methods:{
        async getOrders(){
            try{
                const response = await axios.get('http://localhost:3000/admin/orders');
                this.orders = response.data;
                console.log("주문 목록 응답",response);
            }catch(error){
                console.error("주문 목록 조회 오류",error);
            }
        }
    },
    watch:{}
}
</script>

<style scoped>
.order-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.order-table th, .order-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.order-table th {
    background-color: #f4f4f4;
}

.order-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.order-table tr:hover {
    background-color: #f5f5f5;
}
</style>