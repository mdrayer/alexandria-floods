import { csv } from 'd3-fetch';

import { CsvData, DateItem } from '../models/data';
import { formatDate, formatTime } from '../util/formatters';

const dates = ['2019_07_08', '2020_07_23', '2020_09_10'];
const threshhold = 0.5;

async function fetchCsv(path: string, date: string): Promise<CsvData[]> {
  return csv(path, (d) => {
    return {
      date: formatDate(date),
      time: (d.time && formatTime(d.time)) || '',
      rate: !d.rate || d.rate.length === 0 ? null : Number(d.rate),
      accumulation:
        !d.accumulation || d.accumulation.length === 0
          ? null
          : Number(d.accumulation),
    };
  });
}

const load = async (): Promise<DateItem[]> => {
  const result = await Promise.all(
    dates.map((d) => fetchCsv(`/alexandria-floods/data/${d}.csv`, d))
  );
  return result.map((r) => {
    // Find the first item that goes above the rate threshold.
    const aboveThresholdIndex = r.findIndex(
      (s) => s.rate && s.rate > threshhold
    );
    return {
      date: r[0].date,
      data: r
        .filter((_, i) =>
          aboveThresholdIndex > 3 ? i > aboveThresholdIndex - 4 : true
        )
        .map((d, index) => ({
          ...d,
          index,
        })),
    };
  });
};

export default load;
