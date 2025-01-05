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
                    <tr v-for="product in userWishList" :key="product.id">
                        <td><img :src="product.product_image" class="product-img"></td>
                        <td>{{product.product_name}}</td>
                        <td>{{product.product_price}}원</td>
                        <td><button>장바구니 추가</button></td>
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
            userWishList:[
                {
                    id:1,
                    product_image:'https://dohkqc1a6ll6k.cloudfront.net/eyJidWNrZXQiOiJ3aW5lZ3JhcGgtcHJvZHVjdGlvbiIsImtleSI6IndpbmVzL2JpXzM1OTYucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7ImZpdCI6ImNvbnRhaW4iLCJ3aWR0aCI6MzIwfX19?signature=631f156fdec9aea6f0bcaaa18e1cbfe13f0a24a20308fd1f02f1803ad3069a95',
                    product_name:'돔페리뇽',
                    product_price: 200000,
                },
                {
                    id:2,
                    product_image:'https://dohkqc1a6ll6k.cloudfront.net/eyJidWNrZXQiOiJ3aW5lZ3JhcGgtcHJvZHVjdGlvbiIsImtleSI6IndpbmVzL2JpXzM1OTYucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7ImZpdCI6ImNvbnRhaW4iLCJ3aWR0aCI6MzIwfX19?signature=631f156fdec9aea6f0bcaaa18e1cbfe13f0a24a20308fd1f02f1803ad3069a95',
                    product_name:'돔페리뇽',
                    product_price: 200000,
                },
                {
                    id:3,
                    product_image:'https://dohkqc1a6ll6k.cloudfront.net/eyJidWNrZXQiOiJ3aW5lZ3JhcGgtcHJvZHVjdGlvbiIsImtleSI6IndpbmVzL2JpXzM1OTYucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7ImZpdCI6ImNvbnRhaW4iLCJ3aWR0aCI6MzIwfX19?signature=631f156fdec9aea6f0bcaaa18e1cbfe13f0a24a20308fd1f02f1803ad3069a95',
                    product_name:'돔페리뇽',
                    product_price: 200000,
                },
                {
                    id:4,
                    product_image:'https://dohkqc1a6ll6k.cloudfront.net/eyJidWNrZXQiOiJ3aW5lZ3JhcGgtcHJvZHVjdGlvbiIsImtleSI6IndpbmVzL2JpXzM1OTYucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7ImZpdCI6ImNvbnRhaW4iLCJ3aWR0aCI6MzIwfX19?signature=631f156fdec9aea6f0bcaaa18e1cbfe13f0a24a20308fd1f02f1803ad3069a95',
                    product_name:'돔페리뇽',
                    product_price: 200000,
                },
            ],
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
                console.log(`################프론트userId:${userId}`);
                // 로그인된 유저가 가지고있는 찜 리스트만 불러온다. 
                const response = await axios.get(`http://localhost:3000/orders/wish/${userId}`); 
                                                                        // get 요청보낼때는 data 말고 params로 보내자
                this.userWishList = response.data;
            } catch(err){
                console.error(err);
            }
        },

        async deleteProduct(product) {
            try{
                const response = await axios.delete(`http://localhost:3000/orders/wish/${product.id}`)
                if (response.status === 200) {
                    // 삭제에 성공하면 위시리스트 다시 받아오지 말고 그냥 기존의 위시리스트에서 삭제항목만 빼고 보여준다.
                    this.userWishList = this.userWishList.filter(w => w.id !== product.id);
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
