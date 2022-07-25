 require('dotenv').config();
const express = require('express');
const app = express(); // This app starts a server
const path = require('path'); // provides utilities for working with file and directory paths
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // build morgan logger middleware

// mongo
const mongoose = require("mongoose");
const beauty2 = require("./beauty2");
mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@maysandbox.tfe2sxh.mongodb.net/myFirstDatabase?appName=mongosh+1.5.0" ,
    { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{app.listen(process.env.PORT||5000,()=>{  // listens on port 3000 for connections
        console.log("Server started on port 5000");
    })})
    .catch((error)=>console.log(error));



const beautyRoute = require('./beauty0');
const cors=require("cors"); // enable cross-origin HTTP requests

const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(logger('dev'));  // initialized middleware

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));






app.use('/beauty',beautyRoute);


