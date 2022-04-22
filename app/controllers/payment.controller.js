const db = require("../models/customer.model");

// Create and Save a new customer
exports.createCustomer = async (req, res) => {
    
    // Validate request
    if (!(req.body.FullName && req.body.MobileNumber)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a customer
    const Customer = {
        Email: req.body.Email,
        FullName: req.body.FullName,
        MobileNumber: req.body.MobileNumber,
    };

    // Save customer in the database
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

// Retrieve all customer from the database.
exports.findAllCustomer = (req, res) => {

    db.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Customer."
            });
        });
};

// Find a single customer with an id
exports.findOneCustomer = (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};

// Update a customer by the id in the request
exports.updateCustomer = async (req, res) => {
    const id = req.params.id;

    db.findByIdAndUpdate(id, req.body, { new: true })
        .then(async (data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};

// Delete a customer with the specified id in the request
exports.deleteCustomer = (req, res) => {
    const id = req.params.id;

    db.findByIdAndRemove(id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.id
                });
            }
            res.send({ message: "Customer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.id
            });
        });
};
