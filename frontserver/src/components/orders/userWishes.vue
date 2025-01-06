<template>
    <div>


        <div class="wish-content">
            <h1>찜 목록</h1>
            <table class="table wish-table">
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품이름</th>
                        <th>가격</th>
                        <th>장바구니 추가</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in wishedProducts" :key="product.id">
                        <td><img :src="product.product_image" class="product-img"></td>
                        <td>{{product.product_name}}</td>
                        <td>{{product.product_price}}원</td>
                        <td><button @click="addCart(product)">장바구니 추가</button></td>
                        <td><button @click="deleteProduct(product)">삭제</button></td>
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

        // 위시리스트 불러오기 (R)
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

        //위시리스트에서 제품 삭제 (D)
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
        },

        // 위시리스트 제품 장바구니에 추가하기 1/6
        async addCart(product){
            try{
                // accountid, productid 보내주기
                this.userid = this.$route.params.userId;
                const userOrder = {
                    userid,
                    product_id : product.id,
                }
                await axios.post(`http://localhost:3000/carts/`, userOrder);

                // 장바구니 갈래?
                const goToCart = confirm("장바구니로 이동하실래요?");
                if(goToCart) {
                    this.$router.push('/cart');
                }else{
                    aleart("상품이 장바구니에 추가됐다.");
                }

            }catch(err){
                alert("장바구니 추가 실패");
                console.error(err)
            }
        }
    }
}

</script>

<style scoped>
.wish-content {
    margin-top: 100px;
}

.wish-table {
    margin-top: 100px;
    width: 100%; 
    border-collapse: collapse;
    text-align: center;
}



.wish-table th{
    text-align: center;
    vertical-align: middle;
    padding: 10px;
    background-color: #f5f5f5; 
    font-weight: bold;
    padding: 10px;
}

.wish-table td {
    text-align: center;
    vertical-align: middle;
    font-weight: 500;
    font-size: 1.4em;
    padding: 20px 0;
}



.product-img {
    max-width: 100px; 
    max-height: 100px; 
    object-fit: contain; 
    display: block;
    margin: 0 auto; 
   
}


</style>
