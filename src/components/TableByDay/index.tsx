import { descending } from 'd3-array';
import React, { useState } from 'react';
import Select, { OptionTypeBase, ValueType } from 'react-select';

import { NestedData, NestedDataValue } from '../../models/data';
import Table from '../Tables/Table';

interface DateOption extends OptionTypeBase {
  data: NestedDataValue;
}

interface TableByDayProps {
  data: NestedData[];
}

const TableByDay = ({ data }: TableByDayProps): JSX.Element => {
  const dateOptions: DateOption[] = data
    .sort((a, b) => descending(a.key, b.key))
    .map((d) => {
      return {
        label: d.key,
        value: d.key,
        data: d.value,
      };
    });
  const [selectedDate, setSelectedDate] = useState<ValueType<DateOption>>(
    dateOptions[0]
  );

  const selectedData =
    ((selectedDate && !Array.isArray(selectedDate)
      ? selectedDate
      : null) as DateOption) || null;

  return (
    <div>
      <div className="row">
        <div className="col">
          Select date for complete day data:
          <Select
            options={dateOptions}
            value={selectedDate}
            isClearable={false}
            onChange={setSelectedDate}
          />
          {selectedData && <Table data={selectedData.data.data} />}
        </div>
      </div>
    </div>
  );
};

export default TableByDay;
