// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import ReservationCard from "../components/ReservationCard";
import {
  fetchMyReservations,
  cancelReservation,
} from "../services/ReservationServices";
import "../styles/UserDashboard.css";


export default function UserDashboard() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadReservations();
  }, [reservations]);

  async function loadReservations() {
    try {
      const data = await fetchMyReservations(token);
      setReservations(data);
    } catch (err) {
      setError("Unable to load reservations",err);
    }
  }

  async function handleCancel(id) {
    if (!window.confirm("Cancel this reservation?")) return;

    try {
      await cancelReservation(id, token);
      loadReservations(); // refresh list
    } catch {
      alert("Failed to cancel reservation");
    }
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-container">
      <h2 className="dashboard-title">My Reservations</h2>

      {reservations.length === 0 ? (
        <div className="dashboard-empty">
          You don’t have any reservations yet.
        </div>
      ) : (
        <div className="reservation-list">
          {reservations.map((r) => (
            <ReservationCard
              key={r._id}
              reservation={r}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>

    </div>
    

  );
}
