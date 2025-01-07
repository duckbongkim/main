<template>
  <div>
    <h3> 전체 게시판</h3>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/post/post_detail/${post.id}`">
          <div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
            <img v-if="post.imageUrl" :src="post.imageUrl" alt="게시글 이미지" width="100" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      posts: [],
      
    };

  },
  setup(){},
  created(){
    this.AllPosts();
  },
  mounted(){
    
  },
  unmounted(){},
  methods:{
    async AllPosts(){
        try {
            const response = await axios.get('http://localhost:3000/post/post_list');
            this.posts = response.data; 
        } catch (error) {
            console.error('전체 게시물을 가져오는데 실패했습니다.', error);
        }
    }
    
  },
  watch:{
    '$route.params.post_kind':'boardList'
  }
} 
</script>

<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
h2 {
  font-size: 1.2rem;
  margin: 0;
}
p {
  font-size: 0.9rem;
}
</style>