<template>
<div>
    <div class=header-container>
        <h1>Manage Products</h1>
        <button class="btn btn-primary" @click="goToMenu('/admin/addAccount')">상품 추가</button>
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
                    <th>원산지</th>
                    <th>공급처</th>
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
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="modifyProduct(product)">수정</button></td>
                    <td><button class="btn btn-danger" @click="deleteProduct(product)">삭제</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modify Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="account_id" class="form-label">ID</label>
                        <input type="text" class="form-control" id="account_id" aria-describedby="emailHelp" v-model="editingProduct.id">
                    </div>
                    <div class="mb-3">
                        <label for="account_email" class="form-label">상품명</label>
                        <input type="text" class="form-control" id="account_email" aria-describedby="emailHelp" v-model="editingProduct.product_name">
                    </div>
                    <div class="mb-3">
                        <label for="account_password" class="form-label">가격</label>
                        <input type="text" class="form-control" id="account_password" v-model="editingProduct.product_price">
                    </div>
                    <div class="mb-3">
                        <label for="account_name" class="form-label">상품 설명</label>
                        <input type="text" class="form-control" id="account_name" aria-describedby="emailHelp" v-model="editingProduct.product_description">
                    </div>
                    <div class="mb-3">
                        <label for="account_birth" class="form-label">상품 설명 이미지</label>
                        <input type="text" class="form-control" id="account_birth" v-model="editingProduct.product_description_img">
                    </div>
                    <div class="mb-3">
                        <label for="account_nickname" class="form-label">재고</label>
                        <input type="text" class="form-control" id="account_nickname" aria-describedby="emailHelp" v-model="editingProduct.product_stock">
                    </div>
                    <div class="mb-3">
                        <label for="account_phone_number" class="form-label">상품 이미지</label>
                        <input type="text" class="form-control" id="account_phone_number" aria-describedby="emailHelp" v-model="editingProduct.product_image">
                    </div>
                    <div class="mb-3">
                        <label for="account_address" class="form-label">주종</label>
                        <input type="text" class="form-control" id="account_address" aria-describedby="emailHelp" v-model="editingProduct.drink_type">
                    </div>
                    <div class="mb-3">
                        <label for="account_addressNumber" class="form-label">상품 종류</label>
                        <input type="text" class="form-control" id="account_addressNumber" aria-describedby="emailHelp" v-model="editingProduct.product_kind">
                    </div>
                    <div class="mb-3">
                        <label for="account_addressNumber" class="form-label">상성일</label>
                        <input type="text" class="form-control" id="account_addressNumber" aria-describedby="emailHelp" v-model="editingProduct.created_at">
                    </div>
                    <div class="mb-3">
                        <label for="account_addressNumber" class="form-label">  수정일</label>
                        <input type="text" class="form-control" id="account_addressNumber" aria-describedby="emailHelp" v-model="editingProduct.updated_at">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="submitModifyProduct">Submit</button>
            </div>
            </div>
        </div>
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
            editingProduct:{},
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
                this.products = response.data.products;
                this.productLocations = response.data.productLocations;
                this.supplyFactories = response.data.supplyFactories;
            }
            catch(error){
                alert('상품 목록을 불러오는데 실패했습니다.');
                console.log("상품 목록을 불러오는데 실패했습니다.",error);
            }
        },
        modifyProduct(product){
            this.editingProduct = {...product};
        },
        async submitModifyUser(){
            try{
                const productIndex = this.products.findIndex(product => product.id === this.editingProduct.id);
                const response = await axios.patch(`http://localhost:3000/admin/products`,this.editingProduct);
                if (response.status === 200) {
                    this.products[productIndex] = { ...this.editingProduct };
                }
                console.log(response);
            }
            catch(error){
                alert('상품 수정에 실패했습니다.');
                console.log("상품 수정에 실패했습니다.",error);
            }
        },
        async deleteUser(user){
            try{
                const response = await axios.delete(`http://localhost:3000/admin/products/${product.id}`);
                if (response.status === 200) {
                    this.products = this.products.filter(p => p.id !== product.id);
                }
                console.log(response);
            }
            catch(error){
                alert('사용자 삭제에 실패했습니다.');
                console.log("사용자 삭제에 실패했습니다.",error);
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
