const { Products } = require('../../models/model_index.js');  
const { Op } = require('sequelize');

// 상품 조회 (전체 목록)
exports.getProducts = async (req, res,next) => {
  try {
    const results = await Products.findAll({
      where: { product_kind: 'drink' },  
    });
    res.json(results); 
  } catch (err) {
    console.error('상품 목록 조회 실패:', err);
    next(err);
  }
};

// 품목별 상품 조회 (주류 게시판)
exports.getDrinkTpye = async (req, res, next) => {
  const { drink_type } = req.params; 
  try {
    const results = await Products.findAll({where: { drink_type }});
    res.json(results); 
  } catch (err) {
    console.error('상품 목록 조회 실패:', err);
    next(err);
  }
};

// 품목별 상품 조회 (etc상품)
exports.getProductKind =  async (req, res, next) => {
    const { product_kind } = req.params;

    try {
      const results = await Products.findAll({
        where: {
          product_kind,
          [Op.or]: [ { product_kind: 'wineglass' }, { product_kind: 'ontherock' } ]
        }
      });
      res.json(results); 
    } catch (err) {
      console.error('상품 목록 조회 실패:', err);
      next(err);
    }
  };

// 상품 검색
exports.searchProducts = async (req, res, next) => {
    console.log('검색 쿼리 파라미터:', req.query);
    const { product_name, product_description, drink_type, product_kind } = req.query;
  
    const searchConditions = {};
  
    if (product_name) {
      searchConditions.product_name = {
        [Op.like]: `%${product_name}%`, 
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
  
    try {
      const results = await Products.findAll({
        where: searchConditions,
      });
      res.json(results);
    } catch (err) {
      console.error('상품 검색 실패:', err);
      next(err);
    }
  };

