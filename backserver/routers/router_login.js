const express = require('express');
const router = express.Router();
const {isNotLoggedIn,isLoggedIn} = require('../middlewares/middleware_checkLogin.js');
const {localLogin,logout} = require('../controllers/auth/controller_login.js');


//로컬 로그인
router.post('/',isNotLoggedIn,localLogin);

//카카오 로그인

//네이버 로그인

//로그아웃
router.get('/logout',isLoggedIn,logout);

module.exports = router;