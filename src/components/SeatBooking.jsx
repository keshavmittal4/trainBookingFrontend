import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SeatBooking = () => {
  const [totalSeats, setTotalSeats] = useState(80);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(80);
  const navigate = useNavigate();

  // fetching seat data from the database
  const fetchSeatsData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get(
        "https://trainbooking-backend-yaa3.onrender.com/api/seats",
        { headers: { Authorization: `Bearer ${token}` } }
      );


      if (response.status === 200 && Array.isArray(response.data.seats)) {
        const bookedSeatsList = response.data.seats
          .filter((seat) => seat.isBooked)
          .map((seat) => `${seat.rowNumber}-${seat.seatNo}`); 

        setBookedSeats(bookedSeatsList);
        setTotalSeats(response.data.seats.length);
        setAvailableSeats(response.data.seats.length - bookedSeatsList.length);
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching seat data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchSeatsData();
  }, []);

  const handleBookSeats = async (event) => {
    event.preventDefault();
    const numSeats = parseInt(event.target.seats.value, 10);

    if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
      alert("Please enter a valid number of seats (1-7).");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.patch(
        "https://trainbooking-backend-yaa3.onrender.com/api/seats/bookticket",
        { seats: numSeats },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log("API Response:", response.data);

      if (
        response.status === 200 &&
        Array.isArray(response.data.allocatedSeats)
      ) {
        const newBookedSeats = response.data.allocatedSeats.map(
          (seat) => Number(seat.match(/\d+$/)[0]) 
        );

        setBookedSeats((prevBookedSeats) => [
          ...prevBookedSeats,
          ...newBookedSeats,
        ]);
        setAvailableSeats(
          (prevAvailable) => prevAvailable - newBookedSeats.length
        );
        fetchSeatsData();   // refreshing the seat data
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error(
        "Error booking seats:",
        error.response?.data || error.message
      );
    }
  };

  const handleResetBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.patch(
        "https://trainbooking-backend-yaa3.onrender.com/api/seats/resetbooking",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API Response:", response.data);

      if (response.status === 200) {
        setBookedSeats([]);
        setAvailableSeats(totalSeats);
        fetchSeatsData();
        alert("Seats Reset successfully");
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error(
        "Error resetting bookings:",
        error.response?.data || error.message
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* header */}
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
        <div className="flex items-center gap-2">
          <img
            src="https://img.freepik.com/premium-vector/train-with-train-front-logo-that-says-train_788759-1678.jpg"
            alt="Train Logo"
            className="w-8 h-8"
          />
          <h1 className="text-lg md:text-xl font-bold">Train Ticket Booking</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm md:text-base"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-col md:flex-row flex-1 p-4 md:p-6 gap-4 md:gap-6">
        {/* seats info grid */}
        <div className="flex-1 bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-bold text-center mb-4">
            Select Your Seats
          </h2>
          {/* booking status */}
          <div className="flex justify-between mb-4 p-2 text-sm md:text-base">
            <span className="bg-yellow-500 px-2 py-1 rounded text-white">
              Booked Seats: {bookedSeats.length}
            </span>
            <span className="bg-green-500 px-2 py-1 rounded text-white">
              Available Seats: {availableSeats}
            </span>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {totalSeats &&
              Array.from({ length: totalSeats }, (_, i) => {
                const row = Math.floor(i / 7) + 1;
                const seat = (i % 7) + 1;
                const uniqueId = `${row}-${seat}`;

                return (
                  <div
                    key={uniqueId}
                    className={`w-16 h-8 md:w-20 md:h-10 flex items-center justify-center rounded-md text-white font-bold text-sm md:text-base transition ${
                      bookedSeats.includes(uniqueId)
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {`Seat ${i + 1}`}
                  </div>
                );
              })}
          </div>
        </div>

        {/* booking form */}
        <div className="w-full md:w-1/3 bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-bold mb-2">Book Seats</h3>
          <form
            onSubmit={handleBookSeats}
            className="w-full flex flex-col gap-2"
          >
            <input
              type="number"
              name="seats"
              placeholder="Enter seats (1-7)"
              min="1"
              max="7"
              className="border rounded px-3 py-2 w-full text-sm md:text-base"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm md:text-base"
            >
              Book Seats
            </button>
            <button
              type="button"
              onClick={handleResetBookings}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm md:text-base"
            >
              Reset Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;
