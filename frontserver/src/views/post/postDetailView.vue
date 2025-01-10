<template>
<div class="content-wrapper">
    <!-- Page content-->
    <div class="container" style="margin-top: 20vh;">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                
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
                    <div v-if="user.email === postDetail.Account.email || user.super_admin" class="d-flex gap-2 mb-4 justify-content-end">
                        <button class="btn btn-outline-primary" @click="$router.push(`/post/modifyPost/${postDetail.id}`)">
                            <i class="bi bi-pencil-square me-1"></i>수정
                        </button>
                        <button class="btn btn-outline-danger" @click="deletePost">
                            <i class="bi bi-trash me-1"></i>삭제
                        </button>
                    </div>
                    <!-- 좋아요 버튼 추가 -->
                    <div class="d-flex justify-content-center my-4">
                        <button class="btn btn-outline-primary d-flex align-items-center gap-2" @click="toggleLike">
                            <i class="bi bi-hand-thumbs-up-fill"></i>
                            <span>좋아요 {{ postDetail.like_count }}</span>
                        </button>
                    </div>
                </article>
                <!-- Comments section-->
                <section class="mb-5">
                    <div class="card bg-light">
                        <div class="card-body">
                            <!-- Comment form-->
                            <form class="mb-4" @submit.prevent="addReply(null)">
                                <div class="d-flex gap-2">
                                    <textarea ref="replyText" v-model="sendReply.reply_content" class="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea>
                                    <button type="submit" class="btn btn-primary align-self-stretch">댓글 작성</button>
                                </div>
                            </form> 
                            <!-- Comment with nested comments-->
                            <div v-for="reply, index in replyList.filter(reply => reply.reply_reply_id === null)" :key="reply.id" class="d-flex mb-4">
                                <!-- Parent comment-->
                                <div class="ms-3" style="width: 90%;">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div style="text-align: left;">
                                            <div class="fw-bold">{{ reply.Account.nickname || '익명' }}</div>
                                            <p class="mb-0">{{ reply.reply_content }}</p>
                                            <!-- 좋아요 아이콘 및 수 -->
                                            <button 
                                                class="btn btn-outline-primary btn-sm d-flex align-items-center gap-2" 
                                                @click="addReplyLike(reply.id)">
                                                <i class="bi bi-hand-thumbs-up"></i>
                                                <span>{{ reply.like_count || 0 }}</span>
                                            </button>
                                        </div>
                                        <div v-show="reply.Account.email === user.email || user.super_admin">
                                            <button class="btn btn-sm btn-outline-secondary me-1" data-bs-toggle="modal" data-bs-target="#modifyReplyModal" @click="modifyReply(reply.id)">수정</button>
                                            <button class="btn btn-sm btn-outline-danger" @click="deleteReply(reply.id)">삭제</button>
                                        </div>
                                    </div>
                                
                                
                                    <div class="ms-3">
                                        <!-- 대댓글 버튼 -->
                                        <div class="d-flex">
                                            <i class="fas fa-comments" data-bs-toggle="collapse" :data-bs-parent="replyAccordion" :data-bs-target="'#reply-' + reply.id" aria-expanded="false" aria-controls="reply" style="cursor: pointer; font-size: 1.2em; color: #adb5bd;"></i>
                                        </div>
                                        <div :id="'reply-' + reply.id" class="collapse mt-4" style=" background-color: #f8f9fa; padding: 5px; border-radius: 5px;">
                                            <form class="mb-4" @submit.prevent="addReply(reply.id, index)">
                                                <div class="d-flex gap-2">
                                                    <input type="text" 
                                                        :ref="`replyInput${index}`"
                                                        v-model="replyReplyContents[index]" 
                                                        class="form-control" 
                                                        placeholder="댓글을 입력하세요...">
                                                    <button type="submit" class="btn btn-primary align-self-stretch">댓글 작성</button>
                                                </div>
                                            </form>
                                            <div v-for="re_reply in replyList.filter(rr => rr.reply_reply_id === reply.id)" :key="re_reply.id" class="d-flex" style="width: 90%;">
                                                <div class="d-flex justify-content-between align-items-start w-100">
                                                    <div style="text-align: left;">
                                                        <div class="fw-bold">{{ re_reply.Account.nickname || '익명' }}</div>
                                                        <p class="mb-0">{{ re_reply.reply_content }}</p>
                                                        <!-- 좋아요 아이콘 및 수 -->
                                                        <button 
                                                            class="btn btn-outline-primary btn-sm d-flex align-items-center gap-2" 
                                                            @click="addReplyLike(re_reply.id)">
                                                            <i class="bi bi-hand-thumbs-up"></i>
                                                            <span>{{ re_reply.like_count || 0 }}</span>
                                                        </button>
                                                    </div>
                                                    <div v-show="re_reply.Account.email === user.email || user.super_admin">
                                                        <button class="btn btn-sm btn-outline-secondary me-1" data-bs-toggle="modal" data-bs-target="#modifyReplyModal" @click="modifyReply(re_reply.id)">수정</button>
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
            
        </div>
    </div>

    
    <!-- 댓글 수정 모달 -->
    <!-- Modal -->
    <div class="modal fade" id="modifyReplyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">댓글 수정</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <textarea class="form-control" v-model="modifyReplyContent" rows="3"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="modifyReplySubmit(selectedReplyId)">Modify</button>
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
    computed:{
        addLikeCount(){
            this.postDetail.like_count++;
        },
        updateReplyLikeCount(reply_id){
            return (replyId) => {
            const reply = this.replyList.find(reply => reply.id === replyId);
            if (reply) {
                reply.like_count += 1;
            }
        };
        }
        
    },
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
            replyReplyContents:[],
            user:{
                nickname:'',
                email:''
            },
            sendReply:{
                reply_content:'',
                reply_reply_content:'',
                reply_reply_id:null,
            },
            modifyReplyContent: '',
            selectedReplyId: null,
        };
    },
    setup(){},
    created(){
        this.postId = this.$route.params.id;
        this.getUser();
        
    },
    mounted(){
        this.getReplyList();
        this.getPostDetail();
    },
    unmounted(){},
    methods:{
        async getPostDetail(){
            const response = await axios.get(`http://localhost:3000/post/post_detail/${this.postId}`);
            this.postDetail = response.data;
        },
        initializeReplyReplyContents() {
            const parentReplies = this.replyList.filter(reply => reply.reply_reply_id === null);
            this.replyReplyContents = new Array(parentReplies.length).fill('');
        },
        async getReplyList(){
            const response = await axios.get(`http://localhost:3000/post/reply_list/${this.postId}`);
            this.replyList = response.data;
            this.initializeReplyReplyContents();
            console.log("replyList",this.replyList);
        },
        async getUser(){
            try{
                const res = await axios.get(`http://localhost:3000/profile`,{withCredentials:true});
                this.user = res.data;
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
        async addReply(reply_id, index){
            if(!reply_id){
                if(this.sendReply.reply_content === ''){
                    alert("댓글을 입력해주세요.");
                    this.$nextTick(() => {
                        this.$refs.replyText.focus();
                    });
                    return;
                }
            }
            else{
                if(this.replyReplyContents[index] === ''){
                    alert("댓글을 입력해주세요.");
                    this.$nextTick(() => {
                        const refName = `replyInput${index}`;
                        if (this.$refs[refName]) {
                            this.$refs[refName][0].focus();//:ref=`replyInput${index}`처럼 바인딩 해서 값을 넣은 경우 값이 배열로 들어가기 때문에 확인을 잘 해서 찾아줘야 함. console.log('모든 refs:', this.$refs); 로 확인 가능
                        }
                    });
                    return;
                }
                this.sendReply.reply_reply_id = reply_id;
                this.sendReply.reply_content = this.replyReplyContents[index];
            }
            try{
                const response = await axios.post(`http://localhost:3000/post/reply_add/${this.postId}`,this.sendReply,{withCredentials:true});
                this.sendReply = {
                    reply_content:'',
                    reply_reply_id:null,
                };
                this.getReplyList();
            }catch(error){
                if(error.response.status === 401 || error.response.status === 403){
                    alert("로그인 후 이용해주세요.");
                    if(!reply_id){
                        this.$nextTick(() => {
                            this.$refs[`replyText`].focus();
                        });
                    }
                    else{
                        this.$nextTick(() => {
                            const refName = `replyInput${index}`;
                            if (this.$refs[refName]) {
                                this.$refs[refName][0].focus();
                            }
                        });
                    }
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
        },
        async modifyReply(reply_id){
            this.modifyReplyContent = this.replyList.find(reply => reply.id === reply_id).reply_content;
            this.selectedReplyId = reply_id;
        },
        async modifyReplySubmit(reply_id){
            try{
                await axios.patch(`http://localhost:3000/post/reply_modify/${reply_id}`,{reply_content:this.modifyReplyContent},{withCredentials:true});
                this.getReplyList();
            }catch(error){
                console.log("댓글 수정 실패",error);
            }
        },
        async toggleLike() {
            try {
                const response = await axios.post(`http://localhost:3000/post/post_like/${this.postId}`, {}, {withCredentials: true});
                this.addLikeCount();
            } catch (error) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    alert("로그인 후 이용해주세요.");
                }
                else if(error.response?.status === 400){
                    alert(error.response.data.message);
                }
                console.error("좋아요 처리 실패:", error);
            }
        },
        async addReplyLike(reply_id) {
            try {
                const response = await axios.post(`http://localhost:3000/post/reply_like/${reply_id}`, {}, {withCredentials: true});
                this.updateReplyLikeCount(reply_id);
            } catch (error) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    alert("로그인 후 이용해주세요.");
                } 
                else if(error.response?.status === 400){
                    alert(error.response.data.message);
                }
                else {
                    console.error("댓글 좋아요 처리 실패:", error);
                }
            }
        },
    },
    watch:{}
}
</script>

<style scoped>
.btn-outline-primary.active {
    background-color: #0d6efd;
    color: white;
}

.btn-outline-primary:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
}

.btn-outline-primary:active {
    transform: scale(0.95);
}

/* 댓글 좋아요 버튼에 하단 마진 추가 */
.btn-outline-primary.btn-sm {
    margin: 6px 0 10px 0;
}

.content-wrapper {
    width: 85%;
    margin: 0 auto;
}

.container {
    margin-top: 20vh;
}
</style>