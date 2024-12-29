const express = require('express');
const router = express.Router();
const {getUsers,modifyUser,deleteUser} = require('../controllers/controller_admin.js');

router.get('/users',getUsers);
router.patch('/users',modifyUser);
router.delete('/users/:id',deleteUser);

module.exports = router;