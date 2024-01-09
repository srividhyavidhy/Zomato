const express = require("express");

const restaurent_route = express();

const bodyParser = require("body-parser")
restaurent_route.use(bodyParser.json());
restaurent_route.use(bodyParser.urlencoded({extended:true}));
const auth = require("../middleware/auth");
const restaurentController = require("../controllers/restaurentController");

restaurent_route.post('/addrestaurent',restaurentController.addRestaurent);
restaurent_route.get('/getrestaurents',restaurentController.getRestaurents);
restaurent_route.get('/resta/:restaurentId',restaurentController.getRestaurent);
restaurent_route.put('/resta/:restaurentId',restaurentController.updateRestaurent);
restaurent_route.delete('/resta/:restaurentId',restaurentController.deleteRestaurent);
restaurent_route.get('/search-restaurent',restaurentController.searchRestaurent);

module.exports = restaurent_route;