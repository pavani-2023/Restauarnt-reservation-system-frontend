export function generateHours() {
  return Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
}

export function generateMinutes() {
  return Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );
}


export function calculateTimeSlot(hour, minute, durationHours) {
  const h = Number(hour);
  const m = Number(minute);

  if (Number.isNaN(h) || Number.isNaN(m)) {
    throw new Error("Invalid hour or minute");
  }

  const startDate = new Date(2000, 0, 1, h, m);
  const endDate = new Date(
    2000,
    0,
    1,
    h,
    m + durationHours * 60
  );

  const format = (d) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;

  return {
    start: format(startDate),
    end: format(endDate),
  };
}
