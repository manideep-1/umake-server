const express = require('express')
const router = express.Router()
const Customize_Attributes = require('../models/Customize_Attributes')
const CustomizeImg_Attributes = require('../models/CustomizeImg_Attributes')
const Customized_Object = require('../models/Customized_Object')
const Image = require('../models/Image')
const async = require('async')
const Product = require('../models/Product')
const { ConnectionStates } = require('mongoose')

router.get('/',async(req,res)=>{
    // const images = await Image.find({category:"emojis"});
    console.log("hi")
    // res.send(images)
})
router.post('/', async (req, res, next) => {
    try {
        var frontArray = req.body.frontArray
        var backArray = req.body.backArray
        var frontImgArray = req.body.frontImgArray
        var backImgArray = req.body.backImgArray
        var user_id = req.body.user_id
        var draftId = req.body.draftId
        var color = req.body.color
        var category = req.body.category
        var subCategory = req.body.subCategory
        var front_ids = []
        var back_ids = []
        var frontImg_ids = []
        var backImg_ids = []
        var response = "No response"
        if(category != undefined && subCategory != undefined)
        {
            images = await Image.find({category:category,subCategory:subCategory}).sort("sno");
        }
        if(draftId==null)
        {
            if (frontArray.length >= 1) {
                for(var i=0;i<frontArray.length;i++)
                {
                    var customizeAttributesUpdate = await new Customize_Attributes({
                        element: frontArray[i].element, fontName: frontArray[i].fontName,
                        color: frontArray[i].color, alignment: frontArray[i].alignment, bold: frontArray[i].bold, underline: frontArray[i].underline,
                        italic: frontArray[i].italic, fontSize: frontArray[i].fontSize, selected: frontArray[i].selected,
                        deltaPosition: frontArray[i].deltaPosition,category:"admin"
                    })
                    await customizeAttributesUpdate.save((err, cart) => {
                        if (err)
                            console.log(err)
                        else
                            console.log("success front attributes");
                    });
                    front_ids.push(customizeAttributesUpdate._id)
                }
            }
            if (backArray.length >= 1) {
                for(var i=0;i<backArray.length;i++)
                {
                    var customizeAttributesUpdate = await new Customize_Attributes({
                        element: backArray[i].element, fontName: backArray[i].fontName,
                        color: backArray[i].color, alignment: backArray[i].alignment, bold: backArray[i].bold, underline: backArray[i].underline,
                        italic: backArray[i].italic, fontSize: backArray[i].fontSize, selected: backArray[i].selected,
                        deltaPosition: backArray[i].deltaPosition,category:"admin"
                    })
                    await customizeAttributesUpdate.save((err, cart) => {
                        if (err)
                            console.log(err)
                        else
                            console.log("success back attributes");
                    });
                    back_ids.push(customizeAttributesUpdate._id)
                }
            }
            if (frontImgArray.length >= 1) {
                for(var i=0;i<frontImgArray.length;i++)
                {
                    var customizeImgAttributesUpdate = await new CustomizeImg_Attributes({
                        stickerId: frontImgArray[i].stickerId, height: frontImgArray[i].height,
                        deltaPosition: frontImgArray[i].deltaPosition,category:"admin"
                    })
                    await customizeImgAttributesUpdate.save((err, cart) => {
                        if (err)
                            console.log(err)
                        else
                            console.log("success front Image attributes");
                    });
                    frontImg_ids.push(customizeImgAttributesUpdate._id)
                }
            }
            if (backImgArray.length >= 1) {
                for(var i=0;i<backImgArray.length;i++)
                {
                    var customizeImgAttributesUpdate = await new CustomizeImg_Attributes({
                        stickerId: backImgArray[i].stickerId, height: backImgArray[i].height,
                        deltaPosition: backImgArray[i].deltaPosition,category:"admin"
                    })
                    await customizeImgAttributesUpdate.save((err, cart) => {
                        if (err)
                            console.log(err)
                        else
                            console.log("success back Image attributes");
                    });
                    backImg_ids.push(customizeImgAttributesUpdate._id)
                }
            }
            if (front_ids.length != 0 || back_ids.length != 0 || frontImg_ids.length != 0 || backImg_ids.length != 0) {
                var customizedObjectUpdate = await new Customized_Object({color:color, front: front_ids, back: back_ids, frontImg: frontImg_ids,
                                                                        backImg: backImg_ids, category:"admin",frontImgString:null,
                                                                        backImgString:null})
              
                var addedDesign = new Product({
                name:req.body.image_name,
                available:false,
                location:"Designs/"+req.body.image_category+"/"+req.body.image_name+".png",
               imageObjectId:null,
               actualPrice:500,
                discount: 20,
                type:"men1",
               tag:"trending",
               imageObjectId:customizedObjectUpdate._id,
             
            })
            addedDesign.save()
            .then(() => {
                console.log("Design Added"); // Success 
            }).catch((error) => {
                console.log(error); // Failure 
            });    

                await customizedObjectUpdate.save((err, cart) => {
                    if (err)
                        console.log(err)
                    else
                        console.log("success objectsssss");
                });
                response="saved successfully"
                draftId=customizedObjectUpdate._id
            }
        }
        else
        {
            if(frontArray.length > 0 || frontImgArray.length > 0 || backArray.length > 0 || backImgArray.length >0)
            {
                var customized_object = await Customized_Object.findById(draftId)
                var front = customized_object.front
                var back = customized_object.back
                var frontImg = customized_object.frontImg
                var backImg = customized_object.backImg


                if (frontArray.length >= 1) {
                    for(var i=0;i<frontArray.length;i++)
                    {
                        var customizeAttributesUpdate = await new Customize_Attributes({
                            element: frontArray[i].element, fontName: frontArray[i].fontName,
                            color: frontArray[i].color, alignment: frontArray[i].alignment, bold: frontArray[i].bold, underline: frontArray[i].underline,
                            italic: frontArray[i].italic, fontSize: frontArray[i].fontSize, selected: frontArray[i].selected,
                            deltaPosition: frontArray[i].deltaPosition,category:"admin"
                        })
                        await customizeAttributesUpdate.save((err, cart) => {
                            if (err)
                                console.log(err)
                            else
                                console.log("success front attributes");
                        });
                        front_ids.push(customizeAttributesUpdate._id)
                    }
                }
                if (backArray.length >= 1) {
                    for(var i=0;i<backArray.length;i++)
                    {
                        var customizeAttributesUpdate = await new Customize_Attributes({
                            element: backArray[i].element, fontName: backArray[i].fontName,
                            color: backArray[i].color, alignment: backArray[i].alignment, bold: backArray[i].bold, underline: backArray[i].underline,
                            italic: backArray[i].italic, fontSize: backArray[i].fontSize, selected: backArray[i].selected,
                            deltaPosition: backArray[i].deltaPosition,category:"admin"
                        })
                        await customizeAttributesUpdate.save((err, cart) => {
                            if (err)
                                console.log(err)
                            else
                                console.log("success back attributes");
                        });
                        back_ids.push(customizeAttributesUpdate._id)
                    }
                }
                if (frontImgArray.length >= 1) {
                    for(var i=0;i<frontImgArray.length;i++)
                    {
                        var customizeImgAttributesUpdate = await new CustomizeImg_Attributes({
                            stickerId: frontImgArray[i].stickerId, height: frontImgArray[i].height,
                            deltaPosition: frontImgArray[i].deltaPosition,category:"admin"
                        })
                        await customizeImgAttributesUpdate.save((err, cart) => {
                            if (err)
                                console.log(err)
                            else
                                console.log("success front Image attributes");
                        });
                        frontImg_ids.push(customizeImgAttributesUpdate._id)
                    }
                }
                if (backImgArray.length >= 1) {
                    for(var i=0;i<backImgArray.length;i++)
                    {
                        var customizeImgAttributesUpdate = await new CustomizeImg_Attributes({
                            stickerId: backImgArray[i].stickerId, height: backImgArray[i].height,
                            deltaPosition: backImgArray[i].deltaPosition,category:"admin"
                        })
                        await customizeImgAttributesUpdate.save((err, cart) => {
                            if (err)
                                console.log(err)
                            else
                                console.log("success back Image attributes");
                        });
                        backImg_ids.push(customizeImgAttributesUpdate._id)
                    }
                }

                customized_object = await Customized_Object.findByIdAndUpdate(draftId,{
                    $set:{color:color, front: front_ids, back: back_ids, frontImg: frontImg_ids,
                        backImg: backImg_ids, category:"admin",frontImgString:null,
                        backImgString:null}
                },function(err,res){
                    if(err)
                    console.log(err)
                    else
                    response="Updated successfully"
                })
                async.series([
                    function(callback) {
                        async.map(front,function(frontId,done){
                            Customize_Attributes.findByIdAndDelete(frontId, function (err, docs) { 
                                if (err){ 
                                    done(null,"yes") 
                                } 
                                else{ 
                                    console.log("Deleted Product : ", docs); 
                                } 
                              });
                        },function(err,result){
                            if(err) return next(err)
                        })
                      callback(null, 1);
                    },
                    function(callback) {
                        async.map(back,function(backId,done){
                            Customize_Attributes.findByIdAndDelete(backId, function (err, docs) { 
                                if (err){ 
                                    done(null,"yes") 
                                } 
                                else{ 
                                    console.log("Deleted Product : ", docs); 
                                } 
                              });
                        },function(err,result){
                            if(err) return next(err)
                        })
                      callback(null, 2);
                    },
                    function(callback) {
                        async.map(frontImg,function(frontId,done){
                            CustomizeImg_Attributes.findByIdAndDelete(frontId, function (err, docs) { 
                                if (err){ 
                                    done(null,"yes") 
                                } 
                                else{ 
                                    console.log("Deleted Product : ", docs); 
                                } 
                              });
                        },function(err,result){
                            if(err) return next(err)
                        })
                      callback(null, 3);
                    },
                    function(callback){
                        async.map(backImg,function(backId,done){
                            CustomizeImg_Attributes.findByIdAndDelete(backId, function (err, docs) { 
                                if (err){ 
                                    done(null,"yes") 
                                } 
                                else{ 
                                    console.log("Deleted Product : ", docs); 
                                } 
                              });
                        },function(err,result){
                            if(err) return next(err)
                        })
                    
                        callback(null, 4)
                    }
                  ],
                  function(err, results) {
                    console.log("Deleted successfully")
                  });
            }
            else
            {
                response="can't be updated as it's empty"
            }
        }
        res.json({response})
    }
    catch (err) {
        res.send('Error' + err);
    }
});

module.exports = router