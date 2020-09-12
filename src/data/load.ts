import { descending } from 'd3-array';
import { nest } from 'd3-collection';
import { csv } from 'd3-fetch';
import max from 'lodash-es/max';

import { CsvData, NestedData, NestedDataValue } from '../models/data';

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

const load = async (): Promise<NestedData[]> => {
  const data = await fetchCsv('/alexandria-floods/data/all.csv');
  const nested = nest<CsvData, NestedDataValue>()
    .key((d) => d.date)
    .rollup((d) => {
      return {
        maxRate: max(d.map((a) => a.rate)),
        maxAccumulation: max(d.map((a) => a.accumulation)),
        data: d,
      };
    })
    .entries(data) as NestedData[];

  return nested.sort((a, b) => descending(a.key, b.key));
};

export default load;
