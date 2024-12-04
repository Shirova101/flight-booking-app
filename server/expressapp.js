const express = require("express");
const app = express();
const cors = require('cors');
const errorMiddleware = require("./middleware/error");
app.use(cors());

app.use(express.json());

// Route IMPORTS
const booking = require("./routes/bookingRoute");
const flights = require("./routes/flightRoute");

// API Route Definitions
// Booking Routes
app.use("/api/v1/bookings", booking);

// Flight Routes
app.use("/api/v1/flights", flights);

// Middleware for ERRORS_____LAST

app.use(errorMiddleware);

module.exports = app;
