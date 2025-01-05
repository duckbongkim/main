<template>
<div>
    <p>마이페이지 - 찜, 주문현황 으로 트리를 변경해야할 것 같다</p>

    <p>변경 전까지는 오더뷰에서 모두 해줄게</p>

    <ul>
        <li>
            <a @click="goWish(dummy.userId)"> 찜 </a>
        </li>
        <li>
            <a @click="goCart(dummy.userId)"> 장바구니 </a>
        </li>
        <li>
            <a @click="goOrder(dummy.userId)"> 주문 </a>
        </li>
    </ul>

    <router-view />
    
</div>
</template>


<script>


export default{ 
    name:'OrderView',
    components:{

    },
    data(){
        return{
            dummy : {userId : 23},
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        goWish(userId){
            this.$router.push(`/wish/${userId}`)
        },
        goCart(userId){
            this.$router.push(`/cart/${userId}`)
        },
        goOrder(userId){
            this.$router.push(`/order/${userId}`)
        },
    },
}

</script>