const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  zipCode: {
    type: Number,
  },
  plantWanted: {
    type: String,
  },
  // FUTURE MODLES TO CREATE
    // plantAge: {
  //   type: String,
  // },
  // plantHealth: {
  //   type: String,
  // },
});

module.exports = mongoose.model("Post", PostSchema);
