const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cellphone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    shoppingCart : {
        type: String
    },
    fec_cre: {
        type: Date,
        default: Date.now()
    }
},{
    collection:'UsersStore'
});

module.exports = mongoose.model('user', productSchema)