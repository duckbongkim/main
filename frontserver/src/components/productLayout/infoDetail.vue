<template>
<div>
    <div class="product-info">
        <img :src="selectedProduct.product_image" class="detail-img">
    </div>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            selectedProduct:{
                product_image:'/detail.jpg'
            },
            
        };
    },
    setup(){},
    created(){
        // this.getProductsDetail();
    },
    mounted(){},
    unmounted(){},
    methods:{

        async getProductsDetail() {
            try {
                const response = await axios.get(`http://localhost:3000/products/${product_id}`);
                this.selectedProduct = response.data ; 
            }catch(err) {
                console.error(err);
            }
        },

    }
}
</script>

<style scoped>

.product-info {
    margin: 50px 0;
}

    .info-detail{
        height: 200px;
        width: 100%;
        background: yellow;
    }
</style>

<style scoped>
.detail-img {
    width: 35%;
    height: auto;
}
</style>