const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Product = require('../models/Product')
const Customize_Attributes = require('../models/Customize_Attributes')
const CustomizeImg_Attributes = require('../models/CustomizeImg_Attributes')
const Customized_Object = require('../models/Customized_Object');
const Image = require('../models/Image');
const Address = require('../models/Address')
const { map } = require('../app');
const { json } = require('express');
var async = require("async");

router.post('/', async(req, res, next) => {
  try {
    console.log("Hello")
    var user_id = req.body.user_id
    var orders = await Order.find({ user_id: user_id })
    orders = await JSON.stringify(orders)
    orders = await JSON.parse(orders)

    async.map(orders,function(document,done) {
      async.map(document.products,function(orderProduct,done) {
      Product.findById(orderProduct.productId, function(err, product){
        if(err) return next(err);
        orderProduct.name = product.name
        Customized_Object.findById(product.imageObjectId,function(err,customized_object){
          if(err) return next(err);
          orderProduct.frontString = customized_object.frontImgString
          orderProduct.backString = customized_object.backImgString
          done(null, orderProduct);
      })
      });
    }, function(err, result) {
      if(err) return next(err);
      console.log("documents")
      console.log(result)
      done(null,document);
    })
    }, function(err, result) {
      if(err) return next(err);
      console.log("orders")
      console.log(result)
      res.json(result)
    })
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.get('/ordersinfo/:id', async (req, res, next) => {
  var id = req.params.id
  var orders = await Order.findById(id)
  orders = await JSON.stringify(orders)
  orders = await JSON.parse(orders)
  var address = await Address.findById(orders.address_id)
  orders["address"]=address
  async.map(orders.products,function(orderProduct,done){
    Product.findById(orderProduct.productId,function(err,product){
      if(err) return next(err);
      orderProduct.name = product.name
      Customized_Object.findById(product.imageObjectId,function(err,customized_object){
        if(err) return next(err);
        orderProduct.frontString = customized_object.frontImgString
        orderProduct.backString = customized_object.backImgString
        done(null, orderProduct);
    })
    })
  }, function(err, result)
  {
    if(err)return next(err);
    console.log("result")
    console.log(result)
    orders.products = result
    res.json(orders)
  })
});
module.exports = router