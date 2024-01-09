const express = require("express");

const food_route = express();

const bodyParser = require("body-parser")
food_route.use(bodyParser.json());
food_route.use(bodyParser.urlencoded({extended:true}));
const auth = require("../middleware/auth");
const foodController = require("../controllers/foodController");

food_route.post('/addfood',foodController.addFood);
food_route.get('/getfoods',foodController.getFoods);
food_route.get('/food/:foodId',foodController.getFood);
food_route.put('/food/:foodId',foodController.updateFood);
food_route.delete('/food/:foodId',foodController.deleteFood);
food_route.get('/search-food',foodController.searchFood);

module.exports = food_route;