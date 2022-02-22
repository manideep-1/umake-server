const express = require('express')
const router = express.Router()
const WishList = require('../models/Wishlist')
const Product = require('../models/Product');
const Customize_Attributes = require('../models/Customize_Attributes')
const CustomizeImg_Attributes = require('../models/CustomizeImg_Attributes')
const Customized_Object = require('../models/Customized_Object')
const Cart = require('../models/Cart');
const Image = require('../models/Image')
const async = require('async')

router.get('/',async(res,req,next)=>{
  res.send("Invalid Request ")
})
router.post('/', async (req, res, next) => {
  try {
    var removeProductId = req.body.removeProductId
    var moveProductId = req.body.moveProductId
    var size = req.body.size
    var user_id = req.body.user_id
    var mount = req.body.mount
    if(user_id != undefined && mount == true)
    {
      var wishlist = await WishList.find({ "user_id": user_id })
      async.map(wishlist,function(wish,done){
        Product.findById(wish.productId,function(err,product){
          if(err) return next(err);
          product=product.toObject();

          Customized_Object.findById(product.imageObjectId,function(err,customized_object){
            if(err) return next(err);
            product.frontString = customized_object.frontImgString
            product.backString = customized_object.backImgString
            done(null,product)
        })
      })
      },function(err,result){
        if(err) return next(err);
        console.log("mounted data")
        console.log(result)
        res.json(result)
      })
    }
    if (removeProductId != undefined) {
      await  WishList.findOneAndDelete({user_id:user_id,productId:removeProductId}, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted Product : ", docs); 
        } 
      });
    }
    console.log("moveProductId " + moveProductId)
    console.log("size "+size)
    if (moveProductId != undefined && size != undefined) {
      var contains = await Cart.findOne({ "user_id": user_id, productId: moveProductId })
      console.log(contains)
      await WishList.findOneAndDelete({user_id:user_id,productId:moveProductId}, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted Product : ", docs); 
        } 
      });
      if (contains == null) {
        var cartUpdate =await new Cart({
          user_id: user_id,
          productId: moveProductId, size: size, quantity: 1
        })
        cartUpdate.save(function (err, cart) {
          if (err)
            console.log(err)
          else
            console.log("Moved Product : ", moveProductId);
        });
      }
      res.send("moved")
    }
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router