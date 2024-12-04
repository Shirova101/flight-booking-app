const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  PNR: { type: String, required: true, unique: true }, // Unique PNR
  guestDetails: {
    title: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
  },
  flightType: { type: String, required: true},
  flightDetails: {
    flightNumber: { type: String, required: true },
    airlineName: { type: String, required: true },
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    duration: { type: String, required: true },
    baseFare: { type: Number, required: true },
    taxes: { type: Number, required: true },
    totalFare: { type: Number, required: true },
    class: { type: String, enum: ['Economy', 'Business', 'First'], required: true },
    status: { type: String, default: 'Scheduled' },
    addOnsSelected: {
      assistance: { type: Boolean, default: false },
      insurance: { type: Boolean, default: false },
      food: { type: Boolean, default: false },
      wifi: { type: Boolean, default: false },
    },
    checkInStatus: { type: Boolean, default: false }, // Check-in status for this flight - future implementation
  },
  returnFlightDetails: {
    flightNumber: { type: String },
    airlineName: { type: String },
    fromLocation: { type: String },
    toLocation: { type: String },
    departureTime: { type: Date },
    arrivalTime: { type: Date },
    duration: { type: String },
    baseFare: { type: Number },
    taxes: { type: Number },
    totalFare: { type: Number },
    class: { type: String, enum: ['Economy', 'Business', 'First'] },
    status: { type: String, default: 'Scheduled' },
    addOnsSelected: {
      assistance: { type: Boolean, default: false },
      insurance: { type: Boolean, default: false },
      food: { type: Boolean, default: false },
      wifi: { type: Boolean, default: false },
    },
    checkInStatus: { type: Boolean, default: false }, // Check-in status for this flight - future implementation
  },
  passengers: [
    {
      id: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      isPrimary: { type: Boolean, default: false }
    },
  ],
  payment: {
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    totalCost: { type: Number, required: true },
  },
  CheckInCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
