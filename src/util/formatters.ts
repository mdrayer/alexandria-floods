import isNumber from 'lodash-es/isNumber';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Time will come in the 24 hour format of just HHMM. Morph to HH:MM PP */
const formatTime = (time: string): string => {
  const hour = Number(time.substring(0, 2));
  const minute = time.substring(2);
  const period = hour > 11 ? 'PM' : 'AM';
  const newHour = hour % 12;
  const newHourText = String(newHour === 0 ? 12 : newHour);
  const leadingZero = newHourText.length === 2 ? '' : '0';

  return `${leadingZero}${newHourText}:${minute} ${period}`;
};

/** Date will come as YYYY_MM_DD. Morph to "MONTH DAY, YEAR." */
const formatDate = (date: string): string => {
  const [year, month, day] = date.split('_');
  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
};

const formatNumber = (
  value: number | null | undefined,
  unit: string = ''
): string => {
  return isNumber(value) ? value.toFixed(2) + unit : '—';
};

export { formatTime, formatDate, formatNumber };
