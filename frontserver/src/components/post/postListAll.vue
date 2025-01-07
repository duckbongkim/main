<template>
  <div class="post-list">
    <h1>전체 게시판</h1>
    <table class="post-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>이미지</th>
          <th>작성일</th>
          <th>좋아요</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="post.id">
          <td>{{ index + 1 }}</td>
          <td>
            <router-link :to="`/post/post_detail/${post.id}`">{{ post.title }}</router-link>
          </td>
          <td>
            <img v-if="post.post_image" :src="post.post_image" alt="게시글 이미지" class="thumbnail" />
          </td>
          <td>{{ new Date(post.created_at).toLocaleDateString() }}</td>
          <td>{{ post.like_count }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 게시글 세부 정보 보기 -->
    <div v-if="selectedPost" class="post-detail">
      <h2>{{ selectedPost.title }}</h2>
      <img v-if="selectedPost.post_image" :src="selectedPost.post_image" alt="게시글 이미지" class="detail-image" />
      <p>{{ selectedPost.post_content }}</p>
      <p>작성일: {{ new Date(selectedPost.created_at).toLocaleDateString() }}</p>
      <button @click="closeDetail">닫기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [], // 게시글 목록 데이터
      selectedPost: null, // 선택된 게시글 데이터
    };
  },
  async created() {
    await this.fetchPosts();
  },
  methods: {
    // 게시글 목록 가져오기
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/post/post_list');
        this.posts = response.data;
      } catch (error) {
        console.error('게시글 데이터를 가져오는 데 실패했습니다.', error);
      }
    },
    // 게시글 세부 정보 가져오기
    async fetchPostDetail(postId) {
      try {
        const response = await axios.get(`http://localhost:3000/post/post_detail/${postId}`);
        this.selectedPost = response.data;
      } catch (error) {
        console.error('게시글 세부 정보를 가져오는 데 실패했습니다.', error);
      }
    },
    // 세부 정보 보기
    async viewDetail(postId) {
      await this.fetchPostDetail(postId);
    },
    // 세부 정보 닫기
    closeDetail() {
      this.selectedPost = null;
    },
  },
};
</script>

<style scoped>
.post-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.post-table th,
.post-table td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 8px;
}

.thumbnail {
  max-width: 100px;
  height: auto;
}

.post-detail {
  border: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
}

.detail-image {
  max-width: 300px;
  height: auto;
  margin-bottom: 20px;
}
</style>
