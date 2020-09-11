import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { flatten, max } from 'lodash-es';

import { DateItem } from '../../models/data';

const syncId = 'floodCharts';

// TODO: DATES TO GET
// September 11, 2011

const colors = ['#003f5c', '#bc5090', '#ffa600'];

interface ChartProps {
  data: DateItem[];
}

const Chart = ({ data }: ChartProps): JSX.Element => {
  const maxYValue = max(
    flatten([
      ...data.map((a) => a.data.map((b) => b.rate)),
      ...data.map((a) => a.data.map((b) => b.accumulation)),
    ])
  );

  return (
    <div>
      <h2>Precipitation Rate (inches per hour)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart syncId={syncId}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" type="number" tickFormatter={(i) => i * 15} />
          <YAxis
            dataKey="rate"
            domain={(maxYValue && [0, Math.ceil(maxYValue)]) || undefined}
          />
          <Tooltip labelFormatter={(i) => `${Number(i) * 15} minutes`} />
          <Legend />
          {data.map((d, i) => (
            <Line
              key={d.date}
              connectNulls={true}
              type="monotone"
              data={d.data}
              name={d.date}
              dataKey="rate"
              stroke={colors[i]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <h2>Total accumulation (inches)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart syncId={syncId}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" type="number" tickFormatter={(i) => i * 15} />
          <YAxis
            dataKey="accumulation"
            domain={(maxYValue && [0, Math.ceil(maxYValue)]) || undefined}
          />
          <Tooltip labelFormatter={(i) => `${Number(i) * 15} minutes`} />
          <Legend />
          {data.map((d, i) => (
            <Line
              key={d.date}
              connectNulls={true}
              type="monotone"
              data={d.data}
              name={d.date}
              dataKey="accumulation"
              stroke={colors[i]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
