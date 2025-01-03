const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/middleware_checkLogin.js');
const {getProfile} = require('../controllers/controller_profile.js');

router.get('/',isLoggedIn,getProfile);

module.exports = router;