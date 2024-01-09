const Category = require("../models/categoryModel");


const addCategory = async(req,res)=>{
    try{
        const category =await Category.create(req.body);
        res.status(200).send({success:true,msg:"Category Data", data:category});
    }
catch (error) {
res.status(400).send({success:false,msg:error.message});
}
}

//get all products
const get_categories = async(req, res) => {
     try{ const categorys = await Category.find({});
    res.status(200).send({result:true,message:"Category Data", data:categorys});
    }catch (error) {
        res.status(400).send({result:false,msg:error.message});
    }
}
// get single restaurent
const get_categorie =  async(req,res)=>{
    try{
   
      const {categoryid} = req.params;
    const category =await Category.findOne({categoryid});
    res.status(200).send({result:true,message:"Restaurent Data", data:category});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}



module.exports ={
    addCategory,
    get_categories,
    get_categorie
}