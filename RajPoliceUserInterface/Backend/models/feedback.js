const mongoose = require('mongoose')
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    policeStation: String,
    interactionWithOfficers: String,
    communication: String,
    responseTime: String,
    professionalism: String,
    understandingOfIssue: String,
    safetyPerception: String,
    accessibility: String,
    cleanlinessOfStation: String,
    overallExperience: String,
    improvementSuggestions: String,
  });


module.exports = mongoose.model("Feedback",feedbackSchema);