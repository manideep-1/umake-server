const mongoose = require('mongoose')

const userDraftSchema = mongoose.Schema({
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId,
    },
    draftIds: [mongoose.Schema.Types.ObjectId],
}, { collection: 'user_drafts' })
module.exports = mongoose.model('User_Drafts', userDraftSchema)