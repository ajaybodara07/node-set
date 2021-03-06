const bcrypt = require('bcrypt');
const db = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config")
const saltRounds = 10;
const { body, validationResult } = require('express-validator');

// Create and Save a new UserAuth
exports.createUser = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!(req.body.Username && req.body.Password && req.body.Email)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a UserAuth
  const UserAuth = {
    Username: req.body.Username,
    Email: req.body.Email,
    Password: await bcrypt.hash(req.body.Password, saltRounds)
  };
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  db.create(UserAuth, function (err, userResultData) {
    if (err) {
      res.send({
        status: 500,
        message: err.message || "Some error occurred while creating the user.",
        errors: errors.array()
      });
    } else {
      var access_token = jwt.sign(
        {
          id: userResultData._id,
          email: userResultData.Email,
        },
        config.secret,
        {
          expiresIn: '1hr',
        }
      );
      res.send({
        status: 200,
        message: "success",
        result: userResultData,
        access_token: access_token,
      });
    }
  });


  // Save UserAuth in the database
  // db.create(UserAuth)
  //   .then(data => {
  //     res.send(data);

  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the user.",
  //       errors: errors.array()
  //     });
  //   });
};

// login route a UserAuth
exports.loginUser = async (req, res) => {
  const body = req.body;
  const user = await db.findOne({ Username: body.Username });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.Password, user.Password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
}

// Retrieve all UserAuth from the database.
exports.findAllUser = (req, res) => {

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

// Find a single UserAuth with an id
exports.findOneUser = (req, res) => {
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

// Update a UserAuth by the id in the request
exports.updatedateUser = async (req, res) => {
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

// Delete a UserAuth with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  db.findByIdAndRemove(id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send({ message: "User deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.id
      });
    });
};
