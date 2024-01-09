const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const randomstring = require('randomstring');
const res = require('express/lib/response');

//refresh token
const fs = require('fs');

const sendResetPasswordMail = async(name,email,token)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.emailUser,
                pass:config,emailPassword
            }
        });

        const mailOptions = {
            from:config.emailUser,
            to:email,
            subject:'For Reset Password',
            html:'<p> Hii '+name+', Please copy the link <a href="http://127.0.0.1:3000/api/reset-password?token='+token+'"> and reset your password</a>'
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }
            else {
                console.log("Mail  has been sent:- ",info.response);
            }
        })
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

const create_token = async(id)=>{
    try {
        const token = await jwt.sign({_id:id},config.secret_jwt);
        return token;
   } catch (error) {
       res.status(400).send(error.message);
    }
}
const securePassword = async(password)=>{

    try{
        const passwordHash = await bcryptjs.hash(password,10);
        return passwordHash;

    } catch (error) {
        res.status(400).send(error.message);
    }
}
const register_user = async(req, res)=>{
    try {

        const spassword = await securePassword(req.body.password);

        const user = new User({
            userId:req.body.userId,
            userName:req.body.userName,
            email:req.body.email,
            password:spassword,
            mobileNo:req.body.mobileNo,
            imageUrl:req.body.imageUrl,
            restaurentId:req.body.restaurentId,
            role:req.body.role
      
        });

        const userData = await User.findOne({email:req.body.email});
        if(userData){
            res.status(200).send({success:false,msg:"This email is already exists"});
        }
        else{
          const user_data = await user.save();
          res.status(200).send({success:true,data:user_data});
        }


    } catch (error) {
        res.status(400).send(error.message);
    }
}
//get all users
const getUsers = async(req, res) => {
    try{ const users = await User.find({});
    res.status(200).send({success:true,msg:"User Data", data:users});
    }catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
//login Method
const user_login = async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email:email});
        if(userData){
          const passwordMatch = await bcryptjs.compare(password,userData.password);
          if(passwordMatch){
             const tokenData = await create_token(userData._id);
            const userResult = {
                userId:req.body.userId,
                userName:req.body.userName,
                email:req.body.email,
                password:spassword,
                mobileNo:req.body.mobileNo,
                imageUrl:req.body.imageUrl,
                restaurentId:req.body.restaurentId,
                role:req.body.role,
                token:tokenData
            }

            const response = {
                success:true,
                msg:"User Detailes",
                data:userResult
            }
            res.status(200).send(response);
        
          }
          else{
            res.status(200).send({success:false,msg:"Login details are incorrect"});

          }
        }
        else{
            res.status(200).send({success:false,msg:"Login details are incorrect"});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}
//update password
const update_password = async(req,res)=>{
     try {
        const user_id= req.body.user_id;
        const password = req.body.password;

        const data = await User.findOne({_id:user_id});
     if(data){
        const newPassword = await securePassword(password);
        const userData = await User.findByIdAndUpdate({_id:user_id},{ $set:{
          password : newPassword
        }});
        res.status(200).send({ success:true,msg:"your password has been updated"});
     } else {
        res.status(200).send({success:false, msg:"User Id not found!"})
     }
    } catch (error) {
        
        res.status(400).send(error.message);
     }
}


const forget_password = async(req, res)=>{
    try{
        const email = req.body.email;
        const userData = await User.findOne({email:email});
       if(userData){
         const randomString = randomstring.generate();
         const data = await User.updateOne({email:email},{$set:{token:randomString}});
         sendResetPasswordMail(userData.name,userData.email,randomString);
         res.status(200).send({success:true,msg:"please check your inbox of mail and reset your password."});
       } else {
        res.status(200).send({success:true,msg:"This email dose not exists."});
       }
    } catch (error){
        res.status(400).send({success:false,msg:error.message});
    }
}


const reset_password = async(req,res)=>{
    try {
        const token = req.query.token;
        const tokenData = await User.findOne({ token:token });
        if(tokenData){
            const password = req.body.password;
            const newPassword = await securePassword(password);
            const userData = await User.findByIdAndUpdate({_id:tokenData._id},{$set:{password:newPassword,token:''}},{new:true})
            res.status(200).send({success:true,msg:"User Password has been reset",data:userData});
        } else {
            res.status(200).send({success:true,msg:"This link has been expired."});
        }
        } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
//renew token
const renew_token = async(id)=>{
    try{
      const secret_jwt = config.secret_jwt;
      const newSecretJwt = randomstring.generate();

      fs.readFile('config/config.js','utf-8',function(err,data){
        if(err) throw err;
        var newValue = data.replace(new RegExp(secret_jwt,"g"),newSecretJwt);
        fs.writeFile('config/config.js',newValue,'utf-8',function(err,data){
            if(err) throw err;
            console.log("Done!");
        });
      });

      const token = await jwt.sign({_id:id},config.secret_jwt);
      return token;
     
    } catch (error){
        res.status(400).send({success:false,msg:error.message});
    }
}


//refresh token
const  refresh_token = async(req,res)=>{
    try{
        const user_id = req.body.user_id;
        const userData = await User.findById({_id:user_id});
        if(userData){
             const tokenData = await renew_token(user_id);
             const response = {
                user_id:user_id,
                token:tokenData
             }
             res.status(200).send({success:false,msg:"Refresh Token details",data:response});
        }

        else{
            res.status(200).send({success:false,msg:"User not found!"});
        }

    } catch (error){
        res.status(400).send({success:false,msg:error.message});
      
       
    }
}
// get single User
const getUser =  async(req,res)=>{
  try{
    const {userId} = req.params;
    const user =await User.findOne({userId});
    res.status(200).send({result:true,message:"User Data", data:user});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}
//update a User
const updateUser = async(req, res) => {
  try{
    const {userId} = req.params;
    const user =await User.findOneAndUpdate({userId}, req.body);
    //we cannot find any RestaurentId in database
    if(!user){
        res.status(400).send({result:false,msg:'cannot find any user with ID ${userId}'});
    }
    const updateduser = await User.findOne({userId});
    res.status(200).send({result:true,message:"User Data", data:updateduser});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}
//delete a users
const deleteUser = async(req, res) => {
  try{
    const {userId} = req.params;
    const user =await User.findOneAndDelete({userId});
    //we cannot find any user in database
    if(!user){
        res.status(400).send({result:false,msg:'cannot find any user with ID ${userId}'});
    }
    res.status(200).send({result:true,message:"User Data", data:user});
}catch (error) {
    res.status(400).send({result:false,msg:error.message});
}
}
module.exports = {
    register_user,
    user_login,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    update_password,
    forget_password,
    reset_password,
    refresh_token
}