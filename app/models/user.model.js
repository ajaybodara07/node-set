const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Username: {
    type: String,
    trim: true,
    required: true,
    maxlength: 20
  },
  Email: {
    type: String,
    trim: true,
    required: true,
  },
  Password: {
    type: String,
    trim: true,
    required: true,
  }
});

const model = mongoose.model("userAuth", schema);

module.exports = model;