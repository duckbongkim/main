const Accounts = require('../models/model_accounts');
const Orders = require('../models/model_orders');
const Ratings = require('../models/model_ratings');
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

exports.getOrders = async (req,res,next)=>{
    try{
        const {email} = req.user;
        const userID = await Accounts.findOne({where:{email}});
        const user = await Orders.findAll({where:{account_id:userID.id}, order: [['created_at', 'DESC']]});
        res.status(200).json(user);
    }catch(error){
        console.error(error);
        next(error);
    }
}

