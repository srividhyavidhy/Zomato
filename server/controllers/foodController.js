const Food = require("../models/foodModel");

const addFood =  async(req, res) => {
  try{
    const food =await Food.create(req.body);
    res.status(200).send({result:true,message:"Food Data", data:food});
}
catch (error) {
res.status(400).send({result:false,msg:error.message});
}
    };
//get all foods
const getFoods = async(req, res) => {
    try{ const foods = await Food.find({});
    res.status(200).send({result:true,message:"Food Data", data:foods});
    }catch (error) {
        res.status(400).send({result:false,msg:error.message});
    }
}
// get single food
const getFood =  async(req,res)=>{
  try{
    const {foodId} = req.params;
    const food =await Food.findOne({foodId});
    res.status(200).send({result:true,message:"Food Data", data:food});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}
//update a Food
const updateFood = async(req, res) => {
  try{
    const {foodId} = req.params;
    const food =await Food.findOneAndUpdate({foodId}, req.body);
    //we cannot find any RestaurentId in database
    if(!food){
        res.status(400).send({result:false,msg:'cannot find any product with ID ${foodId}'});
    }
    const updatedfood = await Food.findOne({foodId});
    res.status(200).send({result:true,message:"Food Data", data:updatedfood});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}
//delete a Foods
const deleteFood = async(req, res) => {
  try{
    const {foodId} = req.params;
    const food =await Food.findOneAndDelete({foodId});
    //we cannot find any Restaurent in database
    if(!food){
        res.status(400).send({result:false,msg:'cannot find any product with ID ${foodId}'});
    }
    res.status(200).send({result:true,message:"Food Data", data:food});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}
//search Foods
const searchFood = async(req,res)=>{
    try {
      var search =req.body.search;
      var food_data = await Food.find({"foodName":{ $regex: ".*"+search+".*",$options:'i' }});
      if(food_data.length > 0){
          res.status(200).send({result:true,message:"Foods Details",data:food_data});
      }
      else{
        res.status(200).send({result:true,message:"Foods not found!"});  
      }
    } catch (error) {
      res.status(400).send({result:false,msg:error.message});
    }
  }


module.exports ={
          addFood,
          getFoods,
          getFood,
          updateFood,
          deleteFood,
          searchFood
}