const mongoose = require('mongoose')
const { Schema } = mongoose;

const PoliceSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },  
    username: {
        type: String,
        require: true
    },  
    dateofbirth: {
        type: Date,
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
    policeStationName: {
        type: String,
        require: true
    },
    employeeId:{
        type: String,
        require: true
    },
    role:{
        type: String,
        require: true
    },
    designation:{
        type: String,
        require: true
    },
    dateofjoining:{
        type: Date,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    under:{
        type: mongoose.Schema.Types.ObjectId,
    },
    date: { type: Date, default: Date.now },
})


module.exports = mongoose.model("Incharge",PoliceSchema);