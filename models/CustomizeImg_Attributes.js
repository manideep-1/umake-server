const mongoose = require('mongoose')

const customizeImgAttributesSchema = mongoose.Schema({
    stickerId:
    {
        type: String,
    },
    deltaPosition: {
        x:{
            type:Number
        },
        y:{
            type:Number
        }
    },
    height: {
        type:String
    },
    width:{
        type:String
    },
    category:{
        type:String
    },
    stickerNumber:{
        type:Number
    }
}, { collection: 'customizeImg_attributes' })
module.exports = mongoose.model('CustomizeImg_Attributes', customizeImgAttributesSchema)