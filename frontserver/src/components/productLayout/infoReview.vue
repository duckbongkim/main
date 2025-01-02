<template>
  <div class="review-section">
    <ul class="review-list">
      <li v-for="(review, index) in reviews" :key="index" class="review-item">
        <div class="review-left">
          <p class="review-text">{{ review.content }}</p>
        </div>
        <div class="review-right">
          <span class="review-user">{{ review.user }}</span>
          <span class="review-date">{{ review.date }}</span>
        </div>
      </li>
    </ul>

    <div class="review-bottom">
      <button class="review-button">상품후기 글쓰기</button>
    </div>
  </div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
           reviews: [
        {
          rating: 1,
          content: "병이 깨져서 왔어요",
          reply: "답변드립니다.",
          user: "aa",
          date: "2024.05.17",
        },
        {
          rating: 5,
          content: "맛있어요",
          reply: null,
          user: "aa",
          date: "2025.04.30",
        },
        {
          rating: 4,
          content: "맛있어요",
          reply: null,
          user: "aa",
          date: "2025.04.30",
        },
        {
          rating: 3,
          content:
            "맛은 괜찮은데 배송이 너무 느려요. 다음엔 빨리 보내주세요.",
          reply: null,
          user: "aa",
          date: "2025.04.29",
        },
        {
          rating: 2,
          content: "병이 깨져서 왔어요",
          reply: null,
          user: "aa",
          date: "2025.04.29",
        },
      ],
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}
</script>

<style scoped>
.review-section {
  margin: 20px auto;
  width: 60%; 
}

.review-bottom {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 30px 0 30px 0;
}

.review-button {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.review-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.review-item {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 20px;
}

.review-left {
}

.review-right {
  text-align: right;
  flex-basis: 200px; 
}



.review-text {
  margin: 5px 0;
  font-size: 14px;
}

.review-reply {
  color: #555;
  font-size: 12px;
  margin-top: 5px;
}

.review-user {
  display: block;
  font-weight: bold;
}

.review-date {
  font-size: 12px;
  color: #999;
}
</style>