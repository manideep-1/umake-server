const mongoose = require('mongoose')
const OrderSchema = mongoose.Schema({
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId,
    },
    products: [{productId:mongoose.Schema.Types.ObjectId,
                size:String,quantity:Number}],
    placedDate: {
        type: Date,
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {
        type: String,
    },
    cartTotal: {
        type: Number,
    },
    shippingCost: {
        type: Number,
    },
    paymentMode: {
        type: String,
    },
    orderTotal:{
        type: Number,
    },
    codCost: {
        type: Number,
    },
    paidFromWallet: {
        type: Number,
    },
    amountPaid: {
        type:Number,
    }  
}, { collection: 'orders' })
module.exports = mongoose.model('Order', OrderSchema)