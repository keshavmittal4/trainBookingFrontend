// Import necessary libraries
import React, { useState } from "react";

// Seat Booking Component
const SeatBooking = () => {
  // State variables
  const [seats, setSeats] = useState(
    Array(80).fill(null) // Initialize 80 seats as unbooked (null)
  );
  const [bookedCount, setBookedCount] = useState(0); // Track booked seats

  // Utility functions
  const bookSeats = (seatCount) => {
    if (seatCount > 7 || seatCount < 1) {
      alert("You can book between 1 and 7 seats at a time.");
      return;
    }

    const seatIndices = findAvailableSeats(seatCount);
    if (seatIndices.length === seatCount) {
      const updatedSeats = [...seats];
      seatIndices.forEach((index) => (updatedSeats[index] = true));
      setSeats(updatedSeats);
      setBookedCount(bookedCount + seatCount);
      alert(`Successfully booked ${seatCount} seats.`);
    } else {
      alert("Not enough nearby seats available.");
    }
  };

  const findAvailableSeats = (count) => {
    // Try to find seats in a single row first
    for (let row = 0; row < 12; row++) {
      const start = row * 7;
      const rowSeats = seats.slice(start, start + (row === 11 ? 3 : 7));
      const indices = [];
      rowSeats.forEach((seat, idx) => {
        if (!seat && indices.length < count) indices.push(start + idx);
      });
      if (indices.length === count) return indices;
    }

    // Try to find nearby seats if one row is not available
    const indices = [];
    seats.forEach((seat, index) => {
      if (!seat && indices.length < count) indices.push(index);
    });
    return indices;
  };

  const resetBooking = () => {
    setSeats(Array(80).fill(null));
    setBookedCount(0);
    alert("All bookings have been reset.");
  };

  // Render component
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-100 min-h-screen flex flex-col lg:flex-row lg:space-x-6">
      {/* Seat Grid */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-center">Ticket Booking</h1>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {seats.map((seat, index) => (
            <div
              key={index}
              className={`p-4 rounded text-center font-bold text-white ${
                seat ? "bg-yellow-500" : "bg-green-500"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            <span className="font-bold">Booked Seats = {bookedCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="font-bold">Available Seats = {80 - bookedCount}</span>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="flex-1 items-center justify-center lg:max-w-sm bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Book Your Seats</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="number"
            id="seatCount"
            placeholder="Seats (1-7)"
            className="border p-2 rounded text-center"
          />
          <button
            onClick={() =>
              bookSeats(Number(document.getElementById("seatCount").value))
            }
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Book
          </button>
          <button
            onClick={resetBooking}
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            Reset Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;