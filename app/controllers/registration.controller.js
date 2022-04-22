const db = require("../models/registration.model");

// Create and Save a new Registration
exports.spotRegistration = async (req, res) => {
  // Validate request
  if (!(req.body.FullName && req.body.MobileNumber)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Registration
  const Registration = {
    FullName: req.body.FullName,
    MobileNumber: req.body.MobileNumber,
    Email: req.body.Email
  };

  // Save Registration in the database
  db.create(Registration)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Registration."
      });
    });
};

// Retrieve all Registration from the database.
exports.findAllRegistration = (req, res) => {
  console.log("responce data", req);

  db.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registration."
      });
    });
};

// Find a single Registration with an id
exports.findOneRegistration = (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Registration with id=" + id
      });
    });
};

// Update a Registration by the id in the request
exports.updateRegistration = async (req, res) => {
  const id = req.params.id;

  db.findByIdAndUpdate(id, req.body, { new: true })
    .then(async data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          message: `Cannot update Registration with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Registration with id=" + id
      });
    });
};

// Delete a Registration with the specified id in the request
exports.deleteRegistration = (req, res) => {
  const id = req.params.id;

  db.findByIdAndRemove(id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Registration not found with id " + req.params.id
        });
      }
      res.send({ message: "Registration deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Registration not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete Registration with id " + req.params.id
      });
    });
};
