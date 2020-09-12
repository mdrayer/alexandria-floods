import React, { useState } from 'react';
import { flatten, max } from 'lodash-es';

import Chart from './Chart';

import { DateItem } from '../../models/data';

interface ChartProps {
  floodData: DateItem[];
  nonFloodData: DateItem[];
}

const Charts = ({ floodData, nonFloodData }: ChartProps): JSX.Element => {
  const [showNonFloodData, setShowNonFloodData] = useState(false);

  const flattenedData = flatten([
    ...floodData.map((a) => a.data),
    ...nonFloodData.map((a) => a.data),
  ]);
  const maxYValue = max([
    ...flattenedData.map((a) => a.rate),
    ...flattenedData.map((a) => a.accumulation),
  ]);

  const data = [...floodData, ...(showNonFloodData ? nonFloodData : [])];

  return (
    <div>
      <div className="row">
        <div className="col text-center">
          <h2>Precipitation events</h2>
          <div>
            <input
              type="checkbox"
              id="show-non-flood"
              name="show-non-flood"
              checked={showNonFloodData}
              onChange={() => setShowNonFloodData(!showNonFloodData)}
              className="mr-1"
            />
            <label htmlFor="show-non-flood">
              Show heavy rain events (non-flood)
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h3 className="text-center">Rate</h3>
          <Chart data={data} maxYValue={maxYValue} dataKey="rate" />
        </div>
        <div className="col-lg-6">
          <h3 className="text-center">Total Accumulation</h3>
          <Chart data={data} maxYValue={maxYValue} dataKey="accumulation" />
        </div>
      </div>
    </div>
  );
};

export default Charts;
