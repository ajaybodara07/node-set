const mongoose = require("mongoose");

const schemaCustomers = new mongoose.Schema({
    Email: {
        type: String,
        trim: true,
    },
    FullName: {
        type: String,
        trim: true,
        required: true,
    },
    MobileNumber: {
        type: String,
        trim: true,
        required: true,
    },
});

const model = mongoose.model("customers", schemaCustomers);

module.exports = model;