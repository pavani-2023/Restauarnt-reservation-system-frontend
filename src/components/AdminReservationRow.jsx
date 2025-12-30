
const AdminReservationRow = ({ reservation, onEdit, onCancel }) => {
  const isCancelled = reservation.status === "CANCELLED";

  return (
   <tr className={isCancelled ? "row-disabled" : ""}>

      <td>{reservation.date}</td>
      <td>
  {reservation.timeSlot?.includes("NaN")
    ? "Invalid Time"
    : reservation.timeSlot}
</td>

      <td>{reservation.guests}</td>
      <td>Table {reservation.tableId.tableNumber}</td>
      <td>{reservation.status}</td>
      <td>
        <button
          onClick={onEdit}
          disabled={isCancelled}
        >
          Edit
        </button>

        <button
          onClick={onCancel}
          disabled={isCancelled}
          className="danger"
        >
          Cancel
        </button>

      </td>
    </tr>
  );
};

export default AdminReservationRow;

