const express = require('express');
const router = express.Router();
const {getUsers} = require('../controllers/controller_admin.js');

router.get('/users',getUsers);

module.exports = router;