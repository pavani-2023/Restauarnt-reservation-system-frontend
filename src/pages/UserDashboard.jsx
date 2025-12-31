// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import ReservationCard from "../components/ReservationCard";
import {
  fetchMyReservations,
  cancelReservation,
} from "../services/ReservationServices";

import ConfirmModal from "../components/ConfirmModal";
import "../styles/UserDashboard.css";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false);
const [selectedId, setSelectedId] = useState(null);

  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
  const role = localStorage.getItem("role");
  if (role !== "USER") {
    navigate("/");
  }
}, []);

  async function loadReservations() {
    try {
      const data = await fetchMyReservations(token);
      setReservations(data);
    } catch (err) {
      setError("Unable to load reservations",err);
    }
  }

  // async function handleCancel(id) {
  //   if (!window.confirm("Cancel this reservation?")) return;

  //   try {
  //     await cancelReservation(id, token);
  //     loadReservations(); // refresh list
  //   } catch {
  //     alert("Failed to cancel reservation");
  //   }
  // }
  function handleCancelClick(id) {
  setSelectedId(id);
  setConfirmOpen(true);
}

async function confirmCancel() {
  try {
    await cancelReservation(selectedId, token);
    setConfirmOpen(false);
    setSelectedId(null);
    loadReservations();
  } catch (err) {
    alert(err.message); // optional toast later
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
              onCancel={handleCancelClick}
            />
          ))}
        </div>
      )}
    </div>

        <ConfirmModal
      open={confirmOpen}
      title="Cancel Reservation"
      message="Are you sure you want to cancel this reservation?"
      confirmText="Yes, Cancel"
      cancelText="No"
      onClose={() => setConfirmOpen(false)}
      onConfirm={confirmCancel}
    />


    </div>
    

  );
}
