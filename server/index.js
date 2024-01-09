const express = require("express");
const cors = require('cors')
const app = express();

const FRONTEND = process.env.FRONTEND

const corsOptions = {
  origin:"http://localhost:4200",
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/Zomato")
.then(() => console.log('Connected MongoDB!'));

//user routes
const user_route = require("./routes/userRoute")

app.use('/api', user_route);

//food route
const food_route = require("./routes/foodRoute")

app.use('/api', food_route);

//category route
const category_route = require("./routes/categoryRoute")
app.use('/api', category_route);


//restaurent route
const restaurent_route = require("./routes/restaurentRoute")
app.use('/api', restaurent_route);


//add-to-cart route
const cart_route = require("./routes/cartRoute")
app.use('/api', cart_route);



app.listen(4000, function(){
   console.log("Server is Run....")
})