<template>
<div>
</div>
</template>
<script>
import axios from 'axios';
export default{ 
    name:'',
    components:{},
    data(){
        return{
            
        };
    },
    setup(){},
    created(){
        
    },
    mounted(){
        this.getProfile();
    },
    unmounted(){},
    methods:{
        async getProfile(){
            try{
                const res =await axios.get('http://localhost:3000/profile',{withCredentials:true});
                console.log(res);
            }catch(error){
                console.error(error);
            }
        }
    }
}
</script>