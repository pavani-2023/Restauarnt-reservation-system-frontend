// src/pages/AdminTables.jsx
import { useEffect, useState } from "react";
import {
  fetchTables,
  createTable,
  updateTable
} from "../services/TableServices";
import "../styles/AdminTables.css";

export default function AdminTables() {
  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const token = localStorage.getItem("token");

  const loadTables = async () => {
    const data = await fetchTables(token);
    setTables(data);
  };

  useEffect(() => {
    loadTables();
  }, []);

  const handleAdd = async () => {
    await createTable({ tableNumber, capacity }, token);
    setTableNumber("");
    setCapacity("");
    loadTables();
  };

  const toggleStatus = async (table) => {
    await updateTable(
      table._id,
      { isActive: !table.isActive },
      token
    );
    loadTables();
  };

  return (
    <div className="admin-container">
      <h2>Manage Tables</h2>

      <div className="add-table">
        <input
          type="number"
          placeholder="Table No"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <button onClick={handleAdd}>Add Table</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Table</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((t) => (
            <tr key={t._id} className={!t.isActive ? "row-disabled" : ""}>
              <td>{t.tableNumber}</td>
              <td>{t.capacity}</td>
              <td>{t.isActive ? "Active" : "Disabled"}</td>
              <td>
                <button onClick={() => toggleStatus(t)}>
                  {t.isActive ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
