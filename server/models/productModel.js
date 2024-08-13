const mongoose = require('mongoose');

const manufacturingWarehouseSchema = new mongoose.Schema({
    country: {
        type: String,
        required: [true, 'Please add a country']
    },
    state: {
        type: String,
        required: [true, 'Please add a state']
    },
    city: {
        type: String,
        required: [true, 'Please add a city']
    },
    pincode: {
        type: String,
        required: [true, 'Please add a pincode']
    },
    warehouseAdminContact: {
        type: String,
        required: [true, 'Please add a warehouse admin contact'],
        default:'+91 '
    },
    dateOfManufacture: {
        type: Date,
        required: [true, 'Please add a date of manufacture']
    }
}, { _id: false });

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    sku: {
        type: String,
        required: true,
        default:"SKU",
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    quantity: {
        type: String,
        required: [true, 'Please add a quantity'],
        trim: true
    },
    price:{
        type: String,
        required: [true, 'Please add a price'],
        trim: true
    },
    description:{
        type: String,
        required: [true, 'Please add a description'],
        trim: true
    },
    image:{
        type:Object,
        default:{}
    },
    //can be many different product manufacturers
    manufacturingWarehouse: {
        type: manufacturingWarehouseSchema,
        required: true
    },
    lastStop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse'
    },
    currentStop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    },
    nextStop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse'
    }
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;