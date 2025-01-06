const express = require('express')
const router = express.Router();
const multer = require('multer');
const Accounts = require ('../models/model_accounts');
const Carts = require ('../models/model_buckets');
const Products = require ('../models/model_products');
const Wishes = require ('../models/model_wishes');
//const { Wishes } = require ('../models/model_index');

// http://localhost:8080/orders


//마이 페이지 post 를 받아오는 라우터 작성 1월5일 동진
router.post('/', async(req,res,next)=>{
    try{
        const {id,email,nickname,ratingPoint,rating_id} = req.body // 마이페이지에서 post로 보낸 data 를 파싱
        // 파싱한 data 를 req.session.user 객체에 저장하여 세션에 유지
        req.session.user = {id,email,nickname,ratingPoint,rating_id}; 
        res.status(200).json({message:'유저 정보 저장 완료'})
    }catch(err){
        console.error(err)
        next(err)
    }
})

//오더뷰 에서 유저 정보를 받아오는 get 라우터 작성 1월 5일 동진
router.get('/',async(req,res,next)=>{
    try{
        //세션에 저장된 유저 정보를 가져와 해당 변수에 저장
        const sessionUser = req.session.user;
        // Accounts 테이블에서 세션에 저장된 email 기준으로 유저 정보를 조회
        const user = await Accounts.findOne({where:{email:sessionUser.email}})
        res.status(200).json(user)
    }catch(err){
        console.error(err)
        next(err)
    }
})

// 위시 DB 에 product data 추가 (C)
router.post('/wish', async (req, res, next) =>{
    const {userId, product_Id} = req.body;
    try {
    //FK값이 해당 테이블에 데이터 있는지 확인
        const user = await Accounts.findByPk(userId);
        const targetProduct = await Products.findByPk(product_Id);
        console.log(`######################백 라우터.포스트.userId : ${user}, product_Id: ${targetProduct}`)
        if(!user || !targetProduct) {
            return res.status(404).json({message:"없는 유저거나 없는 상품임"})
        }
    
        // wishes 테이블에 데이터 들어가는거 확인! 
        // 여기서 user과 targetProduct의 조합이 고유하지 않은 경우 ""중복이기때문에 오류""남. 여기서 오류 잡아줘.
        const duplicateErrorCatch = await Wishes.findOne({
            where : {
                account_id : user.id,
                product_id: targetProduct.id,
            }
        });

        if(duplicateErrorCatch) {
            return res.status(409).json({message : '이미 찜한거라고'});
        }

        await Wishes.create({
            account_id: user.id,
            product_id: targetProduct.id, 
        });
        return res.status(201).json({message: "찜에 추가됨"});
                //201 : 찜 데이터 생성 성공 (Created)
    }catch(err){
        console.error(err);
        next(err);
    }
})

// 사용자 위시리스트 data 찾아서 프론트로 던져
router.get('/wish/:userid', async (req, res, next) => {
    try{
        const {userid} = req.params;

        // userid에 해당하는 wishes 객체 모두 불러오기
        const userWishes = await Wishes.findAll({where : {account_id : userid}});
           
        // 모든 Wishes 객체와 연계된 product객체를 찾기. (map 함수 :각 배열의 요소에 함수를 적용하여 새로운 배열 반환.)
        const productPromises = userWishes.map(async (userWish) => {
            return await Products.findOne({where : {id : userWish.product_id}}) 
        })
        //ProductPromises는 (findOne은 비동기함수) promise 상태를 반환(pending, fulfilled, rejected중 하나.)
        const wishedProducts = await Promise.all(productPromises); //promise.all() 함수는 각 Promise가 해결될 때까지 기다리고 이행 후 결괏값을 가져옴.
        res.status(200).json(wishedProducts); 

    } catch(err){
        console.error(err);
        next(err);
    }
})

router.delete('/wish/:productid', async (req, res, next) => {
    try {
        const {productid} = req.params;
        const result = await Wishes.destroy({where : {product_id : productid}});
        res.status(200).json(result);
    }catch(err) {
        console.error(err);
        next(err);
    }
})

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