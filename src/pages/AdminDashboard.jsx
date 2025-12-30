import { useEffect, useState } from "react";
import AdminReservationTable from "../components/AdminReservationTable";
import "../styles/Admin.css";

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState(getToday());
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchReservations = async () => {
    setLoading(true);

    const url = `${process.env.REACT_APP_API_URL}/admin/reservations?date=${date}`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setReservations(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [date]);

  const filteredReservations = reservations.filter((r) => {
    if (statusFilter === "ALL") return true;
    if (statusFilter === "CANCELLED") return r.status === "CANCELLED";
    if (statusFilter === "MODIFIED") return Boolean(r.editedAt);
    return true;
  });

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <div className="admin-filters">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="MODIFIED">Modified</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <button onClick={fetchReservations}>Refresh</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminReservationTable
          reservations={filteredReservations}
          refresh={fetchReservations}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
