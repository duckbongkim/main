<template>
  <div>
    <h3>{{ postkind }} 게시판</h3>
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
  props: ['post_kind'],
  computed:{
    postkind(){
      const boardNames = {
        free: '자유',
        review: '리뷰',
        inquiry: '문의',
        report: '신고',
      };
      return boardNames[this.post_kind] || '전체' ;
    }
  },
  data(){
    return{
      posts: [],
      
    };

  },
  setup(){},
  created(){
    this.boardList();
  },
  mounted(){
    
  },
  unmounted(){},
  methods:{

    async boardList(){
      const postKind= this.$route.params.post_kind;
      try {
        const response = await axios.get(`http://localhost:3000/post/post_list/${postKind}`);
        this.posts = response.data;
      } catch (error){
        console.error('게시물을 가져오는데 실패했습니다.', error)
      }
    },
  },
  watch:{
    '$route.params.post_kind':'boardList'
  }
} 
</script>

<style scoped>
h1 {
  margin-top: 80px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

router-link {
  text-decoration: none;
  color: #333;
}

router-link:hover {
  color: #007bff;
}

img {
  margin-top: 10px;
}

.create-post-form {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #e5f1e6;
  color: rgb(8, 8, 8);
  border: none;
  cursor: pointer;
}


form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

form div {
  margin-bottom: 10px;
}

form input, form textarea {
  padding: 8px;
  width: 300px;
}

form textarea {
  height: 150px;
}



</style>