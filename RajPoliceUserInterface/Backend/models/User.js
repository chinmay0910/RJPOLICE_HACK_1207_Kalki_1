const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },  
    adharNo: {
        type: Number,
        require: true
    },  
    MobileNo: {
        type: Number,
        require: true
    },  
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    date: { type: Date, default: Date.now },
})


module.exports = mongoose.model("User",UserSchema);