// import { useState } from "react";
// import EditReservationModal from "./EditReservationModal";

// const AdminReservationRow = ({ reservation, onUpdate }) => {
//   const [showEdit, setShowEdit] = useState(false);

//   const token = localStorage.getItem("token");

//   const cancelReservation = async () => {
//     if (!window.confirm("Cancel this reservation?")) return;

//     await fetch(
//       `http://localhost:5000/admin/reservations/${reservation._id}`,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     onUpdate(); // refresh list
//   };

//   return (
//     <>
//       <tr>
//         <td>{reservation.date}</td>
//         <td>{reservation.timeSlot}</td>
//         <td>{reservation.guests}</td>
//         <td>Table {reservation.tableId.tableNumber}</td>
//         <td>{reservation.status}</td>
//         <td>
//           <button onClick={() => setShowEdit(true)}>Edit</button>
//           <button onClick={cancelReservation}>Cancel</button>
//         </td>
//       </tr>

//       {showEdit && (
//         <EditReservationModal
//           reservation={reservation}
//           onClose={() => setShowEdit(false)}
//           onUpdated={onUpdate}   
//         />
//       )}
//     </>
//   );
// };

// export default AdminReservationRow;
const AdminReservationRow = ({ reservation, onEdit, onCancel }) => {
  return (
    <tr>
      <td>{reservation.date}</td>
      <td>
  {reservation.timeSlot?.includes("NaN")
    ? "Invalid Time"
    : reservation.timeSlot}
</td>

      <td>{reservation.guests}</td>
      <td>Table {reservation.tableId.tableNumber}</td>
      <td>{reservation.status}</td>
      <td>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onCancel}>Cancel</button>
        <button
  onClick={() => {
    console.log("Cancel clicked", reservation._id);
    onCancel();
  }}
>
  Cancel
</button>

      </td>
    </tr>
  );
};

export default AdminReservationRow;

