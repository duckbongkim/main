<template>
  <div>
    <h3>{{ postkind }} 게시판</h3>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/post_detail/${post.id}`">
          <div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
            <img v-if="post.imageUrl" :src="post.imageUrl" alt="게시글 이미지" width="100" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="create-post-form">
      <button @click="toggleCreateForm">글쓰기</button>
      
      <!-- 폼 보이기/숨기기 -->
      <div v-if="isCreateFormVisible">
        <form @submit.prevent="createPost">
          <div>
            <label for="title">제목</label>
            <input v-model="newPost.title" type="text" id="title" required />
          </div>
          <div>
            <label for="content">내용</label>
            <textarea v-model="newPost.content" id="content" required></textarea>
          </div>
          <div>
            <button type="submit">작성하기</button>
            <button type="button" @click="toggleCreateForm">취소</button>
          </div>
        </form>
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
        entire: '전체',
        free: '자유',
        review: '리뷰',
        inquiry: '문의',
        report: '신고',
      };
      return boardNames[this.post_kind] || '게시판' ;
    }
  },
  data(){
    return{
      posts: [],
      searchQuery:'',
      isCreateFormVisible: false,
      newPost:{
        title:'',
        content:'',
      }
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
    toggleCreateForm() {
      this.isCreateFormVisible = !this.isCreateFormVisible;
    },
    createPost() {
      if (this.newPost.title && this.newPost.content) {
        const newPost = {
          id: this.posts.length + 1, 
          title: this.newPost.title,
          content: this.newPost.content,
          postKind: this.post_kind, 
          imageUrl: '', 
        };

        this.posts.push(newPost);
       
        this.newPost.title = '';
        this.newPost.content = '';

        this.isCreateFormVisible = false;
      }
    },
    boardList() {
    const dummyData = [
      { id: 1, title: '1 번째 게시글', content: '이것은 첫 번째 게시글입니다.', postKind: 'free' ,imageUrl: 'https://via.placeholder.com/100' },
      { id: 2, title: '2 번째 게시글', content: '8 번째 게시글 내용입니다.', postKind: 'free', imageUrl: 'https://via.placeholder.com/100' },
      { id: 3, title: '3 번째 게시글', content: '6 번째 게시글 내용입니다.', postKind: 'review', imageUrl: 'https://via.placeholder.com/100' },
      { id: 4, title: '4 번째 게시글', content: '7 번째 게시글 내용입니다.', postKind: 'review', imageUrl: 'https://via.placeholder.com/100' },
      { id: 5, title: '5 번째 게시글', content: '5 번째 게시글 내용입니다.', postKind: 'free', imageUrl: 'https://via.placeholder.com/100' },
      { id: 6, title: '6 번째 게시글', content: '4 번째 게시글 내용입니다.', postKind: 'inquiry', imageUrl: 'https://via.placeholder.com/100' },
      { id: 7, title: '7 번째 게시글', content: '3 번째 게시글 내용입니다.', postKind: 'report', imageUrl: 'https://via.placeholder.com/100' },
      { id: 8, title: '8 번째 게시글', content: '2 번째 게시글 내용입니다.', postKind: 'report', imageUrl: 'https://via.placeholder.com/100' },
      { id: 9, title: '9 번째 게시글', content: '1 번째 게시글 내용입니다.', postKind: 'free', imageUrl: 'https://via.placeholder.com/100' },
    ];
  const postKind = this.$route.params.post_kind;
  this.posts = dummyData.filter(post => post.postKind === postKind);
  },

    
    // async boardList(){
    //   const postKind= this.$route.params.post_kind;
    //   try {
    //     const response = await axios.get(`http://localhost:3000/postlist/${postKind}`);
    //     this.posts = response.data;
    //   } catch (error){
    //     console.error('게시물을 가져오는데 실패했습니다.', error)
    //   }
    // },
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