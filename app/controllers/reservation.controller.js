const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require("../models/reservation.model");
const saltRounds = 10;

// Create and Save a new reservation
exports.bookReservation = async (req, res) => {
    //Validate request
    const errors = validationResult(req);
    if (!(req.body.TicketType && req.body.RaceType)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a reservation
    const Reservation = {
        DateTime: req.body.DateTime,
        RaceType: req.body.RaceType,
        TicketType: req.body.TicketType,
        Quantity: req.body.Quantity,
        FullName: req.body.FullName,
        MobileNumber: req.body.MobileNumber,
        Email: req.body.Email
    };
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }


    // Save reservation in the database
    db.create(Reservation)
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user.",
                errors: errors.array()
            });
        });
};

// Create and Save a new reservation
exports.bookReservationSpot = async (req, res) => {
    //Validate request
    const errors = validationResult(req);
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
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Save reservation in the database
    db.create(Reservation)
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user.",
                errors: errors.array()
            });
        });
};

// Retrieve all reservation from the database.
exports.findAllReservation = (req, res) => {

    db.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        });
};

// Find a single reservation with an id
exports.findOneReservation = (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a reservation by the id in the request
exports.updateReservation = async (req, res) => {
    const id = req.params.id;
    if (req.body.Password) {
        req.body.Password = await bcrypt.hash(req.body.Password, saltRounds)
    }

    db.findByIdAndUpdate(id, req.body, { new: true })
        .then(async (data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a reservation with the specified id in the request
exports.deleteReservation = (req, res) => {
    const id = req.params.id;

    db.findByIdAndRemove(id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Reservation not found with id " + req.params.id
                });
            }
            res.send({ message: "Reservation deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Reservation not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.id
            });
        });
};
