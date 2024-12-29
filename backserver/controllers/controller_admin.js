const {sequelize} = require('../models/model_index');
const Accounts = require('../models/model_accounts');
const Ratings = require('../models/model_ratings');


exports.getUsers = async(req,res,next)=>{
    try{
        const users = await Accounts.findAll({
            where:{
                super_admin:false,
            },
            attributes:['id','email','password','name','birth','nickname','phone_number','address','addressNumber','addressDetail','delete_time','ratingPoint','savedMoney','created_at','super_admin','rating_id'],
        });
        res.json(users);
    }
    catch(error){
        console.log("사용자 목록을 불러오는데 실패했습니다.",error);
        next(error);
    }

};