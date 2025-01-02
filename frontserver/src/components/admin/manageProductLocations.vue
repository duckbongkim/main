<template>
<div>
    <div class=header-container>
        <h1>Manage Product Locations</h1>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addLocationModal">원산지 추가</button>
    </div>
    <div class='manage-users-container'>
        <table class="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>나라</th>
                    <th>도시</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="location in locations" :key="location.id">
                    <td>{{location.id}}</td>
                    <td>{{location.country}}</td>
                    <td>{{location.city}}</td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modifyLocationModal" @click="modifyLocation(location)">수정</button></td>
                    <td><button class="btn btn-danger" @click="deleteLocation(location)">삭제</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <!-- 원산지 수정 모달 -->
    <div class="modal fade" id="modifyLocationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modify Location</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="country" class="form-label">나라</label>
                        <input type="text" class="form-control" id="country" aria-describedby="emailHelp" v-model="editingLocation.country">
                    </div>
                    <div class="mb-3">
                        <label for="city" class="form-label">도시</label>
                        <input type="text" class="form-control" id="city" v-model="editingLocation.city">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="submitModifyLocation">Submit</button>
            </div>
            </div>
        </div>
    </div>

    <!-- 원산지 추가 모달 -->
    <div class="modal fade" id="addLocationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Location</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="country" class="form-label">나라</label>
                        <input type="text" class="form-control" id="country" aria-describedby="emailHelp" v-model="newLocation.country">
                    </div>
                    <div class="mb-3">
                        <label for="city" class="form-label">도시</label>
                        <input type="text" class="form-control" id="city" v-model="newLocation.city">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="submitAddLocation">Submit</button>
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
            locations:[],
            newLocation:{},
            editingLocation:{},
        };
    },
    setup(){},
    created(){
        
    },
    mounted(){
        this.getProductLocations();
    },
    unmounted(){},
    methods:{
        goToMenu(path){
            this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
        },
        async getProductLocations(){
            const response = await axios.get('http://localhost:3000/admin/products/locations');
            this.locations = response.data;
        },
        async modifyLocation(location){
            this.editingLocation = { ...location };
        },
        async submitModifyLocation(){
            const response = await axios.patch('http://localhost:3000/admin/modifyProductLocation',this.editingLocation);
            this.getProductLocations();
        },
        async deleteLocation(location){
            const response = await axios.delete(`http://localhost:3000/admin/deleteProductLocation/${location.id}`);
            this.locations = this.locations.filter(loc => loc.id !== location.id);
        },
        async submitAddLocation(){
            const response = await axios.post('http://localhost:3000/admin/addProductLocation',this.newLocation);
            this.locations.push(response.data);
            this.newLocation = {};
            this.getProductLocations();
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
