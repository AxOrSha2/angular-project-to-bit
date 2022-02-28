const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    seller: {
        type: String,
        require: true
    },
    stock_available : {
        type: Number,
        require: true
    },
    fec_cre: {
        type: Date,
        default: Date.now()
    }
},{
    collection:'ProductStore'
});

module.exports = mongoose.model('producto', productSchema)