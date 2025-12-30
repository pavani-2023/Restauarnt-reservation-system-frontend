import { useState } from "react";
import EditReservationModal from "./EditReservationModal";

const AdminReservationRow = ({ reservation, onUpdate }) => {
  const [editOpen, setEditOpen] = useState(false);
  const token = localStorage.getItem("token");

  const cancelReservation = async () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (!confirm) return;

    await fetch(
      `http://localhost:5000/admin/reservations/${reservation._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "CANCELLED" }),
      }
    );

    onUpdate();
  };

  return (
    <>
      <tr>
        <td>{reservation.date}</td>
        <td>{reservation.timeSlot}</td>
        <td>{reservation.guests}</td>
        <td>{reservation.tableId?.tableNumber || "-"}</td>
        <td>{reservation.userId?.email}</td>

        <td>
          <span className={`status ${reservation.status.toLowerCase()}`}>
            {reservation.status}
          </span>
        </td>

        <td className="actions">
          {reservation.status === "ACTIVE" && (
            <>
              <button
                className="edit-btn"
                onClick={() => setEditOpen(true)}
              >
                Edit
              </button>

              <button
                className="danger-btn"
                onClick={cancelReservation}
              >
                Cancel
              </button>
            </>
          )}
        </td>
      </tr>

      {editOpen && (
        <EditReservationModal
          reservation={reservation}
          onClose={() => setEditOpen(false)}
          onUpdated={onUpdate}
        />
      )}
    </>
  );
};

export default AdminReservationRow;
