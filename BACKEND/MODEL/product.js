const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  productname:{type:String,required:true},
  productid:{type:Number,required:true},
  productprice:{type:String,required:true},
  producttitle:{type:String,required:true},
  productthumbnail:{type:String,default:true},
  productcategory:{type:String,required:true},
  productrating:{type:Number,required:true},
  productquantity:{type:Number,required:true},
})

const productmodel = new mongoose.model("products",productSchema);

module.exports = productmodel;