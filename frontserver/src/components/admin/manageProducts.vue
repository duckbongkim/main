<template>
<div>
    <div class=header-container>
        <h1>Manage Products</h1>
        <button class="btn btn-primary" @click="goToMenu('/admin/addProduct')">상품 추가</button>
    </div>
    <div class='manage-users-container'>
        <table class="table">
            <thead>
                <tr>
                    <th>상품 번호</th>
                    <th>상품 이름</th>
                    <th>가격</th>
                    <th>상품 설명</th>
                    <th>상품 설명 이미지</th>
                    <th>재고</th>
                    <th>상품 이미지</th>
                    <th>주종</th>
                    <th>상품 종류</th>
                    <th>원산지id</th>
                    <th>공급처id</th>
                    <th>생성일</th>
                    <th>수정일</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{product.id}}</td>
                    <td>{{product.product_name}}</td>
                    <td>{{product.product_price}}</td>
                    <td>{{product.product_description}}</td>
                    <td><img :src="product.product_description_img" class="table-image" alt="상품 설명 이미지"></td>
                    <td>{{product.product_stock}}</td>
                    <td><img :src="product.product_image" class="table-image" alt="상품 이미지"></td>
                    <td>{{product.drink_type}}</td>
                    <td>{{product.product_kind}}</td>
                    <td>{{product.product_location_id}}</td>
                    <td>{{product.supply_factory_id}}</td>
                    <td>{{product.created_at}}</td>
                    <td>{{product.updated_at}}</td>
                    <td><button type="button" class="btn btn-primary" @click="modifyProduct(product.id)">수정</button></td>
                    <td><button class="btn btn-danger" @click="deleteProduct(product)">삭제</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    

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
            products:[],
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getProducts();
    },
    unmounted(){},
    methods:{
        goToMenu(path){
                this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
        },
        async getProducts(){
            try{
                const response = await axios.get('http://localhost:3000/admin/products');
                this.products = response.data;
            }
            catch(error){
                alert('상품 목록을 불러오는데 실패했습니다.');
                console.log("상품 목록을 불러오는데 실패했습니다.",error);
            }
        },
        modifyProduct(productID){
            this.goToMenu(`/admin/ModifyProduct/${productID}`);
        },
        async deleteProduct(product){
            try{
                const response = await axios.delete(`http://localhost:3000/admin/products/${product.id}`);
                if (response.status === 200) {
                    this.products = this.products.filter(p => p.id !== product.id);
                }
                console.log(response);
            }
            catch(error){
                alert('상품 삭제에 실패했습니다.');
                console.log("상품 삭제에 실패했습니다.",error);
            }
        }
    },
    watch:{}
}
</script>

<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header-container h1 {
    margin: 0;
}

.btn {
    padding: 3px 8px;  /* 버튼의 내부 여백을 줄임 */
    font-size: 0.8rem; /* 글자 크기를 줄임 */
}

.modal-body form {
    text-align: left;
}

.table-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
}
</style>
