const mongoose = require("mongoose");

const AssignSchema = new mongoose.Schema({
    MobileNumber: {
        type: String,
        trim: true,
        required: true,
    },
    FullName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    CarName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    }
});

const model = mongoose.model("assingRace", AssignSchema);

module.exports = model;