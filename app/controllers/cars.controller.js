const db = require("../models/cars.model");

// Create and Save a new carsrace
exports.createCarsRace = async (req, res) => {
  // Validate request
  if (!(req.body.carName && req.body.carsDescription && req.body.carId)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a carsrace
  const Reservation = {
    carName: req.body.carName,
    carsDescription: req.body.carsDescription,
    carId: req.body.carId
  };

  // Save carsrace in the database
  db.create(Reservation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the carsrace."
      });
    });
};

// Retrieve all carsrace from the database.
exports.findAllCarsRace = (req, res) => {
  db.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving carsrace."
      });
    });
};

// Find a single carsrace with an id
exports.findOneCarsRace = (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving carsrace with id=" + id
      });
    });
};

// Update a carsrace by the id in the request
exports.updateCarsRace = async (req, res) => {
  const id = req.params.id;

  db.findByIdAndUpdate(id, req.body, { new: true })
    .then(async data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          message: `Cannot update carsrace with id=${id}. Maybe carsrace was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating carsrace with id=" + id
      });
    });
};

// Delete a carsrace with the specified id in the request
exports.deleteCarsRace = (req, res) => {
  const id = req.params.id;

  db.findByIdAndRemove(id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "carsrace not found with id " + req.params.id
        });
      }
      res.send({ message: "carsrace deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "carsrace not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete carsrace with id " + req.params.id
      });
    });
};
