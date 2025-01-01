
const express = require('express');
const router = express.Router();
const mysql = require('mysql12');

//MySQL 연결 설정
const productList = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: '' 
});

productList.connect((err) => {
  if (err) {
    console.error('연결 실패:', err);
    return;
  }
  console.log('연결 성공');
});


//상품 조회 (리스트 품목 이동 시 데이터 보여주기)

app.get('/products', async (req, res) => {
  const query = 'SELECT * FROM productTable'; 

  try{
      const [results] = await productList.promise().query(query);
      res.json(results);
     } catch (err) {
      console.error('상품 목록 조회 실패:', err);
      return res.status(500).json({ error: '상품 목록 조회에 실패했습니다.' });
  }
});


//상품 검색 (검색창에 검색할때 사용할 기능)
app.get('/products/search', (req, res) => {
  const { product_name, product_description } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1'; 

  // 검색 조건에 따른 쿼리에 추가작성
  if (product_name) {
    query += ` AND product_name LIKE ?`;
  }
  if (product_description) {
    query += ` AND product_description LIKE ?`; 
  }

  //검색 조건에서 추가되는 값 설정
  const values = [];
  if (product_name) values.push(`%${product_name}%`);
  if (product_description) values.push(`%${product_description}%`);

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
app.get('/products/:category', async (req, res) => {
  const { productKind } = req.params;  
  const query = 'SELECT * FROM products WHERE productKind = ?';  
  
  try {
    const [results] = await productList.promise().query(query, [category]);
    res.json(results); 
  } catch (err) {
    console.error('상품 목록 조회 실패:', err);
    return res.status(500).json({ error: '상품이 준비되지 않았습니다.' });
  }
});