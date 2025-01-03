const Accounts = require('../models/model_accounts');

exports.getProfile = async (req,res,next)=>{
    try{
        const {email} = req.user;
        const user = await Accounts.findOne({where:{email}});
        res.status(200).json(user);
    }catch(error){
        console.error(error);
        next(error);
    }
}