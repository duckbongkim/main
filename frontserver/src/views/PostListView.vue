<template>
    <div>
      
      <Navbar></Navbar> 
  
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/post/postNavbar.vue'; 
  export default {
    components: {
      Navbar,
    },
  };
  </script>
  
  <style scoped>
  
  </style>