const router = require("express").Router();
const verifyToken = require("../auth/userauth")
const CarsRace = require("../controllers/cars.controller.js");

// Create a new book carsrace
router.post("/", CarsRace.createCarsRace);

// get all book carsrace
router.get("/", CarsRace.findAllCarsRace);

// get a single book carsrace with id
router.get("/:id", CarsRace.findOneCarsRace);

// update a single book carsrace with id
router.put("/:id", CarsRace.updateCarsRace);

// Delete a book carsrace with id
router.delete("/:id", CarsRace.deleteCarsRace);

module.exports = router
