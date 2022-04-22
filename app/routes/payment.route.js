const router = require("express").Router();
const verifyToken = require("../auth/userauth")
const Reservation = require("../controllers/customer.controller.js");

// Create a new book reservation
router.post("/", Reservation.createCustomer);

// get all book reservation
router.get("/", Reservation.findAllCustomer);

// get a single book reservation with id
router.get("/:id", Reservation.findOneCustomer);

// update a single book reservation with id
router.put("/:id", Reservation.updateCustomer);

// Delete a book reservation with id
router.delete("/:id", Reservation.deleteCustomer);

module.exports = router
