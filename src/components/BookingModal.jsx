import { useState } from "react";
import "../styles/BookingModal.css";
// import api from "../api/api";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import {generateStartTimes,calculateTimeSlot} from "../utils/booking"




const BookingModal = ({ isOpen, onClose, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const MAX_TABLE_CAPACITY = 6;
  const navigate = useNavigate();
 const [showSuccess, setShowSuccess] = useState(false);
 const today = new Date().toISOString().split("T")[0];
console.log(generateStartTimes());

 

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
        if (Number(formData.guests) > MAX_TABLE_CAPACITY) {
      setError(
        "We can accommodate up to 6 guests per table. For larger parties, please contact the restaurant."
      );
      return;
    }
     if (!formData.startTime) {
        setError("Please select a start time.");
        return;
      }

      const { start, end } = calculateTimeSlot(formData.startTime, 3);
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
const handleChange=(e)=>{

}

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

          <label>
            Select Start Time
            <div className="time-wheel">
              <select
                name="startTime"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                size={5}
                required
              >
                <option value="">Select time</option>
                {generateStartTimes().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </label>


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


    </div>
  );
};

export default BookingModal;
