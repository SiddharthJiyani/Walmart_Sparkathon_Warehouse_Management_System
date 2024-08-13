const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    //only 3 kinds of warehouse (Excluding manufacturing)
    type: {
        type: String,
        enum: ['storage', 'distributor', 'retail'],
        required: [true, 'Please specify the warehouse type']
    },
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
}, { timestamps: true });

const Warehouse = mongoose.model('Warehouse', warehouseSchema);
module.exports = Warehouse;
