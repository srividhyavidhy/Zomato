const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId:{
       type:String,
       required:true
    },
     orderId:{
        type:Number,
        required:true
    },
     restaurentId:{
          type:Number,
          required:true
      },
      orderData:{
          type:String,
          required:true
      },
     totalAmount:{
        type:Number,
        required:true
    },
 
      restaurentName:{
          type:String,
          required:true
      },
      
      userName:{
          type:String,
          required:true
      },
      mobileNo:{
          type:Number,
          required:true
      },
  
});

const Order= mongoose.model("Order",orderSchema);
module.exports = Order;