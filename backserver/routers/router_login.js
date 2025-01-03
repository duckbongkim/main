const express = require('express');
const router = express.Router();
const {isNotLoggedIn,isLoggedIn} = require('../middlewares/middleware_checkLogin.js');
const {localLogin,logout} = require('../controllers/auth/controller_login.js');
const {kakaoLogin,kakaoCallback} = require('../controllers/auth/controller_kakaoLogin.js');



//로컬 로그인
router.post('/',isNotLoggedIn,localLogin);

//로그인 상태 체크
router.get('/check', (req, res) => {
    // 세션 상태를 로그로 확인
    console.log("req.isAuthenticated()",req.isAuthenticated());
    console.log('Session state:', {
        isAuthenticated: req.isAuthenticated(),
        hasUser: !!req.user,
        sessionID: req.sessionID
    });
    
    if (req.isAuthenticated() && req.user) {
        res.json({
            isLoggedIn: true,
            user: req.user,
            lastActivity: req.session.lastActivity
        });
    } else {
        res.json({
            isLoggedIn: false,
            user: null
        });
    }
});

//카카오 로그인
router.get('/kakao',isNotLoggedIn,kakaoLogin);
router.get('/kakao/callback',kakaoCallback);

//네이버 로그인


//로그아웃
router.post('/logout',isLoggedIn,logout);

module.exports = router;