const mongoose = require("mongoose");

const schemaReservation = new mongoose.Schema({
    DateTime: {
        type: Date,
        // required: true,
        default: Date.now
    },
    RaceType: {
        type: String,
        trim: true,
        required: true
    },
    TicketType: {
        type: String,
        trim: true,
        required: true
    },
    Quantity: {
        type: Number,
        trim: true,
        required: true
    },
    FullName: {
        type: String,
        trim: true,
        required: true
    },
    MobileNumber: {
        type: String,
        trim: true,
        required: true
    },
    Email: {
        type: String,
        trim: true,
    },
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

const model = mongoose.model("reservation", schemaReservation);

module.exports = model;