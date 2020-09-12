import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { DateItem } from '../../models/data';

interface ChartProps {
  data: DateItem[];
  maxYValue: number | null | undefined;
  dataKey: 'accumulation' | 'rate';
  syncId?: string;
}

/**
 * Displays data within a three hour window.
 */
const Chart = ({
  data,
  maxYValue,
  dataKey,
  syncId,
}: ChartProps): JSX.Element => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart syncId={syncId} margin={{ right: 5, bottom: 20 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="elapsedTime"
        type="number"
        ticks={[0, 30, 60, 90, 120, 150, 180]}
        domain={[0, 180]}
        label={{
          value: 'Elapsed time (minutes)',
          position: 'bottom',
          offset: 0,
        }}
      />
      <YAxis
        dataKey={dataKey}
        width={20}
        domain={(maxYValue && [0, Math.ceil(maxYValue)]) || undefined}
      />
      {/* <Tooltip labelFormatter={(i) => `${Number(i) * 15} minutes`} /> */}
      <Legend verticalAlign="top" iconType="square" />
      {data.map((d) => (
        <Line
          key={d.date}
          connectNulls={true}
          type="monotone"
          // We want to only show data within the domain.
          data={d.data.filter((a) => a.elapsedTime <= 180)}
          name={d.date}
          dataKey={dataKey}
          stroke={d.color}
          dot={false}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

export default Chart;
