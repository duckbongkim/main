<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="text-center w-100">{{ postkind }} 게시판</h3>
      <router-link to="/post/addPost" class="btn btn-primary btn-sm position-absolute" style="right: 7.5%">
        글쓰기
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-hover w-85 mx-auto">
        <thead class="table-light">
          <tr>
            <th scope="col" width="10%">번호</th>
            <th scope="col" width="40%">제목</th>
            <th scope="col" width="20%">작성일</th>
            <th scope="col" width="20%">수정일</th>
            <th scope="col" width="10%">좋아요</th>
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
            <td>{{ new Date(post.created_at).toLocaleDateString() }}</td>
            <td>{{ new Date(post.updated_at).toLocaleDateString() }}</td>
            <td>{{ post.like_count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
        console.log(response);
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

h3 {
  text-align: center;
  margin: 0;
}

.container {
  position: relative;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
  z-index: 1;
}

.btn-primary:hover {
  background-color: #0056b3;
  transition: background-color 0.2s ease;
}
</style>