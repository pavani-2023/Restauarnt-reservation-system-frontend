import { useState } from "react";
import AdminReservationRow from "./AdminReservationRow";
import EditReservationModal from "./EditReservationModal";

const AdminReservationTable = ({ reservations, refresh }) => {
  const [editingReservation, setEditingReservation] = useState(null);
  const token = localStorage.getItem("token");

  const cancelReservation = async (id) => {
    const ok = window.confirm("Cancel this reservation?");
    if (!ok) return;

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/reservations/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "CANCELLED" }),
      }
    );

    if (!res.ok) {
      alert("Failed to cancel reservation");
      return;
    }

    refresh();
  };

  return (
    <>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Table</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((reservation) => (
            <AdminReservationRow
              key={reservation._id}
              reservation={reservation}
              onEdit={() => setEditingReservation(reservation)}
              onCancel={() => cancelReservation(reservation._id)}
            />
          ))}
        </tbody>
      </table>

      {editingReservation && (
        <EditReservationModal
          reservation={editingReservation}
          onClose={() => setEditingReservation(null)}
          onUpdated={refresh}
        />
      )}
    </>
  );
};

export default AdminReservationTable;
