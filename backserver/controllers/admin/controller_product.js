const {sequelize} = require('../../models/model_index.js');
const Products = require('../../models/model_products.js');
const ProductLocations = require('../../models/model_productLocations.js');
const SupplyFactories = require('../../models/model_supplyFactory.js');


exports.getProducts = async(req,res,next)=>{
    try{
        let sendDatas = {};
        const products = await Products.findAll();
        sendDatas.products = products;
        console.log(products);
        const productLocations = await ProductLocations.findAll();
        sendDatas.productLocations = productLocations;
        console.log(productLocations);
        const supplyFactories = await SupplyFactories.findAll();
        sendDatas.supplyFactories = supplyFactories;
        console.log(supplyFactories);
        res.status(200).json(sendDatas);
    }
    catch(error){
        console.log("상품 목록을 불러오는데 실패했습니다.",error);
        next(error);
    }

};

exports.modifyProduct = async(req,res,next)=>{
    try{
        const product = req.body;
        console.log(product);
        const result = await Products.update(product,{where:{id:product.id}});
        console.log(result);
        res.status(200).json(result);
    }
    catch(error){
        console.log("상품 수정에 실패했습니다.",error);
        next(error);
    }
};

exports.deleteProduct = async(req,res,next)=>{
    try{
        const product = req.params.id;
        const result = await Products.destroy({where:{id:product}});
        res.status(200).json(result);
    }
    catch(error){
        console.log("상품 삭제에 실패했습니다.",error);
        next(error);
    }
};

exports.addProduct = async(req,res,next)=>{
    try{
        const product = req.body;
        const result = await Products.create(product);
        res.status(200).json(result);
    }
    catch(error){
        console.log("상품 추가에 실패했습니다.",error);
        next(error);
    }
};