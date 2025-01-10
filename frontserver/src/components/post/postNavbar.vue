<template>
    <div>
      <h1>커뮤니티 게시판</h1>
      <div class="top-navbar">
        <ul>
          <li><router-link to="/postlist">전체게시판</router-link></li>
          <li><router-link to="/postlist/free">자유게시판</router-link></li>
          <li><router-link to="/postlist/review">리뷰게시판</router-link></li>
          <li><router-link to="/postlist/inquiry">문의게시판</router-link></li>
          <li><router-link to="/postlist/report">신고게시판</router-link></li>
        </ul>
      </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  };
  </script>
  
  <style scoped>
  .top-navbar ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.top-navbar li {
  font-size: 18px;
}

.top-navbar a {
  text-decoration: none;
  color: #333;
}

.top-navbar a:hover {
  color: #b6cadf;
}

</style>