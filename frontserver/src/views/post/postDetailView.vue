<template>
<div>
    <!-- Page content-->
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-8">
                <!-- Post content-->
                <article>
                    <!-- Post header-->
                    <header class="mb-4">
                        <!-- Post title-->
                        <h1 class="fw-bolder mb-1">{{postDetail.title}}</h1>
                    </header>
                    <!-- Preview image figure-->
                    <figure class="mb-4"><img class="img-fluid rounded" :src="`${postDetail.post_image}`" alt="..." /></figure>
                    <!-- Post content-->
                    <section class="mb-5">
                        <p class="fs-5 mb-4">{{postDetail.post_content}}</p>
                    </section>
                </article>
                <!-- Comments section-->
                <section class="mb-5">
                    <div class="card bg-light">
                        <div class="card-body">
                            <!-- Comment form-->
                            <form class="mb-4"><textarea class="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
                            <!-- Comment with nested comments-->
                            <div v-for="reply in replyList.filter(reply => reply.reply_reply_id === null)" :key="reply.id" class="d-flex mb-4">
                                <!-- Parent comment-->
                                <div class="ms-3">
                                    <div class="fw-bold">{{ reply.Account.nickname || '익명' }}</div>
                                    <p>{{ reply.reply_content }}</p>
                                
                                
                                    <div class="ms-3">
                                        <!-- 대댓글 버튼 -->
                                        <div class="d-flex">
                                            <i class="fas fa-comments" data-bs-toggle="collapse" :data-bs-target="'#reply-' + reply.id" aria-expanded="false" aria-controls="reply" style="cursor: pointer; font-size: 1.2em; color: #adb5bd;"></i>
                                        </div>
                                        <div :id="'reply-' + reply.id" class="collapse mt-4" style=" background-color: #f8f9fa; padding: 5px; border-radius: 5px;">
                                            <div v-for="re_reply in replyList.filter(rr => rr.reply_reply_id === reply.id)" :key="re_reply.id" class="d-flex">
                                                <div class="ms-3">
                                                    <div class="fw-bold">{{re_reply.Account.nickname || '익명'}}</div>
                                                    <p>{{re_reply.reply_content}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <!-- Side widgets-->
            <div class="col-lg-4">
                <div v-if="user.email === postDetail.Account.email" class="card mb-4">
                    <button @click="$router.push(`/post/modifyPost/${postDetail.id}`)">수정</button>
                    <button @click="deletePost">삭제</button>
                </div>
                <!-- Categories widget-->
                <div class="card mb-4">
                    <div class="card-header">Categories</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <ul class="list-unstyled mb-0">
                                    <li><a href="#!">여기</a></li>
                                    <li><a href="#!">에는</a></li>
                                    <li><a href="#!">뭐 넣</a></li>
                                </ul>
                            </div>
                            <div class="col-sm-6">
                                <ul class="list-unstyled mb-0">
                                    <li><a href="#!">지?</a></li>
                                    <li><a href="#!">CSS</a></li>
                                    <li><a href="#!">Tutorials</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Side widget-->
                <div class="card mb-4">
                    <div class="card-header">Side Widget</div>
                    <div class="card-body">뭐..어디에 쓸만한게 있지 않을까?</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import axios from 'axios';
export default{ 
    name:'',
    components:{},
    computed:{},
    data(){
        return{
            postId: null,
            postDetail: {
                title: '',
                post_kind:'',
                post_content: '',
                created_at: '',
                updated_at: '',
                like_count: 0,
                post_kind:'',
                account_id:'',
                Account:{
                    email:''
                }
            },
            replyList:[],
            user:{
                nickname:'',
                email:''
            }
        };
    },
    setup(){},
    created(){
        this.postId = this.$route.params.id;
        this.getUser();
        this.getPostDetail();
    },
    mounted(){
        
        this.getReplyList();
    },
    unmounted(){},
    methods:{
        async getPostDetail(){
            const response = await axios.get(`http://localhost:3000/post/post_detail/${this.postId}`);
            this.postDetail = response.data;
            console.log("postDetail",this.postDetail);
            console.log("postDetail.Account.email",this.postDetail.Account.email);
        },
        async getReplyList(){
            const response = await axios.get(`http://localhost:3000/post/reply_list/${this.postId}`);
            this.replyList = response.data;
            console.log("replyList",this.replyList);
        },
        async getUser(){
            try{
                const res = await axios.get(`http://localhost:3000/profile`,{withCredentials:true});
                this.user = res.data;
                console.log("user",this.user);
                console.log("user.email",this.user.email);
            }catch(err){
                console.log("로그인 전");
            }
         },
        async deletePost() {
            if (confirm("정말로 삭제하시겠습니까?")) {
                try {
                    await axios.delete(`http://localhost:3000/post/delete/${this.postId}`,{withCredentials:true});
                    alert("삭제되었습니다.");
                    this.$router.push('/');
                    // 삭제 후 다른 페이지로 이동하거나 필요한 후속 작업을 수행합니다.
                } catch (error) {
                    console.error("삭제 중 오류 발생:", error);
                    alert("삭제에 실패했습니다.");
                }
            }
        }
    },
    watch:{}
}
</script>