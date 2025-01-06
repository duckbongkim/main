<template>
  <div>
    <!-- 이미지 업로드 폼 -->
    <form @submit.prevent="uploadPostImage">
      <div>
        <label for="imageUpload">이미지 업로드:</label>
        <img :src="post.post_image" alt="게시글 이미지" class="mt-2 img-preview">
        <input @change="handleImageUpload" type="file" id="imageUpload" name="image" accept="image/*" />
        <button type="submit" v-if="postImage">이미지 업로드</button>
      </div>
    </form>

    <!-- 게시글 작성 폼 -->
    <form @submit.prevent="handleSubmit">
      <!-- 게시글 종류 선택 -->
      <div>
        <label for="postType">게시글 종류:</label>
        <select v-model="post.post_kind" id="postType" name="postType">
          <option value="entire">전체게시판</option>
          <option value="free">자유게시판</option>
          <option value="review">리뷰게시판</option>
          <option value="inquiry">문의 게시판</option>
          <option value="report">신고 게시판</option>
        </select>
      </div>

      <!-- 게시글 타이틀 입력 -->
      <div>
        <label for="postTitle">제목:</label>
        <input type="text" v-model="post.title" id="postTitle" name="title" />
      </div>

      <!-- 게시글 내용 입력 -->
      <div>
        <label for="postContent">내용:</label>
        <textarea v-model="post.post_content" id="postContent" name="content"></textarea>
      </div>

      <!-- 제출 버튼 -->
      <button type="submit">제출</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddOrModifyPostView',
  components:{},
  computed:{},
  data(){
    return{
      postImage:null,
      isModify:false,
      post:{
        post_image:null,
        post_kind:null,
        title:null,
        post_content:null,
      }
    }
  },
  created(){
    if(this.$route.params.id){
        this.isModify = true;
        const postID = this.$route.params.id;
        axios.get(`http://localhost:3000/post/selectedPost/${postID}`,{withCredentials:true})
        .then(response => {
            console.log(response);
            this.post = response.data;
        })
        .catch(error => {
            console.log("게시글 조회에 실패했습니다.",error);
        });
    }
  },
  methods: {
    handleImageUpload(event) {
      this.postImage = event.target.files[0];
    },
    async uploadPostImage() {
      if (!this.postImage) {
        alert('이미지를 선택해주세요.');
        return;
      }
      try{
        const formData = new FormData();
        formData.append('image',this.postImage);
        const response = await axios.post('http://localhost:3000/post/upload/postImg',formData,{
          headers:{
            'Content-Type':'multipart/form-data',
          },
        },{withCredentials:true});
        this.post.post_image = response.data.imageUrl;

      }
      catch(error){
        console.log("이미지 업로드 실패",error);
      }
      
    },
    async handleSubmit() {
      // 게시글 제출 처리 로직
      try{
        if(this.isModify){
          const response = await axios.patch(`http://localhost:3000/post/modifyPost/${this.post.id}`,this.post,{withCredentials:true});
          console.log("게시글 수정 응답",response);
          this.post = {};
          this.isModify = false;
          this.$router.push(`/post/post_detail/${response.data.id}`);
        }
        else{
          const response = await axios.post('http://localhost:3000/post/addPost',this.post,{withCredentials:true});
          console.log("게시글 제출 응답",response);
          this.post = {};
          this.$router.push(`/post/post_detail/${response.data.id}`);
        }
      }
      catch(error){
        console.log("게시글 제출 실패",error);
      }
      
      
    }
  }
}
</script>

<style scoped>
/* 스타일 추가 */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input[type="text"],
textarea,
select {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>