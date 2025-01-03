const Postes = require('../../models/model_postes');
const Accounts = require('../../models/model_accounts');
exports.getPosts = async (req,res,next)=>{
    try{
        const postes = await Postes.findAll();
        res.status(200).json(postes);
    }catch(error){
        console.error(error);
        next(error);
    }
}

exports.getSpecificUserPosts = async (req,res,next)=>{
    try{
        const {email} = req.user;
        const userID = await Accounts.findOne({where:{email}});
        const userPosts = await Postes.findAll({where:{account_id:userID.id}});
        res.status(200).json(userPosts);
    }catch(error){
        console.error(error);
        next(error);
    }
}