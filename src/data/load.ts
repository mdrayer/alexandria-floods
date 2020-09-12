import { csv } from 'd3-fetch';

import { CsvData, DateItem } from '../models/data';

const dates = ['2019_07_08', '2020_07_23', '2020_09_10'];
const threshhold = 0.5;

/** Helper function to get different between Dates in minutes. */
function diffMinutes(dateOne: Date, dateTwo: Date) {
  const diff = (dateOne.getTime() - dateTwo.getTime()) / 1000 / 60;
  return Math.abs(Math.round(diff));
}

async function fetchCsv(path: string): Promise<CsvData[]> {
  return csv(path, (d) => {
    // Gather data by column name.
    const date = d.Date;
    const time = d.Time;
    const rate = d['Precip. Rate.'];
    const accumulation = d['Precip. Accum.'];
    return {
      date: String(date),
      time: String(time),
      rate: !rate || rate.length === 0 ? null : Number(rate),
      accumulation:
        !accumulation || accumulation.length === 0
          ? null
          : Number(accumulation),
    };
  });
}

// The amount of data points we want to show (for now).
const count = 13;
// Ideally, we want the index of the threshold data item to be third in the array.
const minThresholdIndex = 2;

const load = async (): Promise<DateItem[]> => {
  const result = await Promise.all(
    dates.map((d) => fetchCsv(`/alexandria-floods/data/${d}.csv`))
  );
  return result.map((r) => {
    // Find the first item that goes above the rate threshold.
    const aboveThresholdIndex = r.findIndex(
      (s) => s.rate && s.rate > threshhold
    );

    // We want to try to have two points before the threshold point.
    const canHaveBeforePoints = aboveThresholdIndex >= minThresholdIndex;
    const startIndex = canHaveBeforePoints
      ? aboveThresholdIndex - minThresholdIndex
      : 0;
    const lastIndex = startIndex + count;

    let startTime: Date | null = null;

    return {
      date: r[0].date,
      data: r
        .filter((_, i) => i >= startIndex && i < lastIndex)
        .map((d) => {
          if (!startTime) {
            startTime = new Date(`${d.date} ${d.time}`);
          }

          const thisTime = new Date(`${d.date} ${d.time}`);

          return {
            ...d,
            elapsedTime: diffMinutes(startTime, thisTime),
          };
        }),
    };
  });
};

export default load;
