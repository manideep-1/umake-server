const mongoose = require('mongoose')

const customizeAttributesSchema = mongoose.Schema({
    element:
    {
        type: String,
    },
    fontName: {
        type: String,
    },
    color: {
        type: String,
    },
    alignment: {
        type: String,
    },
    bold: {
        type: Boolean,
    },
    underline: {
        type: Boolean,
    },
    italic: {
        type: Boolean,
    },
    fontSize: {
        type: Number,
    },
    selected: {
        type: Boolean,
    },
    deltaPosition: {
        x:{
            type:Number
        },
        y:{
            type:Number
        }
    },
    category:{
        type:String
    }
}, { collection: 'customize_attributes' })
module.exports = mongoose.model('Customize_Attributes', customizeAttributesSchema)