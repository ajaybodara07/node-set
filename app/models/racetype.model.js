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
    NoTicketstypes: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 20
    }
});

const model = mongoose.model("racetype", schemaCustomers);

module.exports = model;