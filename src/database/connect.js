const mongoose = require("mongoose");

const connectDb = (uri)=>{
    return mongoose.connect(uri).then(console.log("Connected Successfully to the database!"));
}

module.exports = connectDb;