const express = require("express");

const category_route = express();

const bodyParser = require("body-parser")
category_route.use(bodyParser.json());
category_route.use(bodyParser.urlencoded({extended:true}));

const auth = require("../middleware/auth");

const category_controller = require("../controllers/categoryController");

category_route.post('/add-category',category_controller.addCategory);

category_route.get('/get-categorys',category_controller.get_categories);
category_route.get('/:categoryid',category_controller.get_categorie);

module.exports = category_route;