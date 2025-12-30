import { useEffect, useState } from "react";
import { calculateTimeSlot } from "../utils/booking";

const EditReservationModal = ({ reservation, onClose, onUpdated }) => {
  // ---------- helpers ----------
  const parseTime = (timeSlot) => {
    if (!timeSlot || !timeSlot.includes(":")) {
      return { hour: "", minute: "" };
    }

    const start = timeSlot.split("-")[0].trim();
    const [h, m] = start.split(":");

    if (!h || !m) return { hour: "", minute: "" };

    return {
      hour: h.padStart(2, "0"),
      minute: m.padStart(2, "0"),
    };
  };

  const parsed = parseTime(reservation.timeSlot);

  // ---------- state ----------
  const [date, setDate] = useState(reservation.date);
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);
  const [timeSlot, setTimeSlot] = useState(reservation.timeSlot);
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(reservation.tableId._id);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ---------- derived ----------
  const today = new Date().toISOString().split("T")[0];
  const isToday = date === today;

  // ⏰ Block edits within 3 hours
  const isEditable = (() => {
    const now = new Date();
    const start = new Date(
      `${reservation.date} ${reservation.timeSlot.split("-")[0]}`
    );
    return (start - now) / (1000 * 60 * 60) >= 3;
  })();

  // ---------- recompute time slot ----------
  useEffect(() => {
    if (!hour || minute === "") return;

    const slot = calculateTimeSlot(hour, minute, 3);
    setTimeSlot(`${slot.start} - ${slot.end}`);
  }, [hour, minute]);

  // ---------- fetch available tables ----------
  useEffect(() => {
    if (!date || !timeSlot) return;

    setError("");

    fetch(
      `${process.env.REACT_APP_API_URL}/admin/available-tables?date=${date}&timeSlot=${encodeURIComponent(
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
  }, [date, timeSlot, reservation.tableId._id, token]);

  // ---------- submit ----------
  const submit = async () => {
    if (!isEditable) return;

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/reservations/${reservation._id}`,
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
      setError(err.message || "Update failed");
      return;
    }

    if (typeof onUpdated === "function") onUpdated();
    onClose();
  };

  // ---------- UI ----------
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

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
          {/* HOURS */}
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

          {/* MINUTES — EVERY MINUTE */}
          <select
            disabled={!isEditable}
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          >
            <option value="">Minute</option>
            {Array.from({ length: 60 }, (_, i) => {
              const val = String(i).padStart(2, "0");
              const disabled =
                isToday &&
                hour !== "" &&
                Number(hour) === currentHour &&
                Number(val) < currentMinute;

              return (
                <option key={val} value={val} disabled={disabled}>
                  {val}
                </option>
              );
            })}
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
