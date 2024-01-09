const  Restaurent = require("../models/restaurentModel");

const addRestaurent =  async(req, res) => {
  try{
    const restaurent =await Restaurent.create(req.body);
    res.status(200).send({result:true,message:"Restaurent Data", data:restaurent});
}
catch (error) {
res.status(400).send({result:false,msg:error.message});
}
    };
//get all restaurent
const getRestaurents = async(req, res) => {
    try{ const restaurents = await Restaurent.find({});
    res.status(200).send({result:true,message:"Restaurent Data", data:restaurents});
    }catch (error) {
        res.status(400).send({result:false,msg:error.message});
    }
}
// get single restaurent
const getRestaurent =  async(req,res)=>{
  try{
    const {restaurentId} = req.params;
    const restaurent =await Restaurent.findOne({restaurentId});
    res.status(200).send({result:true,message:"Restaurent Data", data:restaurent});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}
//update a Restaurent
const updateRestaurent = async(req, res) => {
  try{
    const {restaurentId} = req.params;
    const restaurent =await Restaurent.findOneAndUpdate({restaurentId}, req.body);
    //we cannot find any RestaurentId in database
    if(!restaurent){
        res.status(400).send({result:false,msg:'cannot find any product with ID ${restaurentId}'});
    }
    const updatedrestaurent = await Restaurent.findOne({restaurentId});
    res.status(200).send({result:true,message:"Restaurent Data", data:updatedrestaurent});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}
//delete a Restaurents
const deleteRestaurent = async(req, res) => {
  try{
    const {restaurentId} = req.params;
    const restaurent =await Restaurent.findOneAndDelete({restaurentId});
    //we cannot find any Restaurent in database
    if(!restaurent){
        res.status(400).send({result:false,msg:'cannot find any product with ID ${restaurentId}'});
    }
    res.status(200).send({result:true,message:"Product Data", data:restaurent});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}
//search Restaurents
const searchRestaurent = async(req,res)=>{
    try {
      var search =req.body.search;
      var restaurent_data = await Restaurent.find({"retaurentName":{ $regex: ".*"+search+".*",$options:'i' }});
      if(restaurent_data.length > 0){
          res.status(200).send({result:true,message:"Restaurents Details",data:restaurent_data});
      }
      else{
        res.status(200).send({result:true,message:"Products not found!"});  
      }
    } catch (error) {
      res.status(400).send({result:false,msg:error.message});
    }
  }


module.exports ={
          addRestaurent,
          getRestaurents,
          getRestaurent,
          updateRestaurent,
          deleteRestaurent,
          searchRestaurent
}