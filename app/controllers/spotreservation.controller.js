const db = require("../models/spotreservation.model");

// Create and Save a new reservation
exports.bookReservationSpot = async (req, res) => {
    //Validate request
    if (!(req.body.FullNameSpot && req.body.MobileNumberSpot)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a reservation
    const Reservation = {
        FullNameSpot: req.body.FullNameSpot,
        MobileNumberSpot: req.body.MobileNumberSpot,
        EmailSpot: req.body.EmailSpot
    };

    // Save reservation in the database
    db.create(Reservation)
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user.",
            });
        });
};
