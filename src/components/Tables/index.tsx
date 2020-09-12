import React from 'react';

import { DateItem } from '../../models/data';
import { formatNumber } from '../../util/formatters';

interface TablesProps {
  data: DateItem[];
}

const Tables = ({ data }: TablesProps) => {
  return (
    <div className="row">
      {data.map((d) => (
        <div className="col-md-4" key={d.date}>
          <h3 className="text-center">{d.date}</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Rate</th>
                <th>Accumulation</th>
              </tr>
            </thead>
            <tbody>
              {d.data.map((d) => (
                <tr key={d.time}>
                  <th>{d.time}</th>
                  <td align="right">{formatNumber(d.rate, ' in.')}</td>
                  <td align="right">{formatNumber(d.accumulation, ' in.')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Tables;
