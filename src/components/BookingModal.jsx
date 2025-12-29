import { useState } from "react";
import "../styles/BookingModal.css";
// import api from "../api/api";


const BookingModal = ({ isOpen, onClose, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {
  //     await api.post("/reservations", {
  //       date: formData.date,
  //       timeSlot: formData.timeSlot,
  //       guests: Number(formData.guests)
  //     });

  //     alert("✅ Reservation confirmed");
  //     onClose();
  //   } catch (err) {
  //     if (err.response?.status === 409) {
  //       setError(
  //         "❌ No tables available for this date and time. Please try another slot."
  //       );
  //     } else if (err.response?.status === 401) {
  //       setError("Please login to continue.");
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
     `${process.env.REACT_APP_API_URL}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          date: formData.date,
          timeSlot: formData.timeSlot,
          guests: Number(formData.guests)
        })
      }
    );

    if (response.status === 409) {
      throw new Error("FULLY_BOOKED");
    }

    if (!response.ok) {
      throw new Error("GENERIC_ERROR");
    }

    alert("✅ Reservation confirmed");
    onClose();
  } catch (err) {
    if (err.message === "FULLY_BOOKED") {
      setError(
        "❌ No tables available for this date and time. Please try another slot."
      );
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Book a Table</h2>
        <p>Select your preferred date, time, and number of guests.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Date
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </label>

          <label>
            Time Slot
            <select
              value={formData.timeSlot}
              onChange={(e) =>
                setFormData({ ...formData, timeSlot: e.target.value })
              }
              required
            >
              <option value="">Select time</option>
              <option value="18:00-20:00">18:00 – 20:00</option>
              <option value="20:00-22:00">20:00 – 22:00</option>
               <option value="10:00-12:00">10:00 – 12:00</option>
            </select>
          </label>

          <label>
            Guests
            <input
              type="number"
              min="1"
              max="10"
              value={formData.guests}
              onChange={(e) =>
                setFormData({ ...formData, guests: e.target.value })
              }
              required
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Reserving..." : "Reserve"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
