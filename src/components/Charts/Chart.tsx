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

import { DateItem } from '../../models/data';

const colors = ['#003f5c', '#bc5090', '#ffa600'];

interface ChartProps {
  data: DateItem[];
  maxYValue: number | null | undefined;
  dataKey: 'accumulation' | 'rate';
  syncId: string;
}

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
        dataKey="index"
        type="number"
        tickFormatter={(i) => i * 15}
        tickCount={6}
        domain={['dataMin', 'dataMax']}
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
      <Tooltip labelFormatter={(i) => `${Number(i) * 15} minutes`} />
      <Legend verticalAlign="top" />
      {data.map((d, i) => (
        <Line
          key={d.date}
          connectNulls={true}
          type="monotone"
          data={d.data}
          name={d.date}
          dataKey={dataKey}
          stroke={colors[i]}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

export default Chart;
