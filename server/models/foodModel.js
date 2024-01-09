const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    foodId:{
          type:Number,
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
    foodName:{
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
   availability:{
          type:Boolean,
          required:true
     },
    imageUrl:{
        type:String,
        required:false,
       },
});
const Food = mongoose.model("Food",foodSchema);
module.exports = Food;