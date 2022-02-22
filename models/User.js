const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:
    {
        type: String,

    },
    email:
    {
        type: String,

    },
    phoneNumber:
    {
        type: Number,

    },

    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },

    dob: {
        type: Date
    },
    whatsappUpdates: {
        type: Boolean
    }

})
module.exports = mongoose.model('User', userSchema)