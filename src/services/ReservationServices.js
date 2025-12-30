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

export const cancelReservation = async (id, token) => {
  const res = await fetch(
    `http://localhost:5000/reservations/${id}/cancel`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};

