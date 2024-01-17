const mongoose = require('mongoose');
const { Schema } = mongoose;

const UpdateSchema = new Schema({
  // Fields for updates made by users
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  updateDescription: {
    type: String,
    required: true,
  },
  updateTag: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ComplaintSchema = new Schema({
  FIRNO: {
    type: String,
    required: true,
  },
  FIR_DESC: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  updates: [UpdateSchema], // Array to store updates
});

module.exports = mongoose.model('complaints', ComplaintSchema);
