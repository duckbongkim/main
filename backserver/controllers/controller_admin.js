const {sequelize} = require('../models/model_index');
const Accounts = require('../models/model_accounts');
const Ratings = require('../models/model_ratings');


exports.getUsers = async(req,res,next)=>{
    try{
        let sendDatas = {};
        const users = await Accounts.findAll({
            where:{
                super_admin:false,
            },
            attributes:['id','email','password','name','birth','nickname','phone_number','address','addressNumber','addressDetail','delete_time','ratingPoint','savedMoney','created_at','super_admin','rating_id'],
        });
        sendDatas.users = users;
        const ratings = await Ratings.findAll({
            attributes:['id','rating_name','saved_money_rate'],
        });
        sendDatas.ratings = ratings;
        res.status(200).json(sendDatas);
    }
    catch(error){
        console.log("사용자 목록을 불러오는데 실패했습니다.",error);
        next(error);
    }

};

exports.modifyUser = async(req,res,next)=>{
    try{
        const user = req.body;
        console.log(user);
        const result = await Accounts.update(user,{where:{id:user.id}});
        console.log(result);
        res.status(200).json(result);
    }
    catch(error){
        console.log("사용자 수정에 실패했습니다.",error);
        next(error);
    }
};

exports.deleteUser = async(req,res,next)=>{
    try{
        const user = req.params.id;
        const result = await Accounts.destroy({where:{id:user}});
        res.status(200).json(result);
    }
    catch(error){
        console.log("사용자 삭제에 실패했습니다.",error);
        next(error);
    }
};
