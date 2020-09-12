import React from 'react';

import { DateItem } from '../../models/data';

import Table from './Table';

interface TablesProps {
  data: DateItem[];
}

const Tables = ({ data }: TablesProps) => (
  <div>
    <div className="row">
      <div className="col">
        <h2 className="text-center">Detailed data for flood events</h2>
      </div>
    </div>
    <div className="row">
      {data.map((d) => (
        <div className="col-md-4" key={d.date}>
          <h3 className="text-center">{d.date}</h3>
          <Table data={d.data.filter((_, i) => i < 14)} />
        </div>
      ))}
    </div>
  </div>
);

export default Tables;
