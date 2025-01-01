const express = require('express')
const router = express.Router();

const {sequelize} = require('../models/model_index')
const Products = require('../models/model_products')
// const ProductLocations = require('../models/model_productLocations')
const {Products,ProductLocations} = require('../models/model_index')
const {Op} = require('sequelize');
const Accounts = require ('../models/model_accounts');
const Carts = require ('../models/model_buckets');


     // ##################  const wish = require ('') wish 모델은 어떻게 불러와야하지?? ////

router.get('/:product_id',async(req,res,next)=>{
    try{
        const {product_id} = req.params;
        const selectedProduct = await Products.findOne({where:{id:product_id}})
        res.status(200).json(selectedProduct)
    }catch(err){
        console.error(err)
        next(err)
    }
})


router.get('/:product_id/recommend',async(req,res,next)=>{
    try{
        const {product_id} = req.params;
        console.log(product_id);
        const currentProduct = await Products.findOne({
            where:{id:product_id},
            include:[
                {
                    model:ProductLocations,
                },
            ]
        });

        if(!currentProduct){
            return res.status(404).json({message:"상품이 존재하지 않습니다"})
        }

        const recommend = await Products.findAll({
            where: {
                product_kind: currentProduct.product_kind,
                id:{[Op.ne]:product_id} // 현재 상품 제외
            },
            limit: 4, // 4개만 가져오기
            attributes:['id','product_name','product_price','product_image'] // 필요한 속성만 가져오기
        })
        res.status(200).json(recommend)
    }catch(err){
        console.error(err)
        next(err)
    }
})

router.post('/orders/wish', async (req, res, next) =>{
        // userid, productid 받았는지 확인
    const {userId, product_Id} = req.body;
    console.log(`U_id:${userId}, P_id:${product_Id}`);

    try {
    // //FK값이 해당 테이블에 데이터 있는지 확인
    // const user = await Accounts.findByPk(userId);
    // const targetProduct = await Products.findByPk(product_Id);

    // if(!user || !targetProduct) {
    //     return res.status(404).json({message:"없는 유저거나 없는 상품임"})
    // }
    
    // // ################### Wish 테이블 어떻게 불러와야하나
    // await Wish.create({
    //     account_id: user.id,
    //     product_id: targetProduct.id, 
    // });
    res.status(201).json({message: "찜에 추가됨"});
            //201 : 찜 데이터 생성 성공 (Created)

    }catch(err){
        console.error(err);
        next(err);
    }
} )


router.post('/order/cart', async(req, res, next) => {
    // userId, product_Id, quantity 받았는지 확인
    const {userId, product_Id, quantity} = req.body;
    console.log(`[cart] U_id:${userId}, P_id:${productId}, Qty:${quantity}`);
    
    try{

    //FK값이 해당 테이블에 데이터 있는지 확인
    const user = await Accounts.findByPk(userId);
    const CartProduct = await Products.findByPk(product_Id);

    if(!user || !CartProduct) {
        return res.status(404).json({message:"없는 유저거나 없는 상품임"})
    }
    
    //cart 테이블에 데이터 생성
    await Carts.create({
        account_id : user.id,
        product_id : CartProduct.id,
        count : quantity,
    });
    res.status(201).json({message: "장바구니 추가됨"})

    }catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;