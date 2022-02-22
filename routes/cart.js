const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const Product = require('../models/Product');
const WishList = require('../models/Wishlist');
const Customize_Attributes = require('../models/Customize_Attributes')
const CustomizeImg_Attributes = require('../models/CustomizeImg_Attributes')
const Customized_Object = require('../models/Customized_Object')
const async = require('async');
const Image = require('../models/Image')
const { update } = require('../models/Cart');

search = (array, targetValue) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == targetValue)
      return i;
  }
  return -1;
}

router.post('/', async (req, res, next) => {
  try {
    var removeProductId = req.body.removeProductId
    var moveProductId = req.body.moveProductId
    var updatedSize = req.body.size
    var sizeProductId = req.body.productId
    var updatedQty = req.body.qty
    var qtyProductId = req.body.productId
    var updateId = req.body.updateId
    var user_id  = req.body.user_id
    var mount = req.body.mount
    if(user_id != undefined && mount==true)
    {
      var cart = await Cart.find({ "user_id": user_id }, { "_id": 0, "size": 1, "quantity": 1, "productId": 1 })
      async.map(cart,function(cartObj,done) {
        Product.findById(cartObj.productId,{"name": 1, "actualPrice": 1,"location":1, "discount": 1, "type": 1, "imageObjectId":1}, function(err, product){
          if(err) return next(err);      
          cartObj=cartObj.toObject()
          cartObj.name = product.name
          cartObj.actualPrice = product.actualPrice
          cartObj.discount = product.discount
          cartObj.type = product.type

        Customized_Object.findById(product.imageObjectId,function(err,customized_object){
          if(err) return next(err);
          cartObj.frontString = customized_object.frontImgString
          cartObj.backString = customized_object.backImgString
          cartObj.location=product.location
          done(null,cartObj)
          
      })

        });
      }, function(err, result) {
        if(err) return next(err);
        console.log(result)
        res.json(result);  // modified 'pages' -> 'result'
      })
    }
    if (removeProductId != undefined) {
      Cart.findOneAndDelete({ "user_id": user_id, productId: removeProductId })
        .then(function () {
          console.log("Data deleted"); // Success 
        }).catch(function (error) {
          console.log(error); // Failure 
        });
        res.send("removed")
    }
    if (moveProductId != undefined) {
      Cart.findOneAndDelete({ "user_id": user_id, productId: moveProductId })
        .then(function () {
          console.log("Data deleted"); // Success 
        }).catch(function (error) {
          console.log(error); // Failure 
        });
      var contains = await WishList.findOne({ "user_id": user_id,"productId":moveProductId })
      if (contains == null) {
        var wishlistAdd = new WishList({
          user_id: user_id,
          productId:moveProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      res.send("moved")
    }
    if (updatedSize != undefined && sizeProductId != undefined) {
      await Cart.findOneAndUpdate({ productId: sizeProductId },
        { size: updatedSize }, null, function (err, cartObjs) {
          if (err) {
            console.log(err)
          }
          else {
            console.log("Original cartObj : ", cartObjs);
          }
        });
        res.send("size set")
    }
    if (updatedQty != undefined && qtyProductId != undefined) {
      await Cart.findOneAndUpdate({ productId: qtyProductId },
        { quantity: updatedQty }, null, function (err, cartObjs) {
          if (err) {
            console.log(err)
          }
          else {
            console.log("Original cartObj : ", cartObjs);
          }
        });
        res.send("qty set")
    }
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router