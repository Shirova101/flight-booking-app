const mongoose = require("mongoose");
const Flight = require("../models/flightModel");// Adjust the path based on your project structure

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Spicejet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected successfully.");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Generate example flights
const generateFlights = () => {
  const locations = [
    { city: "Delhi", airport: "DEL" },
    { city: "Mumbai", airport: "BOM" },
    { city: "Bangalore", airport: "BLR" },
    { city: "Chennai", airport: "MAA" },
    { city: "Hyderabad", airport: "HYD" },
    { city: "Kolkata", airport: "CCU" },
  ];

  const flights = [];
  const today = new Date();

  for (let day = 0; day < 10; day++) {
    for (let i = 0; i < 3; i++) {
      const fromIndex = Math.floor(Math.random() * locations.length);
      let toIndex;
      do {
        toIndex = Math.floor(Math.random() * locations.length);
      } while (toIndex === fromIndex);

      const departureTime = new Date(today);
      departureTime.setDate(today.getDate() + day);
      departureTime.setHours(6 + i * 3, 0, 0); // Flights at 6:00 AM, 9:00 AM, and 12:00 PM

      const arrivalTime = new Date(departureTime);
      arrivalTime.setHours(arrivalTime.getHours() + 2); // 2-hour flight duration

      flights.push({
        flightNumber: `SG${Math.floor(1000 + Math.random() * 9000)}`, // Random unique flight number
        airlineName: "SpiceJet",
        fromLocation: `${locations[fromIndex].city} (${locations[fromIndex].airport})`,
        toLocation: `${locations[toIndex].city} (${locations[toIndex].airport})`,
        departureTime,
        arrivalTime,
        duration: "2 hours",
        status: "Scheduled",
        baseFare: 3000 + i * 500, // Varies per flight
        taxes: 500,
        totalFare: 3500 + i * 500,
        seatAvailability: {
          Economy: 120,
          Business: 30,
          First: 10,
        },
        addOns: {
          assistance: true,
          insurance: true,
          food: true,
          wifi: true,
        },
      });
    }
  }
  return flights;
};

// Insert flights into the database
const seedFlights = async () => {
  try {
    const flights = generateFlights();
    await Flight.insertMany(flights);
    console.log("Flights seeded successfully.");
  } catch (err) {
    console.error("Error seeding flights:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedFlights();
