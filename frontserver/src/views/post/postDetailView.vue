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
                            <form class="mb-4" @submit.prevent="addReply(null)">
                                <div class="d-flex gap-2">
                                    <textarea ref="replyTextarea" v-model="sendReply.reply_content" class="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea>
                                    <button type="submit" class="btn btn-primary align-self-stretch">댓글 작성</button>
                                </div>
                            </form>
                            <!-- Comment with nested comments-->
                            <div v-for="reply in replyList.filter(reply => reply.reply_reply_id === null)" :key="reply.id" class="d-flex mb-4">
                                <!-- Parent comment-->
                                <div class="ms-3" style="width: 90%;">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div style="text-align: left;">
                                            <div class="fw-bold">{{ reply.Account.nickname || '익명' }}</div>
                                            <p class="mb-0">{{ reply.reply_content }}</p>
                                        </div>
                                        <div v-show="reply.Account.email === user.email">
                                            <button class="btn btn-sm btn-outline-secondary me-1" @click="modifyReply(reply.id)">수정</button>
                                            <button class="btn btn-sm btn-outline-danger" @click="deleteReply(reply.id)">삭제</button>
                                        </div>
                                    </div>
                                
                                
                                    <div class="ms-3">
                                        <!-- 대댓글 버튼 -->
                                        <div class="d-flex">
                                            <i class="fas fa-comments" data-bs-toggle="collapse" :data-bs-target="'#reply-' + reply.id" aria-expanded="false" aria-controls="reply" style="cursor: pointer; font-size: 1.2em; color: #adb5bd;"></i>
                                        </div>
                                        <div :id="'reply-' + reply.id" class="collapse mt-4" style=" background-color: #f8f9fa; padding: 5px; border-radius: 5px;">
                                            <form class="mb-4" @submit.prevent="addReply(reply.id)">
                                                <div class="d-flex gap-2">
                                                    <input type="text" ref="replyreplyTextarea" v-model="sendReply.reply_reply_content" class="form-control" placeholder="댓글을 입력하세요...">
                                                    <button type="submit" class="btn btn-primary align-self-stretch">댓글 작성</button>
                                                </div>
                                            </form>
                                            <div v-for="re_reply in replyList.filter(rr => rr.reply_reply_id === reply.id)" :key="re_reply.id" class="d-flex" style="width: 90%;">
                                                <div class="d-flex justify-content-between align-items-start w-100">
                                                    <div style="text-align: left;">
                                                        <div class="fw-bold">{{ re_reply.Account.nickname || '익명' }}</div>
                                                        <p class="mb-0">{{ re_reply.reply_content }}</p>
                                                    </div>
                                                    <div v-show="re_reply.Account.email === user.email">
                                                        <button class="btn btn-sm btn-outline-secondary me-1" @click="modifyReply(re_reply.id)">수정</button>
                                                        <button class="btn btn-sm btn-outline-danger" @click="deleteReply(re_reply.id)">삭제</button>
                                                    </div>
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
            },
            sendReply:{
                reply_content:'',
                reply_reply_content:'',
                reply_reply_id:null,
            },
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
        },
        async addReply(reply_id){
            console.log("reply_id",reply_id);
            if(this.sendReply.reply_content === '' && this.sendReply.reply_reply_content === ''){
                alert("댓글을 입력해주세요.");
                if(this.sendReply.reply_reply_content === ''){
                    this.$nextTick(() => {
                        this.$refs.replyTextarea.focus();
                    });
                }else{
                    this.$nextTick(() => {
                        this.$refs.replyreplyTextarea.focus();
                    });
                }
                return;
            }
            if(reply_id){
                this.sendReply.reply_reply_id = reply_id;
            }
            try{
                const response = await axios.post(`http://localhost:3000/post/reply_add/${this.postId}`,this.sendReply,{withCredentials:true});
                this.sendReply = {
                    reply_content:'',
                    reply_reply_content:'',
                    reply_reply_id:null,
                };
                this.getReplyList();
            }catch(error){
                if(error.response.status === 401 || error.response.status === 403){
                    alert("로그인 후 이용해주세요.");
                    this.$nextTick(() => {
                        this.$refs.replyTextarea.focus();
                    });
                }
                console.log("댓글 작성 실패",error);
            }
        },
        async deleteReply(reply_id){
            try{
                await axios.delete(`http://localhost:3000/post/reply_delete/${reply_id}`,{withCredentials:true});
                this.getReplyList();
            }catch(error){
                console.log("댓글 삭제 실패",error);
            }
        }
    },
    watch:{}
}
</script>