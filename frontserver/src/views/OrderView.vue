<template>
<div>
    <p>마이페이지 - 찜, 주문현황 으로 트리를 변경해야할 것 같다</p>

    <p>변경 전까지는 오더뷰에서 모두 해줄게</p>

    <ul>
        <li>
            <a @click="goToMenu('/wish')"> 찜 </a>
        </li>
        <li>
            <a @click="goToMenu('/cart')"> 장바구니 </a>
        </li>
        <li>
            <a @click="goToMenu('/order')"> 주문 </a>
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
            sampleData:''
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        goToMenu(path){
            this.$router.push({path:path});
        }
    },
}

</script>