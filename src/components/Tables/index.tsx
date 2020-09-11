import React from 'react';

import { DateItem } from '../../models/data';
import { formatNumber } from '../../util/formatters';

interface TablesProps {
  data: DateItem[];
}

const Tables = ({ data }: TablesProps) => {
  return (
    <div>
      <div className="row">
        <h2>Data by date</h2>
      </div>
      <div className="row">
        {data.map((d) => (
          <div className="col-sm" key={d.date}>
            <h3>{d.date}</h3>
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
                    <td>{formatNumber(d.rate, ' in.')}</td>
                    <td>{formatNumber(d.accumulation, ' in.')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
