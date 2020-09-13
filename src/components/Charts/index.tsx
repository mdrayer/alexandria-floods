import React, { useState } from 'react';
import { flatten, max } from 'lodash-es';
import { descending } from 'd3-array';

import { DateItem } from '../../models/data';

import Chart from './Chart';
import LegendSquare from './LegendSquare';

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

  const data = [...floodData, ...(showNonFloodData ? nonFloodData : [])].sort(
    (a, b) =>
      // Sort by date to show most recent first.
      descending(a.date, b.date)
  );

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
              className="mr-1 align-middle"
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
      <div className="row">
        <div className="col">
          <div className="d-flex flex-wrap justify-content-center">
            {data.map((d) => (
              <div key={d.date} className="px-1">
                <LegendSquare color={d.color} />
                {d.date}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
