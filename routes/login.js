var express = require('express');
var router = express.Router();
const User = require('../models/User')
router.post('/', async (req, res) => {
  if (req.body.login == true) {
    console.log("login")
    if (req.body.email == true) {
      console.log(" through email")
      User.findOne({
        email: req.body.loginName
      })
        .then(user => {
          if (user) {
            if (user.password == req.body.loginPass) {
              console.log(req.body.email);
              res.status(200).send({
                message: "successful login!!!",
                email: req.body.loginName,
                password: req.body.loginPass,
                _id:user._id,
                userName:user.userName
              })
            }
            else {
              res.status(200).send({
                message: "Incorrect password!!!"
              })
            }
          }
          else {
            res.status(200).send({
              message: "user doesn't exist please register!!!"
            })
          }
        })
        .catch(err => {
          console.log(err)
          res.send('error:' + err)
        })
    }
    else {
      console.log("through phone number")
      User.findOne({
        phoneNumber: req.body.phone
      })
        .then(user => {
          if (user) {
            if (user.password == req.body.loginPass) {
              res.status(200).send({
                message: "successful login!!!",
                phoneNumber: req.body.phone,
                password: req.body.loginPass,
                _id:user._id,
                userName:user.userName
              })

            }
            else {
              res.status(200).send({
                message: "Incorrect password!!!"
              })
            }
          }
          else {
            res.status(200).send({
              message: "user doesn't exist please register!!!"
            })
          }
        })
        .catch(err => {
          console.log(err)
          res.send('error:' + err)
        })
    }
  }
  else {
    console.log("signup")
    if (req.body.email == true) {
      console.log("email")
      User.findOne({
        email: req.body.loginName
      })
        .then(user => {
          if (user) {
            res.status(200).send({
              message: 'User already exists!!!'
            })
          }
          else {
            const user = new User({
              email: req.body.loginName,
              phoneNumber: req.body.phone,
              password: req.body.loginPass,
            });
            let userModel = user.save();
            res.status(200).send(
              {
                message: 'Succesfully registered',
                email: req.body.loginName,
                password: req.body.loginPass
              }
            );

          }
        })
    }
    else {
      console.log("phone")
      User.findOne({
        phoneNumber: req.body.phone
      })
        .then(user => {
          if (user) {
            res.status(200).send({
              message: 'User already exists!!!'
            })
          }
          else {
            const user = new User({
              email: req.body.loginName,
              phoneNumber: req.body.phone,
              password: req.body.loginPass,
            });
            let userModel = user.save();
            res.status(200).send(
              {
                message: 'Succesfully registered',
                phoneNumber: req.body.loginName,
                password: req.body.loginPass
              }
            );

          }
        })
    }

  }
});

module.exports = router;
