const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema({
    carName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    carsDescription: {
        type: String,
        trim: true,
        required: true,
    },
    carId: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
});

const model = mongoose.model("carsrace", CarsSchema);

module.exports = model;