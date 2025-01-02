const express = require('express')
const router = express.Router();
const {sequelize} = require('../models/model_index')
const {Accounts} = require('../models/model_index')

router.get ('/u',async(req,res,next) => {
    try{
        const {email} = req.body
        
        const users = await Accounts.findOne(
            {
                where:{email},
                attributes:['name','email','nickname']
            }
        )
        console.log(users)
        res.status(200).json(users)
    }catch(err){
        console.error(err)
        next(err)
    }
})




