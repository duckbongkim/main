
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

app.get('/products', (req, res) => {
    fs.readFile(productDb, 'utf8', (err, data) => {
      if (err) {
        console.error('상품 목록 조회 실패:', err);
        return res.status(500).json({ error: '상품 목록 조회에 실패했습니다.' });
      }
      const products = JSON.parse(data);
      res.json(products);
    });
  });


  //상품 검색
  app.get('/products', (req, res) => {

    const { product_name,product_description } = req.query;
  
      fs.readFile(productDb, 'utf8', (err, data) => {
      if (err) {
        console.error('상품 목록 조회 실패:', err);
        return res.status(500).json({ error: '상품 목록 조회에 실패했습니다.' });
      }
      const products = JSON.parse(data);  
      
    
      const SearchProduct = products.filter(p => {
        let isValid = true;
        
        if (product_name) {
            isValid = isValid && p.product_name.includes(product_name);
          }
        
          if (product_description) {
            isValid = isValid && p.product_description.includes(product_description); 
          }

        return isValid;
      });
  
      // 필터링된 상품 목록 반환
      res.json(SearchProduct);
    });
  });

  //태스트