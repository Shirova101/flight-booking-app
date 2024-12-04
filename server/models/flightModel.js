const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true }, // Unique flight identifier
  airlineName: { type: String, required: true }, // Airline operating the flight
  fromLocation: { type: String, required: true }, // Departure location
  toLocation: { type: String, required: true }, // Arrival location
  departureTime: { type: Date, required: true }, // Departure time
  arrivalTime: { type: Date, required: true }, // Arrival time
  duration: { type: String, required: true }, // Duration of the flight
  status: { type: String, default: 'Scheduled' }, // Current status: Scheduled, Delayed, Cancelled
  baseFare: { type: Number, required: true }, // Base price per ticket
  taxes: { type: Number, required: true }, // Applicable taxes
  totalFare: { type: Number, required: true }, // Base fare + taxes
  seatAvailability: {
    Economy: { type: Number, default: 0 }, // Seats available in Economy class
    Business: { type: Number, default: 0 }, // Seats available in Business class
    First: { type: Number, default: 0 }, // Seats available in First class
  },
  addOns: {
    assistance: { type: Boolean, default: true }, // Assistance available
    insurance: { type: Boolean, default: true }, // Insurance offered
    food: { type: Boolean, default: true }, // Food available
    wifi: { type: Boolean, default: true }, // WiFi available
  },
  createdAt: { type: Date, default: Date.now }, // Record creation timestamp
});

module.exports = mongoose.model('Flight', flightSchema);
