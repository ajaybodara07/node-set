const mongoose = require("mongoose");

const schemaReservation = new mongoose.Schema({
    FullName: {
        type: String,
        trim: true,
    },
    MobileNumber: {
        type: Number,
        trim: true,
        unique: true
    },
    Email: {
        type: String,
        trim: true,
    },

});

const model = mongoose.model("registration", schemaReservation);

module.exports = model;