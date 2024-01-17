const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  imageUrl: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    require: true,
  },
  location: {
    type: String,
  },
  taggedPerson: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
