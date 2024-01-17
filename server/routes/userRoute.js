const express = require("express");
const user_route = express();
const bodyParser = require("body-parser")
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));


const user_controller = require("../controllers/userController");
const auth = require("../middleware/auth");
user_route.post('/register',user_controller.register_user);
user_route.post('/login', user_controller.user_login);
user_route.get('/user/:userId',user_controller.getUser);
user_route.put('/user/:userId',user_controller.updateUser);
user_route.delete('/user/:userId',user_controller.deleteUser);
user_route.get('/getallUsers',user_controller.getUsers)
user_route.get('/signout',user_controller.signout)
//update password route
user_route.post('/update-password',auth,user_controller.update_password)

//forget-password
user_route.post('/forget-password', user_controller.forget_password)
user_route.get('/get-users',user_controller.getUsers);
user_route.get('/reset-password', user_controller.reset_password);

user_route.post('/refresh-token',auth,user_controller.refresh_token);

module.exports = user_route;