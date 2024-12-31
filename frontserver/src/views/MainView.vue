<template>
<div>
    <h1>Main View</h1>
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

        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getProducts();
    },
    unmounted(){},
    methods:{
        async getProducts(){
            try{
                const response = await axios.get('http://localhost:3000/');
                this.products = response.data;
                console.log(this.products);
            }
            catch(error){
                alert('상품 목록을 불러오는데 실패했습니다.');
                console.log("상품 목록을 불러오는데 실패했습니다.",error);
            }
        }
    },
    watch:{}
}
</script>