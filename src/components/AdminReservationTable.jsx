import AdminReservationRow from "./AdminReservationRow";

const AdminReservationTable = ({ reservations, onUpdate }) => {
  if (!reservations.length) {
    return <p>No reservations found.</p>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Guests</th>
          <th>Table</th>
          <th>User</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((r) => (
          <AdminReservationRow
            key={r._id}
            reservation={r}
            onUpdate={onUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default AdminReservationTable;
