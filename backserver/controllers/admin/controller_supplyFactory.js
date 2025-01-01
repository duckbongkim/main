const {sequelize} = require('../../models/model_index.js');
const SupplyFactory = require('../../models/model_supplyFactory.js');

const getSupplyFactories = async (req,res) => {
    const factories = await SupplyFactory.findAll();
    res.status(200).json(factories);
}

const addSupplyFactory = async (req,res) => {
    const {name,address,phone_number,email} = req.body;
    const newFactory = await SupplyFactory.create({name,address,phone_number,email});
    res.status(201).json(newFactory);
}

const modifySupplyFactory = async (req,res) => {
    const {id,name,address,phone_number,email} = req.body;
    const updatedFactory = await SupplyFactory.update({name,address,phone_number,email},{where:{id}});
    res.status(200).json(updatedFactory);
}

const deleteSupplyFactory = async (req,res) => {
    const {id} = req.params;
    await SupplyFactory.destroy({where:{id}});
    res.status(204).send();
}

module.exports = {getSupplyFactories,addSupplyFactory,modifySupplyFactory,deleteSupplyFactory};
