const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId,
    },
    productId:
    {
        type: mongoose.Schema.Types.ObjectId,
    }
}, { collection: 'wishlist' })
module.exports = mongoose.model('Wishlist', wishlistSchema)