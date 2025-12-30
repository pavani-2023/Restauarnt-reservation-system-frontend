const AdminReservationRow = ({ reservation, onUpdate }) => {
  const token = localStorage.getItem("token");

  const cancelReservation = async () => {
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
    <tr>
      <td>{reservation.date}</td>
      <td>{reservation.timeSlot}</td>
      <td>{reservation.guests}</td>
      <td>{reservation.tableId?.tableNumber}</td>
      <td>{reservation.userId?.email}</td>
      <td>
        <span className={`status ${reservation.status.toLowerCase()}`}>
          {reservation.status}
        </span>
      </td>
      <td>
        {reservation.status === "ACTIVE" && (
          <button className="danger" onClick={cancelReservation}>
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
};

export default AdminReservationRow;
