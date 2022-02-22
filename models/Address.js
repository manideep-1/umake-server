const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const AddressSchema = new Schema({
  receiversName: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  alternatePhoneNumber: {
    type: String
  },
  pincode: {
    type: String
  },
  address: {
    type: String
  },
  locality: {
    type: String
  },
  landMark: {
    type: String
  },
  city: {
    type: String
  },
  state : {
    type: String
  },
  country: {
    type: String
  },
  addressType: {
    type: String
  },
  default: {
    type: Boolean
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  }
}, { collection: 'addresses' })

module.exports = Address = mongoose.model('Address', AddressSchema)