require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { sequelize } = require('../models/model_index.js');
const {Op} = require('sequelize')

// //MySQL 연결 설정
// const productList = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,   
//   password: process.env.DB_PASSWORD, 
//   database: process.env.DB_NAME
// });

// productList.connect((err) => {
//   if (err) {
//     console.error('연결 실패:', err);
//     return;
//   }
//   console.log('연결 성공');
// });


// //상품 조회 (리스트 품목 이동 시 데이터 보여주기)

// router.get('/', async (req, res) => {
//   const query = 'SELECT * FROM products WHERE product_kind = "drink" '; // MySQL 쿼리

//   try {
//     // sequelize.query로 쿼리 실행
//     const [results, metadata] = await sequelize.query(query);

//     console.log('상품 목록:', results); // 데이터 연결 확인
//     res.json(results);
//   } catch (err) {
//     console.error('상품 목록 조회 실패:', err);
//     return res.status(500).json({ error: '상품 목록 조회에 실패했습니다.' });
//   }
// });

// //품목별 상품 조회 
// router.get('/:drink_type', async (req, res) => {
//   const { drink_type } = req.params;  
//   const query = 'SELECT * FROM products WHERE drink_type = ?';  
  
//   try {
//     const [results,metadata] = await sequelize.query(query, {
//       replacements: [drink_type],  // 이 부분이 파라미터 값을 배열로 전달하는 부분입니다.
//       type: sequelize.QueryTypes.SELECT  // 쿼리 실행 시 반환 형식을 명시
//     });
//     res.json(results); 
//   } catch (err) {
//     console.error('상품 목록 조회 실패:', err);
//     return res.status(500).json({ error: '상품이 준비되지 않았습니다.' });
//   }
// });

//etc 상품 조회
// router.get('/:product_kind', async (req, res) => {
//   const { product_kind } = req.params;  
//   const query = 'SELECT * FROM products WHERE product_kind = "wineglass" OR product_kind = "ontherock" ';  
  
//   try {
//     const [results,metadata] = await sequelize.query(query, {
//       replacements: [product_kind],
//       type: sequelize.QueryTypes.SELECT  // 쿼리 실행 시 반환 형식을 명시
//     });
//     res.json(results); 
//   } catch (err) {
//     console.error('상품 목록 조회 실패:', err);
//     return res.status(500).json({ error: '상품이 준비되지 않았습니다.' });
//   }
// });




//상품 검색 (검색창에 검색할때 사용할 기능)
router.get('/search', async (req, res) => {
  console.log('검색 쿼리 파라미터:', req.query);
  const { product_name, product_description, drink_type, product_kind } = req.query;

  // 검색 조건을 동적으로 설정
  const searchConditions = {};

  if (product_name) {
    searchConditions.product_name = {
      [Op.like]: `%${product_name}%`,  // %를 사용해 LIKE 검색을 할 수 있도록 설정
    };
  }

  if (product_description) {
    searchConditions.product_description = {
      [Op.like]: `%${product_description}%`, 
    };
  }

  if (drink_type) {
    searchConditions.drink_type = {
      [Op.like]: `%${drink_type}%`, 
    };
  }

  if (product_kind) {
    searchConditions.product_kind = {
      [Op.like]: `%${product_kind}%`,
    };
  }

  // 쿼리 실행
  try {
    const results = await sequelize.models.products.findAll({
      where: searchConditions,  // 동적으로 설정된 검색 조건을 이용
    });
    res.json(results);
  } catch (err) {
    console.error('상품 검색 실패:', err);
    return res.status(500).json({ error: '검색하신 내용과 일치하는 상품이 없습니다.' });
  }
});

module.exports = router;

