export function generateHours() {
  const hours = [];
  for (let h = 10; h <= 21; h++) {
    hours.push(formatTime(h));
  }
  return hours;
}

export function generateMinutes() {
  
  return ["00", "30"];
}

function formatTime(hour24) {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12} ${period}`;
}

export function calculateTimeSlot(hourStr, minuteStr, duration = 3) {
    if (!hourStr || !minuteStr) return null;
  let [hour, period] = hourStr.split(" ");
  hour = parseInt(hour, 10);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const startHour = hour;
  const endHour = hour + duration;

  return {
    start: formatDisplay(startHour, minuteStr),
    end: formatDisplay(endHour, minuteStr),
  };
}

function formatDisplay(hour24, minute) {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${minute} ${period}`;
}
