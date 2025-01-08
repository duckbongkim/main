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
            <tr v-for="order in paginatedOrders" :key="order.id">
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

    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="currentPage--">이전</a>
            </li>
            <li class="page-item" v-for="page in displayedPages" :key="page" :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="currentPage++">다음</a>
            </li>
        </ul>
    </nav>
</div>
</template>


<script>
import axios from 'axios';
export default{ 
    name:'manageOrders',
    components:{},
    computed:{
        paginatedOrders() {//페이지 별로 나오는 데이터 정해주는 함수
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.orders.slice(start, end);
        },
        totalPages() {//총 페이지 수 정해주는 함수
            return Math.ceil(this.orders.length / this.itemsPerPage);
        },
        displayedPages() {
            const pages = [];
            let start, end;
            
            if (this.totalPages <= 3) {
                // 전체 페이지가 3개 이하인 경우
                start = 1;
                end = this.totalPages;
            } else {
                // 전체 페이지가 3개 ��과인 경우
                if (this.currentPage === 1) {
                    start = 1;
                    end = 3;
                } else if (this.currentPage === this.totalPages) {
                    start = this.totalPages - 2;
                    end = this.totalPages;
                } else {
                    start = this.currentPage - 1;
                    end = this.currentPage + 1;
                }
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
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
                const response = await axios.get('http://localhost:3000/admin/orders',{withCredentials:true});
                this.orders = response.data;
                console.log("주문 목록 응답",response);
            }catch(error){
                if(error.response.status === 402){
                    alert('로그인이 필요합니다.');
                    this.$router.push('/login');
                }
                else if(error.response.status === 403){
                    alert('관리자 권한이 없습니다.');
                    this.$router.push('/');
                }
                else{
                    alert('주문 목록 조회에 실패했습니다. : ',error);
                }
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

.pagination {
    margin-top: 20px;
}

.page-link {
    color: #007bff;
    cursor: pointer;
    transition: all 0.3s ease;
}

.page-link:active {
    background-color: #e3f2fd;
    border-color: #90caf9;
    color: #1976d2;
}

.page-link:focus {
    box-shadow: none;
    outline: none;
}

.page-item.active .page-link {
    background-color: #e3f2fd;
    border-color: #90caf9;
    color: #1976d2;
    font-weight: bold;
}

.page-link:hover {
    background-color: #f5f9ff;
    border-color: #90caf9;
    color: #1976d2;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #f8f9fa;
}
</style>