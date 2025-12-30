import { useState } from "react";
import "../styles/BookingModal.css";
// import api from "../api/api";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import {generateHours,generateMinutes,calculateTimeSlot} from "../utils/booking"




const BookingModal = ({ isOpen, onClose, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const MAX_TABLE_CAPACITY = 6;
  const navigate = useNavigate();
 const [showSuccess, setShowSuccess] = useState(false);
 const today = new Date().toISOString().split("T")[0];





  if (!isOpen) return null;
const isToday = formData.date === new Date().toISOString().split("T")[0];

function isPastMinute(hourStr, minuteStr) {
  if (!isToday || !hourStr) return false;

  const now = new Date();
  let [hour, period] = hourStr.split(" ");
  hour = parseInt(hour, 10);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const selected = new Date();
  selected.setHours(hour, parseInt(minuteStr), 0);

  return selected <= now;
}




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
        if (!formData.guests || Number(formData.guests) < 1) {
          setError("Please enter number of guests.");
          return;
        }
      const token = localStorage.getItem("token");
        if (Number(formData.guests) > MAX_TABLE_CAPACITY) {
          setError(
            "We can accommodate up to 6 guests per table. For larger parties, please contact the restaurant."
          );
          return;
        }
        if (!formData.hour || !formData.minute) {
          setError("Please select a valid time.");
          return;
        }

      const { start, end } = calculateTimeSlot(
        formData.hour,
        formData.minute,
        3
      );

      const timeSlot = `${start} - ${end}`;


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
          timeSlot,
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
  


// ✅ SUCCESS FLOW
setShowSuccess(true);

setTimeout(() => {
   navigate("/dashboard");
  setShowSuccess(false);
  onClose();
 
}, 500);



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
              min={today}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </label>

         <label>Select Start Time</label>

          <div className="time-picker">
            <select
              value={formData.hour}
              onChange={(e) =>
                setFormData({ ...formData, hour: e.target.value })
              }
              size={5}
              required
            >
              {generateHours().map((h) => (
              <option
            key={h}
            value={h}
            disabled={isPastMinute(h, formData.minute)}
          >
            {h}
          </option>

              ))}
            </select>

            <span className="colon">:</span>

            <select
              value={formData.minute}
              onChange={(e) =>
                setFormData({ ...formData, minute: e.target.value })
              }
              size={2}
              required
            >
              {generateMinutes().map((m) => (
                <option
                  key={m}
                  value={m}
                  disabled={isPastMinute(formData.hour, m)}
                >
                  {m}
                </option>

              ))}
            </select>
          </div>

          <label>Number of Guests</label>
  <input
    type="number"
    min="1"
    max="12"
    placeholder="Enter number of guests"
    value={formData.guests || ""}
    onChange={(e) =>
      setFormData({ ...formData, guests: e.target.value })
    }
    required
  />

          <p className="hint">⏱ 3-hour dining window</p>



          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Reserving..." : "Reserve"}
          </button>
        </form>
      </div>
      
      {showSuccess && (
  <SuccessModal
    isOpen={showSuccess}
    onConfirm={() => {
      setShowSuccess(false);
      onClose();
      navigate("/dashboard");
    }}
  />
)}

{formData.hour && formData.minute && (
  <p className="preview">
    🕒 Reservation from{" "}
    <strong>
      {calculateTimeSlot(formData.hour, formData.minute, 3)?.start} –{" "}
      {calculateTimeSlot(formData.hour, formData.minute, 3)?.end}
    </strong>
  </p>
)}

    </div>
  );
};

export default BookingModal;
