/**
 * Get a date object based on given date and time strings.
 * @param date Date of the form `YYYY-MM-DD`
 * @param time Time of the form `HH:MM PP`
 * @example <caption>Typical usage</caption>
 * ```ts
 * const myDate = getDate('2020-09-13', '10:52 AM');
 * ```
 */
function getDate(date: string, time: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [hourMinute, period] = time.split(' ');
  const [parsedHour, minute] = hourMinute.split(':').map(Number);
  let hour = parsedHour;

  // Date function expects hour to be in the 24 hour format.
  // Make adjustments based on AM/PM.
  if (period === 'PM') {
    if (hour !== 12) {
      // Add 12 to PM times.
      hour += 12;
    }
  } else if (period === 'AM') {
    // For midnight times, hour will be `12`. Reset it to `0`.
    if (hour === 12) {
      hour = 0;
    }
  }

  const dateObj = new Date(year, month, day, hour, minute);

  // Since the Date function does not warn us if an invalid date is supplied,
  // do it ourselves.
  if (!(dateObj instanceof Date && !isNaN(dateObj.getTime()))) {
    console.warn(`Invalid date supplied to Date function. Check values:
- date string: ${date}
- time string: ${time}
- parsed year: ${year}
- parsed month: ${month}
- parsed day: ${day}
- parsed hour: ${parsedHour}
- parsed minute: ${minute}
- parsed time period: ${period}
`);
  }

  return dateObj;
}

export default getDate;
