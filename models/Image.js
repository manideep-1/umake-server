const mongoose = require('mongoose');
 
const ImageSchema = mongoose.Schema({
    category: String,
    subCategory: String,
    name: String,
    sno: Number,
    imageType: String,
    left: Number,
    right: Number
},{collection: 'images'});
 
module.exports = mongoose.model('Image', ImageSchema);