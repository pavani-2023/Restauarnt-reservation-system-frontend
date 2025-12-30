const isPastReservation = (reservation) => {
  const startTime = reservation.timeSlot.split(" - ")[0];
  const reservationDateTime = new Date(
    `${reservation.date} ${startTime}`
  );

  return reservationDateTime < new Date();
};

export default function ReservationCard({ reservation, onCancel }) {
  const isPast = isPastReservation(reservation);

const displayStatus =
  reservation.status === "CANCELLED"
    ? "CANCELLED"
    : isPast
    ? "COMPLETED"
    : "ACTIVE";

  
  const canCancel = () => {
  if (reservation.status !== "ACTIVE") return false;

  const now = new Date();
  const startTime = reservation.timeSlot.split(" - ")[0];
  const reservationDateTime = new Date(
    `${reservation.date} ${startTime}`
  );

  const diffHours =
    (reservationDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  return diffHours >= 3;
};

  

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
              displayStatus === "ACTIVE"
                ? "status-active"
                : displayStatus === "CANCELLED"
                ? "status-cancelled"
                : "status-completed"
            }`}
          >
            {displayStatus}
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

       {displayStatus === "ACTIVE" && (
          <>
            <button
              className="cancel-btn"
              disabled={!canCancel()}
              onClick={() => onCancel(reservation._id)}
            >
              Cancel
            </button>

            {!canCancel() && (
              <div className="cancel-hint">
                Cancellation allowed only up to 3 hours before start time
              </div>
            )}
          </>
        )}


      </div>
    </div>
  );
}
