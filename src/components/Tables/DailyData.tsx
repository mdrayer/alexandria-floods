import { ascending, descending } from 'd3-array';
import { nest } from 'd3-collection';
import uniq from 'lodash-es/uniq';
import React, { useMemo, useState } from 'react';

import { NestedData } from '../../models/data';
import NwsData from '../../models/nwsData';
import PhNames from '../../models/PhNames';
import { formatNumber } from '../../util/formatters';

interface WarningsByDate {
  [key: string]: NwsData[];
}

interface DailyTableData extends NestedData {
  warnings: string | null;
}

type DailyTableSorts =
  | 'date-asc'
  | 'date-desc'
  | 'rate-asc'
  | 'rate-desc'
  | 'accum-asc'
  | 'accum-desc';

interface SortButtonProps {
  currentSort: DailyTableSorts;
  sortAsc: DailyTableSorts;
  sortDesc: DailyTableSorts;
  onClick: (newSort: DailyTableSorts) => void;
  label: string;
}

const SortButton = ({
  currentSort,
  sortAsc,
  sortDesc,
  onClick,
  label,
}: SortButtonProps) => {
  let sortDirection: string = '';
  if (currentSort === sortDesc) {
    sortDirection = '-down';
  } else if (currentSort === sortAsc) {
    sortDirection = '-up';
  }
  return (
    <button
      className="btn text-white font-weight-bold"
      type="button"
      onClick={() => {
        onClick(currentSort === sortDesc ? sortAsc : sortDesc);
      }}
    >
      {label}&nbsp;
      <i className={`fas fa-sort${sortDirection}`}></i>
    </button>
  );
};

interface DailyDataProps {
  data: NestedData[];
  nwsData: NwsData[];
  floodDates: string[];
}

const DailyData = ({
  data,
  nwsData,
  floodDates,
}: DailyDataProps): JSX.Element => {
  const [sort, setSort] = useState<DailyTableSorts>('date-desc');

  const tableData: DailyTableData[] = useMemo(() => {
    const filteredWarnings = nwsData.filter(
      (d) =>
        d.sig_name === 'Warning' &&
        (d.ph_name === PhNames.FLASH_FLOOD ||
          d.ph_name === PhNames.FLOOD ||
          d.ph_name === PhNames.SEVERE_THUNDERSTORM)
    );

    const nestedWarnings: WarningsByDate = nest<NwsData>()
      .key((d) => {
        // `issued` string is formatted like `2020-09-10 20:14`.
        // We want to get the date, so split on the space.
        const [date] = d.issued.split(' ');
        return date;
      })
      .object(filteredWarnings);
    return data.map((d) => ({
      ...d,
      warnings: getWarnings(d.key, nestedWarnings),
    }));
  }, [data, nwsData]);

  return (
    <div className="row border-top justify-content-center mt-3 pt-3">
      <div className="col-lg-8">
        <h2 className="text-center">Daily data for significant rain dates</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>
                <SortButton
                  label="Date"
                  currentSort={sort}
                  sortAsc="date-asc"
                  sortDesc="date-desc"
                  onClick={setSort}
                />
              </th>
              <th style={{ width: '20%' }}>
                <SortButton
                  label="Max precip. rate"
                  currentSort={sort}
                  sortAsc="rate-asc"
                  sortDesc="rate-desc"
                  onClick={setSort}
                />
              </th>
              <th style={{ width: '20%' }}>
                <SortButton
                  label="Total accumulation"
                  currentSort={sort}
                  sortAsc="accum-asc"
                  sortDesc="accum-desc"
                  onClick={setSort}
                />
              </th>
              <th className="text-center">
                NWS Warnings
                <br />
                <small>issued that day</small>
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.8rem' }}>
            {tableData
              .sort((a, b) => {
                switch (sort) {
                  case 'accum-asc':
                    return ascending(
                      a.value.maxAccumulation || 0,
                      b.value.maxAccumulation || 0
                    );
                  case 'accum-desc':
                    return descending(
                      a.value.maxAccumulation || 0,
                      b.value.maxAccumulation || 0
                    );
                  case 'rate-asc':
                    return ascending(
                      a.value.maxRate || 0,
                      b.value.maxRate || 0
                    );
                  case 'rate-desc':
                    return descending(
                      a.value.maxRate || 0,
                      b.value.maxRate || 0
                    );
                  case 'date-asc':
                    return ascending(a.key, b.key);
                  case 'date-desc':
                  default:
                    return descending(a.key, b.key);
                }
              })
              .map((d) => (
                <tr
                  key={d.key}
                  className={
                    floodDates.includes(d.key) ? 'flood-date' : undefined
                  }
                >
                  <th>
                    <a
                      href={`https://www.wunderground.com/dashboard/pws/KVAALEXA9/table/${d.key}/${d.key}/daily#history-toolbar`}
                      className={
                        floodDates.includes(d.key) ? 'text-white' : undefined
                      }
                    >
                      {d.key}
                    </a>
                  </th>
                  <td align="right">{formatNumber(d.value.maxRate, ' in.')}</td>
                  <td align="right">
                    {formatNumber(d.value.maxAccumulation, ' in.')}
                  </td>
                  <td>{d.warnings}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function getWarnings(date: string, data: WarningsByDate): string | null {
  const datum = data[date];

  if (!datum) {
    return null;
  }

  return uniq(datum.map((d) => d.ph_name))
    .sort()
    .join(', ');
}

export default DailyData;
