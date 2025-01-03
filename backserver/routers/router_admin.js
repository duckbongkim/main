const express = require('express');
const router = express.Router();
const multer = require('multer');
const {getUsers,modifyUser,deleteUser,addAccount} = require('../controllers/admin/controller_account.js');
const {getProducts,modifyProduct,deleteProduct,addProduct,getSpecificProduct,getProductLocations,getSupplyFactories,uploadDescriptionImage,uploadProductImage} = require('../controllers/admin/controller_product.js');
const {descriptionUpload,productUpload} = require('../middlewares/middlewares_imgUpload.js');
const {getOrders} = require('../controllers/admin/controller_order.js');
const {addProductLocation,modifyProductLocation,deleteProductLocation} = require('../controllers/admin/controller_productLocation.js');
const {addSupplyFactory,modifySupplyFactory,deleteSupplyFactory} = require('../controllers/admin/controller_supplyFactory.js');



//사용자 관리
router.get('/users',getUsers);
router.patch('/users',modifyUser);
router.delete('/users/:id',deleteUser);
router.post('/addAccount',addAccount);



//상품 관리(라우터 순서 신경써야함.)
router.get('/products/locations',getProductLocations);
router.get('/products/supplyFactories',getSupplyFactories);

//특정 상품 조회
router.get('/products/:id',getSpecificProduct);

router.get('/products',getProducts);
router.patch('/modifyProduct',modifyProduct);
router.delete('/products/:id',deleteProduct);
router.post('/addProduct',addProduct);

//상품 설명 이미지 업로드
router.post('/upload/descriptionImg',descriptionUpload.single('image'),uploadDescriptionImage);
//상품 이미지 업로드
router.post('/upload/productImg',productUpload.single('image'),uploadProductImage);

//주문 관리
router.get('/orders',getOrders);

//원산지 관리
router.post('/addProductLocation',addProductLocation);
router.patch('/modifyProductLocation',modifyProductLocation);
router.delete('/deleteProductLocation/:id',deleteProductLocation);

//공급처 관리
router.post('/addSupplyFactory',addSupplyFactory);
router.patch('/modifySupplyFactory',modifySupplyFactory);
router.delete('/deleteSupplyFactory/:id',deleteSupplyFactory);

module.exports = router;