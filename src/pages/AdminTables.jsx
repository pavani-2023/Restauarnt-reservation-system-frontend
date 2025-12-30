import { useEffect, useState } from "react";

const AdminTables = () => {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  const fetchTables = async () => {
    const res = await fetch("http://localhost:5000/admin/tables", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTables(data);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="admin-container">
      <h2>Table Management</h2>

      <button onClick={() => setShowModal(true)}>➕ Add Table</button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Table No</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((t) => (
            <tr key={t._id}>
              <td>{t.tableNumber}</td>
              <td>{t.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddTableModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchTables}
        />
      )}
    </div>
  );
};

export default AdminTables;
