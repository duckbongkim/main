const {sequelize} = require('../../models/model_index.js');
const Accounts = require('../../models/model_accounts.js');
const Ratings = require('../../models/model_ratings.js');
const crypto = require('../../methods/crypto.js');


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
        user.updated_at = new Date();
        if(user.password !== null || user.password !== ''){
            const hashedPassword = await crypto(user.password);
            user.password = hashedPassword;
        }
        const result = await Accounts.update(user,{where:{id:user.id}});
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

exports.addAccount = async(req,res,next)=>{
    try{
        const account = req.body;
        
        // 이메일 중복 체크
        const existEmail = await Accounts.findOne({where:{email:account.email}});
        if(existEmail){
            return res.status(400).json({message:'이미 가입된 이메일입니다.'});
        }

        // 닉네임 중복 체크
        const existNickname = await Accounts.findOne({where:{nickname:account.nickname}});
        if(existNickname){
            return res.status(400).json({message:'이미 사용 중인 닉네임입니다.'});
        }

        // 전화번호 중복 체크
        const existPhone = await Accounts.findOne({where:{phone_number:account.phone_number}});
        if(existPhone){
            return res.status(400).json({message:'이미 등록된 전화번호입니다.'});
        }

        if(!account.created_at){
            account.created_at = new Date();
        }
        if(!account.updated_at){
            account.updated_at = new Date();
        }
        if(account.password !==null || account.password !== ''){
            const hash = await crypto(account.password);
            account.password = hash;
        }
        const result = await Accounts.create(account);
        res.status(200).json(result);
    }
    catch(error){
        console.log("회원 추가에 실패했습니다.",error);
        next(error);
    }
};

exports.dropOutUser = async(req,res,next)=>{
    try{
        const user = req.user.email;
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 14); // 현재 날짜에 14일을 추가
        await Accounts.update({delete_time: futureDate},{where:{email:user}});
        res.status(200).json({message:'회원 탈퇴가 완료되었습니다. 14일 후 완전 삭제됩니다.'});
    }
    catch(error){
        console.log("회원 탈퇴에 실패했습니다.",error);
        next(error);
    }
    
}