import { useEffect, useState } from "react";
import { calculateTimeSlot } from "../utils/booking";

const EditReservationModal = ({ reservation, onClose, onUpdated }) => {

    
  const parseTime = (timeSlot) => {
  if (!timeSlot || !timeSlot.includes(":")) {
    return { hour: "", minute: "" };
  }

  const start = timeSlot.split("-")[0].trim(); // handles both " - " and "-"
  const [h, m] = start.split(":");

  if (!h || !m) return { hour: "", minute: "" };

  return {
    hour: h.padStart(2, "0"),
    minute: m.padStart(2, "0"),
  };
};

const parsed = parseTime(reservation.timeSlot);

  const [date, setDate] = useState(reservation.date);
 const [hour, setHour] = useState(parsed.hour);
const [minute, setMinute] = useState(parsed.minute);

  const [timeSlot, setTimeSlot] = useState(reservation.timeSlot);
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(reservation.tableId._id);
  const [error, setError] = useState("");



  const token = localStorage.getItem("token");

  // ⏰ Block edits < 3 hours
  const isEditable = (() => {
    const now = new Date();
    const start = new Date(
      `${reservation.date} ${reservation.timeSlot.split(" - ")[0]}`
    );
    return (start - now) / (1000 * 60 * 60) >= 3;
  })();

  // 🔁 Recalculate timeSlot (24h only)
useEffect(() => {
  if (!hour || !minute) return;

  const slot = calculateTimeSlot(hour, minute, 3);
  setTimeSlot(`${slot.start} - ${slot.end}`);
}, [hour, minute]);



  // 🔁 Fetch available tables when date or timeSlot changes
  useEffect(() => {
    if (!date || !timeSlot) return;

    setError("");

    fetch(
      `http://localhost:5000/admin/available-tables?date=${date}&timeSlot=${encodeURIComponent(
        timeSlot
      )}&currentTableId=${reservation.tableId._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setTables)
      .catch(() => setError("Failed to load tables"));
  }, [date, timeSlot]);

  const submit = async () => {
    if (!isEditable) return;

    const res = await fetch(
      `http://localhost:5000/admin/reservations/${reservation._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, timeSlot, tableId }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      setError(err.message);
      return;
    }

    if (typeof onUpdated === "function") {
  onUpdated();
}

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Edit Reservation</h3>

        <p className="current-table">
          Current Table:{" "}
          <strong>
            Table {reservation.tableId.tableNumber} (Cap{" "}
            {reservation.tableId.capacity})
          </strong>
        </p>

        {!isEditable && (
          <p className="error">❌ Cannot edit within 3 hours of start time</p>
        )}

        <label>Date</label>
        <input
          type="date"
          value={date}
          disabled={!isEditable}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Start Time (24h)</label>
        <div className="time-picker">
          <select
            disabled={!isEditable}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          >
             <option value="">Hour</option>
                {Array.from({ length: 24 }, (_, i) => {
                    const val = String(i).padStart(2, "0");
                    return (
                    <option key={val} value={val}>
                        {val}
                    </option>
                    );
                })}
                </select>

          <select
            disabled={!isEditable}
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          >
            <option value="00">00</option>
            <option value="30">30</option>
          </select>
        </div>

        <label>Reassign Table</label>
        <select
          disabled={!isEditable}
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
        >
          {tables.map((table) => (
            <option
              key={table._id}
              value={table._id}
              disabled={!table.isAvailable}
            >
              Table {table.tableNumber} — Cap {table.capacity}
              {!table.isAvailable ? " (Unavailable)" : ""}
              {table._id === reservation.tableId._id ? " (Current)" : ""}
            </option>
          ))}
        </select>

        {error && <p className="error">{error}</p>}

        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
          {isEditable && <button onClick={submit}>Update</button>}
        </div>
      </div>
    </div>
  );
};

export default EditReservationModal;
