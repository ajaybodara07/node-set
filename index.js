const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require('./app/routes/user.routes');
const reservationRoutes = require('./app/routes/reservation.routes');
const registrationRoutes = require('./app/routes/registration.routes');
const verifyRoutes = require('./app/routes/phoneverify.routes');
const costomerRoutes = require('./app/routes/customer.routes');
const assignRoutes = require('./app/routes/assignrace.route');
const raceTypeRoutes = require('./app/routes/racetype.route');
const ticketTypeRoutes = require('./app/routes/ticket.route');
const raceRoutes = require('./app/routes/cars.route');
const spotReservationRoutes = require('./app/routes/spotreservation.routes');
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/config/db.config");

// user api
app.use("/api", verifyRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/cars", raceRoutes);
app.use("/api/customer", costomerRoutes);
app.use("/api/assignrace", assignRoutes);
app.use("/api/racetype", raceTypeRoutes);
app.use("/api/tickettype", ticketTypeRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/api/spotres", spotReservationRoutes)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to staff application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port data ${PORT}.`);
});
