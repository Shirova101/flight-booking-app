const express = require('express');
const { createBooking, getBookingByPNR, checkInPassenger, updateBooking } = require('../controller/bookingController');

const router = express.Router();

// POST /api/v1/bookings/create - Create a new booking
router.post('/create', createBooking);

// GET /api/v1/bookings/search - Get booking details by PNR
router.get('/search', getBookingByPNR);
// checkIn user by pnr
router.post('/checkIn', checkInPassenger);
// update booking by pnr
router.patch('/update', updateBooking);


module.exports = router;