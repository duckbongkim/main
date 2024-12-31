const express = require('express');
const router = express.Router();
const {getUsers,modifyUser,deleteUser,addAccount} = require('../controllers/admin/controller_account.js');
const {getProducts,modifyProduct,deleteProduct,addProduct} = require('../controllers/admin/controller_product.js');

//사용자 관리
router.get('/users',getUsers);
router.patch('/users',modifyUser);
router.delete('/users/:id',deleteUser);
router.post('/addAccount',addAccount);

//상품 관리
router.get('/products',getProducts);
router.patch('/products',modifyProduct);
router.delete('/products/:id',deleteProduct);
router.post('/addProduct',addProduct);

module.exports = router;