// src/services/reservationService.js

export async function fetchMyReservations(token) {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/reservations/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reservations");
  }

  return res.json();
}

export async function cancelReservation(id, token) {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/reservations/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to cancel reservation");
  }
}
