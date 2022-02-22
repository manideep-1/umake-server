const express = require('express')
const router = express.Router()

const Bulk = require('../models/Bulk')

router.post('/', async(req, res) => {
  try {
    var bulk = new Bulk({
      name: req.body.name,
      phnNum: req.body.phnNum,
      email: req.body.email
    })
    bulk.save().then(k => {
      console.log(k);
      res.json("Successfull");
    });
  }
  catch (e) {
    res.send('Error')
  }
})

module.exports = router