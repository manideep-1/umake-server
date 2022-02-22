var express = require('express');
var router = express.Router();
const multer = require("multer");
const Image = require('../models/Image')

router.post("/",async(req,res,next)=>{
    var category = req.body.category
    var subCategory = req.body.subCategory
    var sno = req.body.sno
    var name = req.body.name
    var left = req.body.left
    var right = req.body.right
    var imageType = req.body.imageType
    var stickerId = req.body.stickerId
    if(category != undefined && subCategory != undefined)
    {
        const image = await Image.find({category:category,subCategory:subCategory}).sort("sno");
        res.send(image)
    }
    if(sno != undefined && name != undefined && stickerId != undefined)
    {
        var image = await Image.findByIdAndUpdate(stickerId,{$set:{sno:sno,name:name,category:category,subCategory:subCategory,
        left:left,right:right,imageType:imageType}})
        res.send("successful")
    }
    else if(stickerId != undefined && name==undefined && sno==undefined)
    {
        await Image.findByIdAndDelete(stickerId, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Deleted Image : ", docs); 
            } 
          });
    }
})

module.exports = router;