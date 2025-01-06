const Postes = require('../../models/model_postes');
const Accounts = require('../../models/model_accounts');
const Replies = require('../../models/model_replies');

//전체 게시글 조회
exports.getPosts = async (req,res,next)=>{
    try{
        const postes = await Postes.findAll();
        res.status(200).json(postes);
    }catch(error){
        console.error(error);
        next(error);
    }
}

//특정 종류의 게시글 조회
exports.getSpecificKindPostList = async (req,res,next)=>{
    try{
        const {post_kind} = req.params;
        const postes = await Postes.findAll({where:{post_kind}});
        res.status(200).json(postes);
    }catch(error){
        console.error(error);
        next(error);
    }
}

//특정 게시글 조회
exports.selectedPost = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const post = await Postes.findOne({where:{id},include:{model:Accounts,attributes:['email','nickname']}});
        res.status(200).json(post);
    }catch(error){
        console.error(error);
        next(error);
    }
}

//특정 유저의 게시글 조회
exports.getSpecificUserPosts = async (req,res,next)=>{
    try{
        const {email} = req.user;
        const user = await Accounts.findOne({where:{email}});
        const userPostes = await Postes.findAll({where:{account_id:user.id}});
        res.status(200).json(userPostes);
    }catch(error){
        console.error(error);
        next(error);
    }
}

//특정 게시글의 댓글 조회
exports.getSpecificPostReplyList = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const replyList = await Replies.findAll({where:{post_id:id},include:{model:Accounts,attributes:['email','nickname']},order:[['created_at','DESC']]});
        res.status(200).json(replyList);
    }catch(error){
        console.error(error);
        next(error);
    }
}

//게시글 수정
exports.modifyPost = async (req,res,next)=>{
    try{
        const requestUserEmail = req.user.email;//요청자
        const writePostUser = await Postes.findOne({where:{id:req.params.id},include:{model:Accounts,attributes:['id','email']}});//작성자
        if(requestUserEmail === writePostUser.Account.email){
            req.body.updated_at = new Date();
            req.body.account_id = writePostUser.Account.id;
            await Postes.update(req.body,{where:{id:req.params.id}});
            res.status(200).json({id:req.params.id});
        }else{
            res.status(403).json({message:"게시글 수정 권한이 없습니다."});
        }
    }catch(error){
        console.error(error);
        next(error);
    }
}

//게시글 추가
exports.addPost = async (req,res,next)=>{
    try{
        const user = await Accounts.findOne({where:{email:req.user.email},attributes:['id']});
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.account_id = user.id;
        console.log(req.body);
        const post = await Postes.create(req.body);
        res.status(200).json({id:post.id});
    }catch(error){
        console.error(error);
        next(error);
    }
}

//특정 게시글 삭제
exports.deletePost = async (req,res,next)=>{
    try{
        const requestUserEmail = req.user.email;//요청자
        const writePostUserEmail = await Postes.findOne({where:{id:req.params.id},include:{model:Accounts,attributes:['email']}});//작성자
        if(requestUserEmail === writePostUserEmail.Account.email){
            await Postes.destroy({where:{id:req.params.id}});
            res.status(200).json({message:"게시글 삭제 완료"});
        }else{
            res.status(403).json({message:"게시글 삭제 권한이 없습니다."});
        }

    }catch(error){
        console.error(error);
        next(error);
    }
}

//게시글 이미지 업로드
exports.uploadPostImage = async (req,res,next)=>{
    try{
        const imageUrl = `http://localhost:3000/post_imgs/${req.file.filename}`;
        res.status(200).json({imageUrl});
    }catch(error){
        console.error(error);
        next(error);
    }
}
