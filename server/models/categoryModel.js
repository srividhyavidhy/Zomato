const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = mongoose.Schema(
    {
    categoryid:{
          type:Number,
          required:true
    },
    categoryName:{
          type:String,
          required:true
      },

      imageUrl:{
          type:String,
          required:true
      },
},
{ timestamps: true }
);

const Category= mongoose.model("Category",categorySchema);
module.exports = Category;