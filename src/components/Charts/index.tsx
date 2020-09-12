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
    <div className="row">
      <div className="col-lg-6">
        <h2 className="text-center">Precipitation Rate (inches per hour)</h2>
        <Chart data={data} maxYValue={maxYValue} dataKey="rate" />
      </div>
      <div className="col-lg-6">
        <h2 className="text-center">Total accumulation (inches)</h2>
        <Chart data={data} maxYValue={maxYValue} dataKey="accumulation" />
      </div>
    </div>
  );
};

export default Charts;
