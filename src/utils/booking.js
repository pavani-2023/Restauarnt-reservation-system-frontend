export function generateStartTimes() {
  const times = [];
  let hour = 10; // 10 AM
  const endHour = 20; // Last start = 8 PM

  while (hour <= endHour) {
    times.push(formatTime(hour));
    hour++;
  }

  return times;
}

function formatTime(hour24) {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:00 ${period}`;
}
export function calculateTimeSlot(startTime, duration = 3) {
  const [time, period] = startTime.split(" ");
  let hour = parseInt(time.split(":")[0], 10);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const endHour = hour + duration;

  return {
    start: formatTime(hour),
    end: formatTime(endHour),
  };
}
