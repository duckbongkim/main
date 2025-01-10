require('dotenv').config();
const Products = require('../models/model_products.js')
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { sequelize } = require('../models/model_index.js');

//MySQL 연결 설정
const productList = mysql.createConnection({
  host: '192.168.250.77',
  user: process.env.DB_USER,   
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME
});

productList.connect((err) => {
  if (err) {
    console.error('연결 실패:', err);
    return;
  }
  console.log('연결 성공');
});


//상품 조회 (리스트 품목 이동 시 데이터 보여주기)

// router.get('/', async (req, res) => {
//   const query = 'SELECT * FROM products'; 

//   try{
//       const [results] = await Products.sequelize.query(query);
//       console.log('상품 목록:', results); // 데이터 연결 확인
//       res.json(results);
   
//      } catch (err) {
//       console.error('상품 목록 조회 실패:', err);
//       return res.status(500).json({ error: '상품 목록 조회에 실패했습니다.' });
//   }
// });

router.get('/', async (req, res) => {
  const query = 'SELECT * FROM products'; // MySQL 쿼리

  try {
    // sequelize.query로 쿼리 실행
    const [results, metadata] = await sequelize.query(query);

    console.log('상품 목록:', results); // 데이터 연결 확인
    res.json(results);
  } catch (err) {
    console.error('상품 목록 조회 실패:', err);
    return res.status(500).json({ error: '상품 목록 조회에 실패했습니다.' });
  }
});



//상품 검색 (검색창에 검색할때 사용할 기능)
router.get('/search', (req, res) => {
  const { product_name, product_description, drink_type, product_kind } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1'; 

  // 검색 조건에 따른 쿼리에 추가작성
  if (product_name) {
    query += ` AND product_name LIKE ?`;
  }
  if (product_description) {
    query += ` AND product_description LIKE ?`; 
  }
  if (drink_type) {
    query += ` AND drink_type LIKE ?`;
  }
  if (product_kind) {
    query += ` AND product_kind LIKE ?`;
  }

  //검색 조건에서 추가되는 값 설정
  const values = [];
  if (product_name) values.push(`%${product_name}%`);
  if (product_description) values.push(`%${product_description}%`);
  if (drink_type) values.push(`%${drink_type}%`);
  if (product_kind) values.push(`%${product_kind}%`);

  // 쿼리 실행
  productList.query(query, values, (err, results) => {
    if (err) {
      console.error('상품 검색 실패:', err);
      return res.status(500).json({ error: '검색하신 내용과 일치하는 상품이 없습니다..' });
    }
    res.json(results);
  });
})

//품목별 상품 조회 
router.get('/:drink_type', async (req, res) => {
  const { drink_type } = req.params;  
  const query = 'SELECT * FROM products WHERE drink_type = ?';  
  
  try {
    const [results] = await productList.promise().query(query, [drink_type]);
    res.json(results); 
  } catch (err) {
    console.error('상품 목록 조회 실패:', err);
    return res.status(500).json({ error: '상품이 준비되지 않았습니다.' });
  }
});


module.exports = router;

