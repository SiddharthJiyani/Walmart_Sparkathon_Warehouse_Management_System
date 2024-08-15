const asyncHandler = require('express-async-handler');
const Warehouse = require('../models/warehouseModel');

// Create
const createWarehouse = asyncHandler(async (req, res) => {

    const { name, type, country, state, city, pincode,  warehouseAdminContact} = req.body;


    if (!name || !type || !country || !state || !city || !pincode || !warehouseAdminContact) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const warehouse = await Warehouse.create({
        name,
        type, 
        country, 
        state, 
        city, 
        pincode,  
        warehouseAdminContact
    });

    res.status(201).json(warehouse);
});

// Get all warehouses
const getWarehouses = asyncHandler(async (req, res) => {
    const warehouses = await Warehouse.find().sort('-createdAt');
    res.status(200).json(warehouses);
});

// Get a single warehouse
const getWarehouse = asyncHandler(async (req, res) => {
    const warehouse = await Warehouse.findById(req.params.id);

    if (!warehouse) {
        res.status(404);
        throw new Error('Warehouse not found');
    }

    res.status(200).json(warehouse);
});

// Update
const updateWarehouse = asyncHandler(async (req, res) => {
    const { name, type, country, state, city, pincode,  warehouseAdminContact } = req.body;
    const { id } = req.params;

    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
        res.status(404);
        throw new Error('Warehouse not found');
    }

    warehouse.name = name || warehouse.name;
    warehouse.type = type || warehouse.type;
    warehouse.country = country || warehouse.country;
    warehouse.state = state || warehouse.state;
    warehouse.city = city || warehouse.city;
    warehouse.pincode = pincode || warehouse.pincode;
    warehouse.warehouseAdminContact = warehouseAdminContact || warehouse.warehouseAdminContact;

    const updatedWarehouse = await warehouse.save();

    res.status(200).json(updatedWarehouse);
});

// Delete
const deleteWarehouse = asyncHandler(async (req, res) => {
    const warehouse = await Warehouse.findById(req.params.id);

    if (!warehouse) {
        res.status(404);
        throw new Error('Warehouse not found');
    }

    await warehouse.deleteOne();

    res.status(200).json({ message: 'Warehouse removed' });
});

const getWarehouseById = asyncHandler(async (id) => {
    try{
        const warehouse = await Warehouse.findById(id);
        return warehouse;
    }
    catch(error){
        throw new Error('Warehouse not found');
    }
});

module.exports = {
    createWarehouse,
    getWarehouses,
    getWarehouse,
    updateWarehouse,
    deleteWarehouse,
    getWarehouseById,
};
