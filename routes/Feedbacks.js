const express = require('express')
const feedbacks = express.Router()
const cors = require('cors')

const Feedback = require('../models/Feedback')
feedbacks.use(cors())

process.env.SECRET_KEY = 'secret'

feedbacks.post('/feed', (req, res) => {
  var feedbackData = new Feedback({
    queryType: req.body.queryType,
    feedback: req.body.feedback
  })
  try {
    feedbackData.save().then(k => {
      console.log(k);
      res.json("Successfull");

    });
  }
  catch (e) {
    res.send('Error')
  }
})

module.exports = feedbacks