<template>
    <div>
        <h1>찜 목록</h1>
        <table>
            <thead>
                <tr>
                    <th>상품 설명 이미지</th>
                    <th>상품이름</th>
                    <th>가격</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in wishedProducts" :key="product.id">
                    <td><img :src="product.product_image"></td>
                    <td>{{product.product_name}}</td>
                    <td>{{product.product_price}}</td>
                    <td><button @click="deleteProduct(product)">삭제</button></td>
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
    data(){
        return{
            wishedProducts:[],
            userid: 0,
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getWishList()
    },
    unmounted(){},
    methods:{
        async getWishList() {
            try{
                //const userId = this.session.userId;
                this.userid = this.$route.params.userId;
                console.log(`################프론트userid:${this.userid}`);
                // 로그인된 유저가 가지고있는 찜 리스트만 불러온다. 
                const response = await axios.get(`http://localhost:3000/orders/wish/${this.userid}`); 
                                                                        // get 요청보낼때는 data 말고 params로 보내자
                this.wishedProducts = response.data;
                console.log(this.wishedProducts)
            } catch(err){
                console.error(err);
            }
        },

        async deleteProduct(product) {
            try{
                const deleteWish = confirm("해당 제품을 찜에서 삭제하실거에요?");
                
                //'취소' 누르면 함수 바로 종료
                if(!deleteWish){return;}
                console.log(`################Product선택된거:${JSON.stringify(product.id)}`);
                const response = await axios.delete(`http://localhost:3000/orders/wish/${product.id}`)

                // 삭제에 성공하면 위시리스트 다시 받아오지 말고 그냥 기존의 위시리스트에서 삭제항목만 빼고 보여준다.       
                if (response.status === 200) {
                    alert("찜에서 삭제되었다");
                    this.wishedProducts = this.wishedProducts.filter(w => w.id !== product.id);
                }
                console.log(response);

            }catch(error){
                alert("찜 삭제 실패");
                console.log("찜 삭제 실패", error);
            }
        }
    }
}

</script>

<style scoped>

</style>
