const router = require("express").Router();
const verifyToken = require("../auth/userauth")
const AssignRace = require("../controllers/assignrace.controller.js");

// Create a new book reservation
router.post("/", AssignRace.createAssignRace);

// get all book reservation
router.get("/", AssignRace.findAllAssignRace);

// get a single book reservation with id
router.get("/:id", AssignRace.findOneAssignRace);

// update a single book reservation with id
router.put("/:id", AssignRace.updateAssignRace);

// Delete a book reservation with id
router.delete("/:id", AssignRace.deleteAssignRace);

module.exports = router
