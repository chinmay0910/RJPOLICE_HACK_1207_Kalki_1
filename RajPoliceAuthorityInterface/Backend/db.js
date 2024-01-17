const mongoose = require('mongoose');
require('dotenv').config()

const mongoUrI = "mongodb+srv://Pradeep:Pradeep@cluster0.fjyphwo.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async () =>{
    try {
        await mongoose.connect(mongoUrI);
        console.log("connected to DB");
    } catch (error) {
        console.log(error)
    }
}

module.exports =  connectToMongo;