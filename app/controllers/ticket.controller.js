const db = require("../models/ticket.model");

// Create and Save a new tickettype
exports.createTicketType = async (req, res) => {
    // Validate request
    if (!(req.body.raceName && req.body.Description && req.body.ticketName && req.body.ticketPrice && req.body.ticketDescription)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a tickettype
    const TicketType = {
        raceName: req.body.raceName,
        Description: req.body.Description,
        ticketName: req.body.ticketName,
        ticketPrice: req.body.ticketPrice,
        ticketDescription : req.body.ticketDescription
    };

    // Save tickettype in the database
    db.create(TicketType)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

// Retrieve all tickettype from the database.
exports.findAllTicketType = (req, res, next) => {

    db.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tickettype."
            });
        });
};

// Find a single tickettype with an id
exports.findOneTicketType = (req, res, next ) => {
    const id = req.params.id;

    db.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving tickettype with id=" + id
            });
        });
};

// Update a tickettype by the id in the request
exports.updateTicketType = async (req, res) => {
    const id = req.params.id;

    db.findByIdAndUpdate(id, req.body, { new: true })
        .then(async (data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({
                    message: `Cannot update tickettype with id=${id}. Maybe tickettype was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating tickettype with id=" + id
            });
        });
};

// Delete a tickettype with the specified id in the request
exports.deleteTicketType = (req, res) => {
    const id = req.params.id;

    db.findByIdAndRemove(id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "tickettype not found with id " + req.params.id
                });
            }
            res.send({ message: "tickettype deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "tickettype not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.id
            });
        });
};
