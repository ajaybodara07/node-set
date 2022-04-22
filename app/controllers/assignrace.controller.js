const db = require("../models/assignrace.model");

// Create and Save a new assignrace
exports.createAssignRace = async (req, res) => {
    // Validate request
    if (!(req.body.MobileNumber && req.body.FullName && req.body.CarName)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a assignrace
    const Reservation = {
        MobileNumber: req.body.MobileNumber,
        FullName: req.body.FullName,
        CarName: req.body.CarName
    };

    // Save assignrace in the database
    db.create(Reservation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log("assignrace Data here", err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the assignrace."
            });
        });
};

// Retrieve all assignrace from the database.
exports.findAllAssignRace = (req, res) => {

    db.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assignrace."
            });
        });
};

// Find a single assignrace with an id
exports.findOneAssignRace = (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving assignrace with id=" + id
            });
        });
};

// Update a assignrace by the id in the request
exports.updateAssignRace = async (req, res) => {
    const id = req.params.id;

    db.findByIdAndUpdate(id, req.body, { new: true })
        .then(async (data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({
                    message: `Cannot update assignrace with id=${id}. Maybe assignrace was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating assignrace with id=" + id
            });
        });
};

// Delete a assignrace with the specified id in the request
exports.deleteAssignRace = (req, res) => {
    const id = req.params.id;

    db.findByIdAndRemove(id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "AssignRace not found with id " + req.params.id
                });
            }
            res.send({ message: "AssignRace deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "AssignRace not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete assignrace with id " + req.params.id
            });
        });
};
