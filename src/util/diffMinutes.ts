/** Helper function to get different between Dates in minutes. */
function diffMinutes(dateOne: Date, dateTwo: Date) {
  const diff = (dateOne.getTime() - dateTwo.getTime()) / 1000 / 60;
  return Math.abs(Math.round(diff));
}

export default diffMinutes;
