const express = require('express')
const router = express.Router();

const {sequelize} = require('../models/model_index')
// const Products = require('../models/model_products')
// const ProductLocations = require('../models/model_productLocations')
const {Products,ProductLocations} = require('../models/model_index')
const {Op} = require('sequelize');





router.get('/:product_id',async(req,res,next)=>{
    try{
        const {product_id} = req.params;
        const product = await Products.findOne({
            where:{id:product_id}
        })
        res.status(200).json(product)
    }catch(err){
        console.error(err)
        next(err)
    }
})


// router.get('/:product_id/recommend',async(req,res,next)=>{
//     try{
//         const {product_id} = req.params;
//         console.log("Received product_id:", product_id);
//         const currentProduct = await Products.findOne({
//             where:{id:product_id},
//             include:[
//                 {
//                     model:ProductLocations,
//                 },
//             ]
//         });

//         if(!currentProduct){
//             return res.status(404).json({message:"상품이 존재하지 않습니다"})
//         }

//         const recommend = await Products.findAll({
//             where: {
//                 product_kind: currentProduct.product_kind,
//                 id:{[Op.ne]:product_id} // 현재 상품 제외
//             },
//             limit: 4, // 4개만 가져오기
//             attributes:['id','product_name','product_price','product_image'] // 필요한 속성만 가져오기
//         })
//         res.status(200).json(recommend)
//     }catch(err){
//         console.error(err)
//         next(err)
//     }
// })



module.exports = router;