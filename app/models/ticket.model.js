const mongoose = require("mongoose");

const schemaCustomers = new mongoose.Schema({
    raceName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    Description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    ticketName:{
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    ticketPrice: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 10
    },
    ticketDescription:{
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    }
});

const model = mongoose.model("tickettype", schemaCustomers);

module.exports = model;