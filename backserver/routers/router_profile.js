const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/middleware_checkLogin.js');
const {getProfile} = require('../controllers/controller_profile.js');
const {getRatings} = require('../controllers/admin/controller_ratings.js');
const {getSpecificUserPosts} = require('../controllers/post/controller_post.js');

router.get('/',isLoggedIn,getProfile);
router.get('/ratings',isLoggedIn,getRatings);
router.get('/posts',isLoggedIn,getSpecificUserPosts);


module.exports = router;
