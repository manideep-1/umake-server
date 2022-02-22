const mongoose = require('mongoose')

const customizedObjectSchema = mongoose.Schema({
   color:{
      type:String
   },
   front: {
      type: [mongoose.Schema.Types.ObjectId]
   },
   back: {
      type: [mongoose.Schema.Types.ObjectId]
   },
   frontImg:{
      type: [mongoose.Schema.Types.ObjectId]
   },
   backImg:{
      type: [mongoose.Schema.Types.ObjectId]
   },
   category:{
      type: String
   },
   frontImgString:{
      type: String
   },
   backImgString:{
      type: String
   },
   
}, { collection: 'customized_object' })
module.exports = mongoose.model('Customized_Object', customizedObjectSchema)