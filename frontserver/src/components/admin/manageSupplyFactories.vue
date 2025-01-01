<template>
<div>
    <div class=header-container>
        <h1>Manage Supply Factories</h1>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addFactoryModal">공급처 추가</button>
    </div>
    <div class='manage-users-container'>
        <table class="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>공급처명</th>
                    <th>주소</th>
                    <th>전화번호</th>
                    <th>담당자</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="factory in factories" :key="factory.id">
                    <td>{{factory.id}}</td>
                    <td>{{factory.factory_name}}</td>
                    <td>{{factory.factory_location}}</td>
                    <td>{{factory.factory_call_number}}</td>
                    <td>{{factory.representative}}</td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modifyFactoryModal" @click="modifyFactory(factory)">수정</button></td>
                    <td><button class="btn btn-danger" @click="deleteFactory(factory)">삭제</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <!-- 원산지 수정 모달 -->
    <div class="modal fade" id="modifyFactoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modify Factory</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="factory_name" class="form-label">공급처명</label>
                        <input type="text" class="form-control" id="factory_name" aria-describedby="emailHelp" v-model="editingFactory.factory_name">
                    </div>
                    <div class="mb-3">
                        <label for="factory_location" class="form-label">주소</label>
                        <input type="text" class="form-control" id="factory_location" v-model="editingFactory.factory_location">
                    </div>
                    <div class="mb-3">
                        <label for="factory_call_number" class="form-label">전화번호</label>
                        <input type="text" class="form-control" id="factory_call_number" v-model="editingFactory.factory_call_number">
                    </div>
                    <div class="mb-3">
                        <label for="representative" class="form-label">담당자</label>
                        <input type="text" class="form-control" id="representative" v-model="editingFactory.representative">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="submitModifyFactory">Submit</button>
            </div>
            </div>
        </div>
    </div>

    <!-- 원산지 추가 모달 -->
    <div class="modal fade" id="addFactoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Factory</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="factory_name" class="form-label">공급처명</label>
                        <input type="text" class="form-control" id="factory_name" aria-describedby="emailHelp" v-model="newFactory.factory_name">
                    </div>
                    <div class="mb-3">
                        <label for="factory_location" class="form-label">주소</label>
                        <input type="text" class="form-control" id="factory_location" v-model="newFactory.factory_location">
                    </div>
                    <div class="mb-3">
                        <label for="factory_call_number" class="form-label">전화번호</label>
                        <input type="text" class="form-control" id="factory_call_number" v-model="newFactory.factory_call_number">
                    </div>
                    <div class="mb-3">
                        <label for="representative" class="form-label">담당자</label>
                        <input type="text" class="form-control" id="representative" v-model="newFactory.representative">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="submitAddFactory">Submit</button>
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
            factories:[],
            newFactory:{},
            editingFactory:{},
        };
    },
    setup(){},
    created(){
        
    },
    mounted(){
        this.getSupplyFactories();
    },
    unmounted(){},
    methods:{
        goToMenu(path){
            this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
        },
        async getSupplyFactories(){
            const response = await axios.get('http://localhost:3000/admin/products/supplyFactories');
            this.factories = response.data;
        },
        async modifyFactory(factory){
            this.editingFactory = { ...factory };
        },
        async submitModifyFactory(){
            const response = await axios.patch('http://localhost:3000/admin/modifySupplyFactory',this.editingFactory);
            this.getSupplyFactories();
        },
        async deleteFactory(factory){
            const response = await axios.delete(`http://localhost:3000/admin/deleteSupplyFactory/${factory.id}`);
            this.factories = this.factories.filter(fac => fac.id !== factory.id);
        },
        async submitAddFactory(){
            const response = await axios.post('http://localhost:3000/admin/addSupplyFactory',this.newFactory);
            this.factories.push(response.data);
            this.newFactory = {};
            this.getSupplyFactories();
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
</style>
