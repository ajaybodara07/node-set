const mongoose = require("mongoose");

const schemaReservation = new mongoose.Schema({
    FullNameSpot: {
        type: String,
        trim: true,
        required: true
    },
    MobileNumberSpot: {
        type: String,
        trim: true,
        required: true
    },
    EmailSpot: {
        type: String,
        trim: true,
    },
});

const model = mongoose.model("spotres", schemaReservation);

module.exports = model;