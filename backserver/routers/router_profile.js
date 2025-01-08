const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/middleware_checkLogin.js');
const {getProfile,modifyPassword} = require('../controllers/controller_profile.js');
const {getRatings,getSpecificUserRating} = require('../controllers/admin/controller_ratings.js');
const {getSpecificUserPosts} = require('../controllers/post/controller_post.js');
const {dropOutUser,modifyUser} = require('../controllers/admin/controller_account.js');

router.get('/',isLoggedIn,getProfile);
router.get('/ratings',isLoggedIn,getRatings);
router.get('/userRating',isLoggedIn,getSpecificUserRating);
router.get('/posts',isLoggedIn,getSpecificUserPosts);
router.get('/dropOut',isLoggedIn,dropOutUser);
router.patch('/modifyUser',isLoggedIn,modifyUser);
router.patch('/modifyPassword',isLoggedIn,modifyPassword);

module.exports = router;
