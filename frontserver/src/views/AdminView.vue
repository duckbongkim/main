<template>
<div>
  <Sidebar />
  <div class="container">
    <router-view />
  </div>

</div>
</template>


<script>
import Sidebar from "@/components/admin/sidebar.vue";
export default{ 
  name:'AdminView',
  components:{
    'Sidebar':Sidebar,
  },
  computed:{},
  data(){
    return{
      
    };
  },
  setup(){},
  created(){},
  mounted(){},
  unmounted(){},
  methods:{},
  watch:{}
}
</script>

<style scoped>
.container{
  margin-left: 250px;
  margin-top: 20px;
}
</style>