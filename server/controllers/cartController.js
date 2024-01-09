const Cart = require("../models/cartModel");

//count data
const add_to_cart = async(req, res)=> {
    try {
     
         const cart_obj =  new Cart({
             
             price:req.body.price,
             quantity:req.body.quantity,
             userId:req.body.userId,
             itemId:req.body.itemId,
             cartId:req.body.cartId,
             foodName:req.body.foodName,
             addedData:req.body.addedData,
             Description:req.body.Description,
             imageUrl:req.body.imageUrl
    
          });
          const cartData = await cart_obj.save();

      res.status(200).send({success:true,msg:"Cart Food Details", data:cartData});

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

module.exports ={
    add_to_cart
}