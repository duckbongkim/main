<template>
<div>
    <div>
        <p>{{user.name}}</p>
        <p>{{user.nickname}}</p>
        <p>{{user.email}}</p>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default{ 
    name:'',
    components:{},
    data(){
        return{
            user:null,
        };
    },
    setup(){},
    created(){
        this.getUsers()
    },
    mounted(){},
    unmounted(){},
    methods:{
        async getUsers(){
            try{
                const res = await axios.get(`http://localhost:3000${user_id}`)
                this.user=res.data
            }catch(err){
                console.error(err)
                next(err)
            }
        }
    }
}
</script>