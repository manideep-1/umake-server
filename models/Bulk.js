const mongoose = require('mongoose')
const BulkSchema = mongoose.Schema({
    name:
    {
        type: String,
    },
    phnNum: {
        type: String,
    },
    email: {
        type: String,
    }
}, { collection: 'bulk' })
module.exports = mongoose.model('Bulk', BulkSchema)