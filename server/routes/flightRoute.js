const express = require('express');
const router = express.Router();
const { addFlight, searchFlights, getAllFlights } = require('../controller/flightController');

// Route to add a new flight (Admin use case)
router.post('/add', addFlight);

// Route to search flights based on criteria
router.get('/search', searchFlights);

// Route to fetch all flights (Admin/debug use case)
router.get('/all', getAllFlights);

module.exports = router;
