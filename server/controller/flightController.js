
const moment = require("moment");
const Flight = require('../models/flightModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');

// Add a new flight (Admin use case)
const addFlight = catchAsyncErrors(async (req, res, next) => {
  const flight = new Flight(req.body);
  const savedFlight = await flight.save();
  res.status(201).json(savedFlight);
});

// Query flights based on search criteria
const searchFlights = catchAsyncErrors(async (req, res, next) => {
  const { fromLocation, toLocation, departureDate} = req.query;

  if (!departureDate) {
    return next(new ErrorHandler("Departure date is required", 400));
  }
  const parsedDepartureDate = moment(departureDate, "DD-MM-YYYY");
  if (!parsedDepartureDate.isValid()) {
    return next(new ErrorHandler("Invalid departure date format. Use DD-MM-YYYY.", 400));
  }

  const startOfDay = parsedDepartureDate.startOf("day").toDate();
  const endOfDay = parsedDepartureDate.endOf("day").toDate();

  const query = {
    fromLocation: new RegExp(fromLocation, "i"),
    toLocation: new RegExp(toLocation, "i"),
    departureTime: { $gte: startOfDay, $lte: endOfDay },
  };


  // Search flights
  const flights = await Flight.find(query);

  if (flights.length === 0) {
    return next(new ErrorHandler("No flights found for the given criteria", 404));
  }

  res.status(200).json(flights);
});

// Retrieve all flights
const getAllFlights = catchAsyncErrors(async (req, res, next) => {
  const flights = await Flight.find();
  res.status(200).json(flights);
});

module.exports = {
  addFlight,
  searchFlights,
  getAllFlights,
};
