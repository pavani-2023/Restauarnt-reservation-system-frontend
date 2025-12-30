// src/components/ReservationCard.jsx

// export default function ReservationCard({ reservation, onCancel }) {
//   return (
//     <div className="reservation-card">
//       <div>
//         <strong>Date:</strong> {reservation.date}
//       </div>
//       <div>
//         <strong>Time:</strong> {reservation.timeSlot}
//       </div>
//       <div>
//         <strong>Guests:</strong> {reservation.guests}
//       </div>
//       <div>
//         <strong>Table:</strong> {reservation.tableId?.tableNumber}
//       </div>
//       <div>
//         <strong>Status:</strong> {reservation.status}
//       </div>

//       {reservation.status === "ACTIVE" && (
//         <button onClick={() => onCancel(reservation._id)}>
//           Cancel
//         </button>
//       )}
//     </div>
//   );
// }
// export default function ReservationCard({ reservation, onCancel }) {
//   return (
//     <div className="reservation-card">
//       <div className="reservation-info">
//         <div>
//           <span>Date</span>
//           <strong>{reservation.date}</strong>
//         </div>

//         <div>
//           <span>Time</span>
//           <strong>{reservation.timeSlot}</strong>
//         </div>

//         <div>
//           <span>Guests</span>
//           <strong>{reservation.guests}</strong>
//         </div>

//         <div>
//           <span>Table</span>
//           <strong>{reservation.tableId?.tableNumber}</strong>
//         </div>

//         <div>
//           <span>Status</span>
//           <div
//             className={`reservation-status ${
//               reservation.status === "ACTIVE"
//                 ? "status-active"
//                 : "status-cancelled"
//             }`}
//           >
//             {reservation.status}
//           </div>
//         </div>
//       </div>

//       <div className="reservation-actions">
//         {reservation.status === "ACTIVE" && (
//           <button
//             className="cancel-btn"
//             onClick={() => onCancel(reservation._id)}
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
export default function ReservationCard({ reservation, onCancel }) {
  return (
    <div className="reservation-card">
      <div className="reservation-left">
        <div className="reservation-row">
          <span>Date:</span> {reservation.date}
        </div>

        <div className="reservation-row">
          <span>Guests:</span> {reservation.guests}
        </div>

        <div className="reservation-row">
          <span>Status:</span>
          <div
            className={`status-pill ${
              reservation.status === "ACTIVE"
                ? "status-active"
                : "status-cancelled"
            }`}
          >
            {reservation.status}
          </div>
        </div>
      </div>

      <div className="reservation-right">
        <div className="reservation-row">
          <span>Time:</span> {reservation.timeSlot}
        </div>

        <div className="reservation-row">
          <span>Table:</span> {reservation.tableId?.tableNumber}
        </div>

        {reservation.status === "ACTIVE" && (
          <button
            className="cancel-btn"
            onClick={() => onCancel(reservation._id)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
