const Ratings = require('../../models/model_ratings');
const Accounts = require('../../models/model_accounts');

exports.getRatings = async (req,res,next)=>{
    try{
        const ratings = await Ratings.findAll();
        res.status(200).json(ratings);
    }catch(error){
        console.error(error);
        next(error);
    }
}

exports.getSpecificUserRating = async (req,res,next)=>{
    try{
        const {email} = req.user;
        const userId = await Accounts.findOne({where:{email}});
        const rating = await Ratings.findOne({where:{id:userId.rating_id}});
        res.status(200).json({rating:rating.rating_name});
    }catch(error){
        console.error(error);
        next(error);
    }
}
