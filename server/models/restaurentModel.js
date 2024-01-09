const mongoose = require("mongoose");

const RestaurentSchema = mongoose.Schema({
    categoryId:{
          type:Number,
          required:true
      },
    userName:{
        type:String,
        required:true
    },
    restaurentId:{
        type:Number,
        required:true
    },
    restaurentName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    categoryName:{
        type:String,
        required:true
    },
    openingHours:{
          type:String,
          required:true
      },
    deliveryTimeSpan:{
          type:String,
          required:true
      },
     availability:{
          type:Boolean,
          required:true
     },
    imageUrl:{
        type:String,
        required:false,
       },
});
const Restaurent = mongoose.model("Restaurent",RestaurentSchema);
module.exports = Restaurent;