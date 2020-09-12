import React from 'react';

import { CsvData } from '../../models/data';
import { formatNumber } from '../../util/formatters';

interface TableProps {
  data: CsvData[];
}

const Table = ({ data }: TableProps): JSX.Element => (
  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Rate</th>
        <th>Accum.</th>
      </tr>
    </thead>
    <tbody>
      {data.map((d) => (
        <tr key={d.time}>
          <th>{d.time}</th>
          <td align="right">{formatNumber(d.rate, ' in.')}</td>
          <td align="right">{formatNumber(d.accumulation, ' in.')}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
