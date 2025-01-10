<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="text-center w-100">전체 게시판</h3>
      <router-link to="/post/addPost" class="btn btn-primary btn-sm position-absolute" style="right: 7.5%">
        글쓰기
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-hover w-85 mx-auto">
        <thead class="table-light">
          <tr>
            <th scope="col" width="10%">번호</th>
            <th scope="col" width="30%">제목</th>
            <th scope="col" width="20%">이미지</th>
            <th scope="col" width="20%">작성일</th>
            <th scope="col" width="20%">내용</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="post.id">
            <td>{{ index + 1 }}</td>
            <td>
              <router-link :to="`/post/post_detail/${post.id}`" class="text-decoration-none text-dark">
                {{ post.title }}
              </router-link>
            </td>
            <td>
              <img v-if="post.imageUrl" :src="post.imageUrl" alt="게시글 이미지" class="thumbnail" />
            </td>
            <td>{{ new Date(post.created_at).toLocaleDateString() }}</td>
            <td>{{ post.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
.w-85 {
  width: 85% !important;
}

.table {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-radius: 8px;
}

.table thead th {
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
  color: #333;
  background-color: #ffffff;
}

.table td {
  border-bottom: 1px solid #eaeaea;
  padding: 1rem;
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: #ffffff;
  transition: all 0.2s ease;
}

.router-link-active {
  color: #333;
}

.thumbnail {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
}

.btn-primary:hover {
  background-color: #0056b3;
  transition: background-color 0.2s ease;
}

h3 {
  text-align: center;
  margin: 0;
}

.container {
  position: relative;
}

.btn-primary {
  z-index: 1;
}
</style>