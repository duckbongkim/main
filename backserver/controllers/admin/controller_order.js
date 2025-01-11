const {sequelize} = require('../../models/model_index.js');
const Orders = require('../../models/model_orders.js');
const Products = require('../../models/model_products.js');
const Accounts = require('../../models/model_accounts.js');

exports.getOrders = async(req,res,next)=>{
    try{
        const orders = await Orders.findAll({
            include: [
                {
                    model: Products,
                    attributes: ['product_name']
                },
                {
                    model: Accounts,
                    attributes: ['email']
                }
            ],
            order: [['created_at', 'DESC']]
        });
        res.status(200).json(orders);
    }
    catch(error){
        console.log("주문 목록 조회 실패",error);
        next(error);
    }
}