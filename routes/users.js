var express = require('express');
var router = express.Router();
const User=require('../models/User')

router.post('/', async(req, res, next) =>{
  try{
      var user_id = req.body.user_id
      var updateReq =  req.body.updateReq
      if(!updateReq)
      {
        User.findById(user_id)
      .then(user=>
        {
          console.log(user);
          res.json(user);
        })
        .catch(err=>{
          console.log(err)
          res.send('error:'+err)
        })
      }
      else
      {
        var user={
          email:req.body.email,
          phoneNumber :req.body.phoneNumber,
          password :req.body.password,
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          gender :req.body.gender,
          dob:req.body.dob
        };
        User.findByIdAndUpdate(user_id,user)
        .then(user=>{
          if(user==null)
          {
            console.log("Please give correct input!!!");
            res.status(200).send({
              message:"Please give correct input!!!"
            })
          }
          else
          {
            console.log("profile updated")
            console.log(user);
            
            res.status(200).send({
              message:"Profile is updated"
            })
          }
        })
        .catch(e=>{
          console.log(e);
        })
      } 
  }
  catch(err){
    res.send('Error'+err);
  }
});

module.exports = router;


