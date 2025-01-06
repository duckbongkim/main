const Replies = require('../../models/model_replies');
const Accounts = require('../../models/model_accounts');

exports.addReply = async (req,res,next)=>{
    try{
        const post_id = req.params.id;
        let newReply = req.body;
        if(newReply.reply_reply_id){
            newReply.reply_content = newReply.reply_reply_content;
        }
        const account_email = req.user.email;
        const account = await Accounts.findOne({where:{email:account_email}});
        const account_id = account.id;
        newReply.account_id = account_id;
        newReply.post_id = post_id;
        newReply.created_at = new Date();
        newReply.updated_at = new Date();
        const reply = await Replies.create(newReply);
        res.status(200).json(reply);
    }catch(error){
        console.error(error);
        next(error);
    }
}

exports.deleteReply = async (req,res,next)=>{
    try{
        const reply_id = req.params.reply_id;
        await Replies.destroy({where:{id:reply_id}});
        await Replies.destroy({where:{reply_reply_id:reply_id}});
        res.status(200).json({message:"댓글 삭제 완료"});
    }catch(error){
        console.error(error);
        next(error);
    }
}