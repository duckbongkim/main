const Ratings = require('../../models/model_ratings');

exports.getRatings = async (req,res,next)=>{
    try{
        const ratings = await Ratings.findAll();
        res.status(200).json(ratings);
    }catch(error){
        console.error(error);
        next(error);
    }
}