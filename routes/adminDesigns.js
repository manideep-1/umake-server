const express = require('express')
const router = express.Router()
const Customize_Attributes = require('../models/Customize_Attributes')
const CustomizeImg_Attributes = require('../models/CustomizeImg_Attributes')
const Customized_Object = require('../models/Customized_Object')
const User_Drafts = require('../models/User_Drafts')
const Image = require('../models/Image')
const async = require('async')

router.get('/',async(res,req,next)=>{
  res.send("Invalid Request ")
})
router.post('/', async (req, res, next) => {
  try {
    var draftId = req.body.draftId
    console.log("HEYY")
    //console.log(user_id)
    var admin_drafts = await Customized_Object.find({category:"admin"},{_id:1})
    console.log(admin_drafts)
    if(draftId != undefined && draftId != null)
    {

    var customized_object = await Customized_Object.findById(draftId)
    var front = customized_object.front
    var back = customized_object.back
    var frontImg = customized_object.frontImg
    var backImg = customized_object.backImg

    
    await Customized_Object.findByIdAndDelete(draftId, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted Product : ", docs); 
        } 
      });

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
        res.send("Deleted successfully")
      });
    
    }
    else if(admin_drafts!=null)
    {
        async.map(admin_drafts,function(draftId,done){
            Customized_Object.findById(draftId._id,function(err,customized_object){
                if(err) return next(err);
                async.series([
                    function(callback) {
                        async.map(customized_object.front,function(frontId,done){
                            Customize_Attributes.findById(frontId,function(err,customize_attributes_front){
                                if(err) return next(err);
                                done(null,customize_attributes_front)
                            })
                        },function(err,result){
                            if(err) return next(err);
                            callback(null,result)
                        })
                    },
                    // function(callback) {
                    //   Image.findOne({name:customized_object.color},function(err,image){
                    //     callback(null, image);
                    //   })
                    // },
                    function(callback) {
                        async.map(customized_object.back,function(backId,done){
                            Customize_Attributes.findById(backId,function(err,customize_attributes_back){
                                if(err) return next(err);
                                done(null,customize_attributes_back)
                            })
                        },function(err,result){
                            if(err) return next(err);
                            callback(null,result)
                        })
                    },
                    function(callback){
                        async.map(customized_object.frontImg,function(frontImgId,done){
                            CustomizeImg_Attributes.findById(frontImgId,function(err,customizeImg_attributes_front){
                                if(err) return next(err);
                                Image.findById(customizeImg_attributes_front.stickerId,function(err,sticker){
                                    done(null,{customizeImg_attributes_front,sticker})
                                })
                            })
                        },function(err,result){
                            if(err) return next(err);
                            callback(null,result)
                        })
                    },
                    function(callback)
                    {
                        async.map(customized_object.backImg,function(backImgId,done){
                            CustomizeImg_Attributes.findById(backImgId,function(err,customizeImg_attributes_back){
                                if(err) return next(err);
                                Image.findById(customizeImg_attributes_back.stickerId,function(err,sticker){
                                    done(null,{customizeImg_attributes_back,sticker})
                                })
                            })
                        },function(err,result){
                            if(err) return next(err);
                            callback(null,result)
                        })
                    }
                  ],
                  function(err, result) {
                    done(null,{arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3],draftId:draftId._id,
                    frontString:customized_object.frontImgString,backString:customized_object.backImgString})
                  });
            })
        },function(err,result){
            if(err) return next(err);
      
            res.json(result)
        })
    }
    else{
        res.send("Empty")
    }

  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router