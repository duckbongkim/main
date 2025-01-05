<template>
<div>

    <div class="oder-list" v-for="order in orderList" :key="order.id">
        <div class="order-item">
            <h4>{{orderList.orderNumber}}</h4>
            <p>20210801-0001</p>
        </div>
    </div>

</div>
</template>
<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            orderList:[],
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}
</script>

<style scoped>
.oder-list{
background: black;
}
</style>