const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { response } = require('express')

process.env.SECRET_KEY = 'secret'

router.get('/editaddress/:id',async(req,res)=>{
  var id = req.params.id
  var addressData =await Address.findById(id)
  console.log(id)
  console.log(addressData)
  res.send(addressData)
})

router.post('/editaddress/:id', async(req, res) => {
  var id = req.params.id
  var addressData =await Address.findByIdAndUpdate(id,{
    receiversName: req.body.recvName,
    phoneNumber: req.body.phnNum,
    alternatePhoneNumber: req.body.altNum,
    pincode: req.body.pinCode,
    address: req.body.addr,
    locality: req.body.locality,
    landMark: req.body.landMark,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    addressType: req.body.addrType,
  })
    addressData.save().then(k => {
      res.send("Edit Successfull");
    })
    .catch((error) => {
      console.log(error);
    }); 
})

router.post('/addaddress',async(req,res)=>{
  var addedAddress = new Address({
    receiversName: req.body.recvName,
    phoneNumber: req.body.phnNum,
    alternatePhoneNumber: req.body.altNum,
    pincode: req.body.pinCode,
    address: req.body.addr,
    locality: req.body.locality,
    landMark: req.body.landMark,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    addressType: req.body.addrType,
    user_id: req.body.user_id
  })
  addedAddress.save()
  .then(() => {
    console.log("Address Added"); // Success 
  }).catch((error) => {
    console.log(error); // Failure 
  });    
})

router.post('/', async(req, res) => {
  var userId = req.body.userId;
  var removeId = req.body.removeId;
  var response = "No response"
  if (removeId != undefined) {
    response = "Address Removed"
    Address.findByIdAndDelete(removeId, function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          console.log("Removed", docs); 
      } 
    });
    res.send(response)
  }
  else
  {
    await Address.find({ user_id: userId })
      .then(result => {
        res.send(result);
      }).catch(err => {
        console.log(err)
        res.send('error:' + err)
      })
  }
})

module.exports = router

