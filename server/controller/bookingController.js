const Booking = require('../models/bookingModel');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');

exports.createBooking = catchAsyncError(async (req, res, next) => {
  console.log(req.body); 
  const booking = new Booking(req.body);

  // Example: Throw custom error if required fields are missing
  if (!req.body.PNR || !req.body.flightDetails) {
    
    return next(new ErrorHandler('Missing required booking details', 400));
  }
  const existingBooking = await Booking.findOne({ PNR: req.body.PNR });
  if (existingBooking) {
    console.log(existingBooking);
    return next(new ErrorHandler('Booking with this PNR already exists', 400));
  }
  console.log('check4');
  await booking.save();
  console.log("succesfull");
  res.status(201).json({
    success: true,
    message: 'Booking saved successfully',
    data: booking,
  });
});

exports.getBookingByPNR = catchAsyncError(async (req, res, next) => {
  const { PNR } = req.query;
  if (!PNR) {
    return next(new ErrorHandler('PNR is required to fetch booking details', 400));
  }

  const booking = await Booking.findOne({ PNR: PNR });

  if (!booking) {
    return next(new ErrorHandler(`Booking with PNR ${PNR} not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});
exports.updateBooking = catchAsyncError(async (req,res,next) => {
    const { PNR, updatedDetails } = req.body;
    console.log(req.body);
    // Check if PNR exists
    const booking = await Booking.findOne({ PNR });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    // Update the booking with new details
    if (updatedDetails.guestDetails) {
      booking.guestDetails = {
        ...booking.guestDetails,
        ...updatedDetails.guestDetails,
      };
    }
  
    // Update passengers
    if (updatedDetails.passengers) {
      booking.passengers = updatedDetails.passengers;
    }
  
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully.',
      data: booking,
    });
});

exports.checkInPassenger = catchAsyncError(async (req, res, next) => {
  const { PNR, flightType } = req.body;

  if (!PNR || !flightType) {
    return next(new ErrorHandler('Missing required fields: PNR, passengerId, or flightType', 400));
  }

  const booking = await Booking.findOne({ PNR });
  console.log(booking);

  if (!booking) {
    return next(new ErrorHandler(`Booking with PNR ${PNR} not found`, 404));
  }
  if (booking.CheckInCompleted) {
    return next(new ErrorHandler('Outbound flight already checked in', 400));
  }
  booking.CheckInCompleted = true;

  // Determine flight type to update check-in status
  {/*if (flightType === 'outbound') {
    if (booking.flightDetails.checkInStatus) {
      return next(new ErrorHandler('Outbound flight already checked in', 400));
    }
    booking.flightDetails.checkInStatus = true;
  } else if (flightType === 'return') {
    if (!booking.returnFlightDetails) {
      return next(new ErrorHandler('No return flight associated with this booking', 400));
    }
    if (booking.returnFlightDetails.checkInStatus) {
      return next(new ErrorHandler('Return flight already checked in', 400));
    }
    booking.returnFlightDetails.checkInStatus = true;
  } else {
    return next(new ErrorHandler('Invalid flight type specified', 400));
  }
*/}

  await booking.save();

  res.status(200).json({
    success: true,
    message: `${flightType} flight check-in successful`,
  });
});
