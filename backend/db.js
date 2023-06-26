const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/notebook"

const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI,{family:4})
    console.log("connected");
}

module.exports = connectToMongo;