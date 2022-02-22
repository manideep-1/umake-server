const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const WishList = require('../models/Wishlist')
const Product = require('../models/Product')
const Customize_Attributes = require('../models/Customize_Attributes')
const CustomizeImg_Attributes = require('../models/CustomizeImg_Attributes')
const Customized_Object = require('../models/Customized_Object')
const Image = require('../models/Image')
const async = require('async')

const { route } = require('.')

 sortByProperty=(property)=>{  
  return function(a,b){  
     if(a[property] > b[property])  
        return 1;  
     else if(a[property] < b[property])  
        return -1;  
 
     return 0;  
  }  
}

sortByPropertyDesc=(property)=>{  
  return function(a,b){  
     if(a[property] < b[property])  
        return 1;  
     else if(a[property] > b[property])  
        return -1;  
 
     return 0;  
  }  
}

search = (array, targetValue) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == targetValue)
      return i;
  }
  return -1;
}

router.get('/men1/productView/:id', async (req, res, next) => {
  try {
    var productId = await req.params.id
    var product = await Product.findOne({_id:productId,type:"men1"}, { name: 1, actualPrice: 1, discount: 1, tag: 1,imageObjectId: 1})
    var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8","productId":productId })
    product = JSON.stringify(product)
    product = JSON.parse(product)
    if (await contains == null)
      product["inWishlist"] = await false;
    else 
      product["inWishlist"] = await true;


    Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
          product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3]}
          console.log(product)
          res.json(product)
        });
  })


    
    
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.get('/men2/productView/:id', async (req, res, next) => {
  try {
    var productId = req.params.id
    var product = await Product.findOne({_id:productId,type:"men2"}, { name: 1, actualPrice: 1, discount: 1, tag: 1,imageObjectId: 1})
    var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8","productId":productId })
    product = JSON.stringify(product)
    product = JSON.parse(product)
    if (contains == null)
      product["inWishlist"] = false;
    else
      product["inWishlist"] = true;
      Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
            product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3]}
            console.log(product)
            res.json(product)
          });
    })
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.get('/men3/productView/:id', async (req, res, next) => {
  try {
    var productId = req.params.id
    var product = await Product.findOne({_id:productId,type:"men3"}, { name: 1, actualPrice: 1, discount: 1, tag: 1,imageObjectId: 1})
    var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8","productId":productId })
    product = JSON.stringify(product)
    product = JSON.parse(product)
    if (contains == null)
      product["inWishlist"] = false;
    else
      product["inWishlist"] = true;
      Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
            product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3]}
            console.log(product)
            res.json(product)
          });
    })
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.get('/women1/productView/:id', async (req, res, next) => {
  try {
    var productId = req.params.id
    var product = await Product.findOne({_id:productId,type:"women1"}, { name: 1, actualPrice: 1, discount: 1, tag: 1,imageObjectId: 1 })
    var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8","productId":productId })
    product = JSON.stringify(product)
    product = JSON.parse(product)
    if (contains == null)
      product["inWishlist"] = false;
    else
      product["inWishlist"] = true;
      Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
            product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3]}
            console.log(product)
            res.json(product)
          });
    })
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.get('/women2/productView/:id', async (req, res, next) => {
  try {
    var productId = req.params.id
    var product = await Product.findOne({_id:productId,type:"women2"}, { name: 1, actualPrice: 1, discount: 1, tag: 1,imageObjectId: 1 })
    var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8","productId":productId })
    product = JSON.stringify(product)
    product = JSON.parse(product)
    if (contains == null)
      product["inWishlist"] = false;
    else
      product["inWishlist"] = true;
      Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
            product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3]}
            console.log(product)
            res.json(product)
          });
    })
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.get('/women3/productView/:id', async (req, res, next) => {
  try {
    var productId = req.params.id
    console.log(productId)
    var product = await Product.findOne({_id:productId,type:"women3"}, { name: 1, actualPrice: 1, discount: 1, tag: 1,imageObjectId: 1 })
    var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8","productId":productId })
    product = JSON.stringify(product)
    product = JSON.parse(product)
    if (contains == null)
      product["inWishlist"] = false;
    else
      product["inWishlist"] = true;
      Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
            product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3]}
            console.log(product)
            res.json(product)
          });
    })
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.get('/men1', async (req, res, next) => {
  try {
    var products = await Product.find({type:"men1"})
    products = JSON.stringify(products)
    products = JSON.parse(products)
    async.map(products,function(product,done) {
      WishList.findOne({productId:product._id},function(err, q){
        if(err) return next(err);
        if(q==null)
          product["inWishlist"]=false;
        else
          product["inWishlist"]=true;

          Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
        
                // product.location="/Designs/men1/impostor.png"
                product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3],
                frontString:customized_object.frontImgString, backString:customized_object.backImgString}
                done(null,product)
              });
        })

      });
    }, function(err, result) {
      if(err) return next(err);
            res.json(result);
    })
  }
  catch (err) {
    res.send("Error " + err)
  }
})

router.get('/men2', async (req, res, next) => {
  try {
    var products = await Product.find({type:"men2"})
    products = JSON.stringify(products)
    products = JSON.parse(products)
    async.map(products,function(product,done) {
      WishList.findOne({productId:product._id},function(err, q){
        if(err) return next(err);
        if(q==null)
          product["inWishlist"]=false;
        else
          product["inWishlist"]=true;

          Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
        

                product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3],
                  frontString:customized_object.frontImgString, backString:customized_object.backImgString}
                done(null,product)
              });
        })

      });
    }, function(err, result) {
      if(err) return next(err);
            res.json(result);
    })
  }
  catch (err) {
    res.send("Error " + err)
  }
})

router.get('/men3', async (req, res, next) => {
  try {
    var products = await Product.find({type:"men3"})
    products = JSON.stringify(products)
    products = JSON.parse(products)
    async.map(products,function(product,done) {
      WishList.findOne({productId:product._id},function(err, q){
        if(err) return next(err);
        if(q==null)
          product["inWishlist"]=false;
        else
          product["inWishlist"]=true;

          Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
        

                product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3],
                  frontString:customized_object.frontImgString, backString:customized_object.backImgString}
                done(null,product)
              });
        })

      });
    }, function(err, result) {
      if(err) return next(err);
            res.json(result);
    })
  }
  catch (err) {
    res.send("Error " + err)
  }
})

router.get('/women1', async (req, res, next) => {
  try {
    var products = await Product.find({type:"women1"})
    products = JSON.stringify(products)
    products = JSON.parse(products)
    async.map(products,function(product,done) {
      WishList.findOne({productId:product._id},function(err, q){
        if(err) return next(err);
        if(q==null)
          product["inWishlist"]=false;
        else
          product["inWishlist"]=true;

          Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
        

                product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3],
                  frontString:customized_object.frontImgString, backString:customized_object.backImgString}
                done(null,product)
              });
        })

      });
    }, function(err, result) {
      if(err) return next(err);
            res.json(result);
    })
  }
  catch (err) {
    res.send("Error " + err)
  }
})

router.get('/women2', async (req, res, next) => {
  try {
    var products = await Product.find({type:"women2"})
    products = JSON.stringify(products)
    products = JSON.parse(products)
    async.map(products,function(product,done) {
      WishList.findOne({productId:product._id},function(err, q){
        if(err) return next(err);
        if(q==null)
          product["inWishlist"]=false;
        else
          product["inWishlist"]=true;

          Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
        

                product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3],
                  frontString:customized_object.frontImgString, backString:customized_object.backImgString}
                done(null,product)
              });
        })

      });
    }, function(err, result) {
      if(err) return next(err);
            res.json(result);
    })
  }
  catch (err) {
    res.send("Error " + err)
  }
})

router.get('/women3', async (req, res, next) => {
  try {
    var products = await Product.find({type:"women3"})
    products = JSON.stringify(products)
    products = JSON.parse(products)
    async.map(products,function(product,done) {
      WishList.findOne({productId:product._id},function(err, q){
        if(err) return next(err);
        if(q==null)
          product["inWishlist"]=false;
        else
          product["inWishlist"]=true;

          Customized_Object.findById(product.imageObjectId,function(err,customized_object){
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
                product.customized_object = {arrayF:result[0],imageColor:customized_object.color,arrayB:result[1],arrayFImg:result[2],arrayBImg:result[3],
                  frontString:customized_object.frontImgString, backString:customized_object.backImgString}
                done(null,product)
              });
        })

      });
    }, function(err, result) {
      if(err) return next(err);
            res.json(result);
    })
  }
  catch (err) {
    res.send("Error " + err)
  }
})

router.post('/men1/:id', async (req,res,next)=>{
  try{
    var reqProductId = req.params.id
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      console.log(response)
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
})

router.post('/men2/:id', async (req,res,next)=>{
  try{
    var reqProductId = req.params.id
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      console.log(response)
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
})

router.post('/men3/:id', async (req,res,next)=>{
  try{
    var reqProductId = req.params.id
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      console.log(response)
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
})

router.post('/women1/:id', async (req,res,next)=>{
  try{
    var reqProductId = req.params.id
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      console.log(response)
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
})

router.post('/women2/:id', async (req,res,next)=>{
  try{
    var reqProductId = req.params.id
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      console.log(response)
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
})

router.post('/women3/:id', async (req,res,next)=>{
  try{
    var reqProductId = req.params.id
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      console.log(response)
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
})

router.post('/men1/productView/:id', async (req, res, next) => {
  try {
    var reqProductId = req.params.id
    var productSize = req.body.size
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && productSize != undefined) {
      var contains = await Cart.findOne({ "user_id": "5f15637a09a55c4e38972bc8", productId: reqProductId })
      if (contains == null) {
        var cartUpdate = new Cart({
          user_id: "5f15637a09a55c4e38972bc8",
          productId: reqProductId, size: productSize, quantity: 1
        })
        response = "Added to cart"
        cartUpdate.save(function (err, response) {
          if (err)
            console.log(err)
          else {
            console.log("Moved Product : ", reqProductId);
          }
        });
      }
      else {
        response = "Already Exists in Cart"
      }
      res.send(response)
    }
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      console.log(inWishlist)
      console.log(contains)
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.post('/men2/productView/:id', async (req, res, next) => {
  try {
    var reqProductId = req.params.id
    var productSize = req.body.size
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && productSize != undefined) {
      var contains = await Cart.findOne({ "user_id": "5f15637a09a55c4e38972bc8", productId: reqProductId })
      if (contains == null) {
        var cartUpdate = new Cart({
          user_id: "5f15637a09a55c4e38972bc8",
          productId: reqProductId, size: productSize, quantity: 1
        })
        response = "Added to cart"
        cartUpdate.save(function (err, response) {
          if (err)
            console.log(err)
          else {
            console.log("Moved Product : ", reqProductId);
          }
        });
      }
      else {
        response = "Already Exists in Cart"
      }
      res.send(response)
    }
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      console.log(inWishlist)
      console.log(contains)
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.post('/men3/productView/:id', async (req, res, next) => {
  try {
    var reqProductId = req.params.id
    var productSize = req.body.size
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && productSize != undefined) {
      var contains = await Cart.findOne({ "user_id": "5f15637a09a55c4e38972bc8", productId: reqProductId })
      if (contains == null) {
        var cartUpdate = new Cart({
          user_id: "5f15637a09a55c4e38972bc8",
          productId: reqProductId, size: productSize, quantity: 1
        })
        response = "Added to cart"
        cartUpdate.save(function (err, response) {
          if (err)
            console.log(err)
          else {
            console.log("Moved Product : ", reqProductId);
          }
        });
      }
      else {
        response = "Already Exists in Cart"
      }
      res.send(response)
    }
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      console.log(inWishlist)
      console.log(contains)
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.post('/women1/productView/:id', async (req, res, next) => {
  try {
    var reqProductId = req.params.id
    var productSize = req.body.size
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && productSize != undefined) {
      var contains = await Cart.findOne({ "user_id": "5f15637a09a55c4e38972bc8", productId: reqProductId })
      if (contains == null) {
        var cartUpdate = new Cart({
          user_id: "5f15637a09a55c4e38972bc8",
          productId: reqProductId, size: productSize, quantity: 1
        })
        response = "Added to cart"
        cartUpdate.save(function (err, response) {
          if (err)
            console.log(err)
          else {
            console.log("Moved Product : ", reqProductId);
          }
        });
      }
      else {
        response = "Already Exists in Cart"
      }
      res.send(response)
    }
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      console.log(inWishlist)
      console.log(contains)
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.post('/women2/productView/:id', async (req, res, next) => {
  try {
    var reqProductId = req.params.id
    var productSize = req.body.size
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && productSize != undefined) {
      var contains = await Cart.findOne({ "user_id": "5f15637a09a55c4e38972bc8", productId: reqProductId })
      if (contains == null) {
        var cartUpdate = new Cart({
          user_id: "5f15637a09a55c4e38972bc8",
          productId: reqProductId, size: productSize, quantity: 1
        })
        response = "Added to cart"
        cartUpdate.save(function (err, response) {
          if (err)
            console.log(err)
          else {
            console.log("Moved Product : ", reqProductId);
          }
        });
      }
      else {
        response = "Already Exists in Cart"
      }
      res.send(response)
    }
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      console.log(inWishlist)
      console.log(contains)
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
});

router.post('/women3/productView/:id', async (req, res, next) => {
  try {
    var reqProductId = req.params.id
    var productSize = req.body.size
    var inWishlist = req.body.inWishlist
    var response = "No response"
    if (reqProductId != undefined && productSize != undefined) {
      var contains = await Cart.findOne({ "user_id": "5f15637a09a55c4e38972bc8", productId: reqProductId })
      if (contains == null) {
        var cartUpdate = new Cart({
          user_id: "5f15637a09a55c4e38972bc8",
          productId: reqProductId, size: productSize, quantity: 1
        })
        response = "Added to cart"
        cartUpdate.save(function (err, response) {
          if (err)
            console.log(err)
          else {
            console.log("Moved Product : ", reqProductId);
          }
        });
      }
      else {
        response = "Already Exists in Cart"
      }
      res.send(response)
    }
    if (reqProductId != undefined && inWishlist != undefined) {
      var contains = await WishList.findOne({ "user_id": "5f15637a09a55c4e38972bc8",productId:reqProductId })
      console.log(inWishlist)
      console.log(contains)
      if (inWishlist == true && contains == null) {
        response = "Added to Wishlist"
        var wishlistAdd = new WishList({
          user_id: "5f15637a09a55c4e38972bc8",
          productId:reqProductId
        })
        wishlistAdd.save().then(k => {
          console.log(k);
        });
      }
      else if (inWishlist == false && contains != null) {
        response = "Removed from Wishlist"
        WishList.findOneAndDelete({user_id:"5f15637a09a55c4e38972bc8",productId:reqProductId}, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log("Deleted Product : ", docs); 
          } 
        });
      }
      else {
        response = "Something Wrong"
      }
      res.send(response)
    }
  }
  catch (err) {
    res.send('Error' + err);
  }
});


module.exports = router