var express = require('express');
var router = express.Router();
const multer = require("multer");
const upload = multer({});
const Image = require('../models/Image')


router.post("/",async(req,res,next)=>{
    const category = req.body.category;
    const subCategory = req.body.subCategory;
    const name = req.body.name;
    var sno = req.body.sno;
    const imageType = req.body.imageType
    const left = req.body.left
    const right = req.body.right

    sno = parseInt(sno)
    console.log(category + " " + subCategory+" "+name+" "+sno+" "+typeof(sno))
    const image = new Image({category: category, name: name,subCategory:subCategory,sno:sno,imageType:imageType,left:left,
    right:right});
    image.save()
    .then(img => {
        console.log("saved")
        res.send("saved")
    })
})

module.exports = router;

