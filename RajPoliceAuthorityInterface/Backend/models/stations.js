const mongoose = require('mongoose')
const { Schema } = mongoose;

const StationSchema = new Schema({

    stationNo: {
        type: String,
        require: true
    },
    stationName: {
        type: String,
        require: true
    },
    stationLocation: {
        type: String,
        require: true
    },
    headName: {
        type: String,
        require: true
    },
    registeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
})

module.exports = mongoose.model("Stations",StationSchema);