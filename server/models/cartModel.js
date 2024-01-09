const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
      userId:{
       type:String,
       required:true
    },
     itemId:{
        type:Number,
        required:true
    },
     cartId:{
          type:Number,
          required:true
      },
     quantity:{
        type:Number,
        required:true
    },
    price:{
          type:Number,
          required:true
      },
      foodName:{
          type:String,
          required:true
      },
      addedData:{
          type:Number,
          required:true
      },
      Description:{
          type:String,
          required:true
      },
      imageUrl:{
          type:Number,
          required:true
      },
  
});

const Cart= mongoose.model("Cart",cartSchema);
module.exports = Cart;