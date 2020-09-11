import React from 'react';
import { flatten, max } from 'lodash-es';

import { DateItem } from '../../models/data';
import Chart from './Chart';

// TODO: DATES TO GET
// September 11, 2011

interface ChartProps {
  data: DateItem[];
}

const Charts = ({ data }: ChartProps): JSX.Element => {
  const flattenedData = flatten(data.map((a) => a.data));
  const maxYValue = max([
    ...flattenedData.map((a) => a.rate),
    ...flattenedData.map((a) => a.accumulation),
  ]);

  return (
    <div>
      <h2>Precipitation Rate (inches per hour)</h2>
      <Chart data={data} maxYValue={maxYValue} dataKey="rate" />
      <h2>Total accumulation (inches)</h2>
      <Chart data={data} maxYValue={maxYValue} dataKey="accumulation" />
    </div>
  );
};

export default Charts;
