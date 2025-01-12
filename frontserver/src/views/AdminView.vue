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
  mounted(){
    
  },
  unmounted(){},
  methods:{
    
  },
  watch:{}
}
</script>

<style scoped>
.container {
  margin-left: 250px;
  margin-top: 90px;
  width: calc(100% - 250px);
  height: calc(100vh - 90px);
  overflow-y: auto;
  padding: 20px;
}
</style>