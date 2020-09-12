import React from 'react';
import { flatten, max } from 'lodash-es';

import Chart from './Chart';

import { DateItem } from '../../models/data';

interface ChartProps {
  data: DateItem[];
  noFloodData: DateItem[];
}

const floodColors = ['#c20000', '#ff5e00', '#ffce6c'];
const nonFloodColors = ['#000048', '#0044d1', '#69c0ff', '#45a183', '#008400'];

const Charts = ({ data, noFloodData }: ChartProps): JSX.Element => {
  const flattenedData = flatten([
    ...data.map((a) => a.data),
    ...noFloodData.map((a) => a.data),
  ]);
  const maxYValue = max([
    ...flattenedData.map((a) => a.rate),
    ...flattenedData.map((a) => a.accumulation),
  ]);

  return (
    <div>
      <div className="row">
        <div className="col">
          <h2 className="text-center">Flood events</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h3 className="text-center">Precipitation Rate (inches per hour)</h3>
          <Chart
            data={data}
            maxYValue={maxYValue}
            dataKey="rate"
            colors={floodColors}
          />
        </div>
        <div className="col-lg-6">
          <h3 className="text-center">Total accumulation (inches)</h3>
          <Chart
            data={data}
            maxYValue={maxYValue}
            dataKey="accumulation"
            colors={floodColors}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2 className="text-center">Heavy rain events (no flooding)</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h3 className="text-center">Precipitation Rate (inches per hour)</h3>
          <Chart
            data={noFloodData}
            maxYValue={maxYValue}
            dataKey="rate"
            colors={nonFloodColors}
          />
        </div>
        <div className="col-lg-6">
          <h3 className="text-center">Total accumulation (inches)</h3>
          <Chart
            data={noFloodData}
            maxYValue={maxYValue}
            dataKey="accumulation"
            colors={nonFloodColors}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2 className="text-center">Combined events</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h3 className="text-center">Precipitation Rate (inches per hour)</h3>
          <Chart
            data={[...data, ...noFloodData]}
            maxYValue={maxYValue}
            dataKey="rate"
            colors={[
              ...data.map((_, i) => floodColors[i]),
              ...noFloodData.map((_, i) => nonFloodColors[i]),
            ]}
          />
        </div>
        <div className="col-lg-6">
          <h3 className="text-center">Total accumulation (inches)</h3>
          <Chart
            data={[...data, ...noFloodData]}
            maxYValue={maxYValue}
            dataKey="accumulation"
            colors={[
              ...data.map((_, i) => floodColors[i]),
              ...noFloodData.map((_, i) => nonFloodColors[i]),
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
