const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const FeedbackSchema = new Schema({
  queryType: {
    type: String
  },
  feedback: {
    type: String
  }
})

module.exports = Feedback = mongoose.model('feedbacks', FeedbackSchema)