const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
<<<<<<< HEAD
const bodyParser = require('body-parser');
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

=======

app.use(express.json());
app.use(cookieParser());
>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

// Middleware for error
<<<<<<< HEAD
app.use(errorMiddleware);   
=======
app.use(errorMiddleware);
>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec



module.exports = app