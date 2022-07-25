const mongoose = require("mongoose");

const beautySchema = new mongoose.Schema({
    Name: {type: String, required: true},
     Spouse:{type: String},
     Title: {type: String},
     Introduction: {type:String}
},
    {timestamps: true});

module.exports = mongoose.model("beauty", beautySchema);