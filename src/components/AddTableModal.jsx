import { useState } from "react";

const AddTableModal = ({ onClose, onSuccess }) => {
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const token = localStorage.getItem("token");

  const submit = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/admin/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tableNumber, capacity }),
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Add Table</h3>

        <input
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <button onClick={submit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTableModal;
