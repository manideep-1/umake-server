const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:
    {
        type: String,

    },
    location:
    {
        type:String,
    },
    imageObjectId:
    {
        type:mongoose.Schema.Types.ObjectId,
    },
    actualPrice:
    {
        type: Number,
    },
    discount:
    {
        type: Number,

    },
    type: {
        type:String
    },
    tag: {
        type: String,
    }

}, { collection: 'product' })
module.exports = mongoose.model('Product', productSchema)