const db = require("../models/racetype.model");

// Create and Save a new racetype
exports.createRaceType = async (req, res) => {
    // Validate request
    if (!(req.body.raceName && req.body.Description)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a racetype
    const Customer = {
        raceName: req.body.raceName,
        Description: req.body.Description,
        NoTicketstypes: req.body.NoTicketstypes
    };

    // Save racetype in the database
    db.create(Customer)
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

// Retrieve all racetype from the database.
exports.findAllRaceType = (req, res) => {
    db.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving racetype."
            });
        });
};

// Find a single racetype with an id
exports.findOneRaceType = (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving racetype with id=" + id
            });
        });
};

// Update a racetype by the id in the request
exports.updateRaceType = async (req, res) => {
    const id = req.params.id;

    db.findByIdAndUpdate(id, req.body, { new: true })
        .then(async (data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({
                    message: `Cannot update racetype with id=${id}. Maybe racetype was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating racetype with id=" + id
            });
        });
};

// Delete a racetype with the specified id in the request
exports.deleteRaceType = (req, res) => {
    const id = req.params.id;

    db.findByIdAndRemove(id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "racetype not found with id " + req.params.id
                });
            }
            res.send({ message: "racetype deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "racetype not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.id
            });
        });
};
