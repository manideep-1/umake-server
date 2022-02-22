const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId,

    },
    productId:
    {
        type: mongoose.Schema.Types.ObjectId,
    },
    size:
    {
        type: String,
    },
    quantity:
    {
        type: Number,
    }

}, { collection: 'cart' })
module.exports = mongoose.model('Cart', cartSchema)