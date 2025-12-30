import { useEffect, useState } from "react";
import AdminReservationTable from "../components/AdminReservationTable";
import "../styles/Admin.css";

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchReservations = async () => {
    setLoading(true);

    const url = date
      ? `http://localhost:5000/admin/reservations?date=${date}`
      : `http://localhost:5000/admin/reservations`;

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
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <div className="admin-filters">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={fetchReservations}>Filter</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminReservationTable
          reservations={reservations}
          refresh={fetchReservations}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
