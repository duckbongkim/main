const express = require('express')
const router = express.Router();
const multer = require('multer');
const Accounts = require ('../models/model_accounts');
const Carts = require ('../models/model_buckets');
const Products = require ('../models/model_products');


router.post('/wish', async (req, res, next) =>{
    // userid, productid 받았는지 확인
const {userId, product_Id} = req.body;
console.log(`U_id:${userId}, P_id:${product_Id}`);

try {
//FK값이 해당 테이블에 데이터 있는지 확인
const user = await Accounts.findByPk(userId);
const targetProduct = await Products.findByPk(product_Id);

if(!user || !targetProduct) {
    return res.status(404).json({message:"없는 유저거나 없는 상품임"})
}

// ################### Wish 테이블 어떻게 불러와야하나
await Wish.create({
    account_id: user.id,
    product_id: targetProduct.id, 
});
res.status(201).json({message: "찜에 추가됨"});
        //201 : 찜 데이터 생성 성공 (Created)

}catch(err){
    console.error(err);
    next(err);
}
} )


router.post('/cart', async(req, res, next) => {
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