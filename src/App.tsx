import { ascending, descending } from 'd3-array';
import React, { useEffect, useState } from 'react';

import Charts from './components/Charts';
import Intro from './components/Intro';
import Tables from './components/Tables';
import load from './data/load';
import { DateItem, NestedData } from './models/data';
import diffMinutes from './util/diffMinutes';
import { formatNumber } from './util/formatters';

// Rate threshold.
const threshold = 0.5;
// Ideally, we want the index of the threshold data item to be third in the array.
const minThresholdIndex = 2;
// List of dates with confirmed flooding in the Rosemont neighborhood.
const floodDates = ['2019-07-08', '2020-07-23', '2020-09-10'];

const floodColors = ['#c20000', '#ff5e00', '#ffce6c'];
const nonFloodColors = ['#000048', '#0044d1', '#69c0ff', '#45a183', '#008400'];

function App() {
  const [data, setData] = useState<NestedData[] | null>(null);

  useEffect(() => {
    // Load and set data on app initialization.
    load().then(setData);
  }, []);

  const floodData: DateItem[] | null = data
    ? data
        // Filter to only certain dates.
        .filter((d) => floodDates.includes(d.key))
        .sort((a, b) =>
          // Sort by max accumulation (descending).
          descending(a.value.maxAccumulation || 0, b.value.maxAccumulation || 0)
        )
        .map((d, index) => {
          // Find the first item that goes above the rate threshold.
          const aboveThresholdIndex = d.value.data.findIndex(
            (s) => s.rate && s.rate > threshold
          );

          // We want to try to have two points before the threshold point.
          const canHaveBeforePoints = aboveThresholdIndex >= minThresholdIndex;
          const startIndex = canHaveBeforePoints
            ? aboveThresholdIndex - minThresholdIndex
            : 0;

          let startTime: Date | null = null;

          return {
            date: d.key,
            data: d.value.data
              .filter((_, i) => i >= startIndex)
              .map((d, i) => {
                if (!startTime) {
                  startTime = new Date(`${d.date} ${d.time}`);
                }

                const thisTime = new Date(`${d.date} ${d.time}`);

                return {
                  ...d,
                  elapsedTime: diffMinutes(startTime, thisTime),
                };
              })
              .sort((a, b) => ascending(a.elapsedTime, b.elapsedTime)),
            color: floodColors[index],
          };
        })
    : null;

  const nonFloodData: DateItem[] | null =
    data &&
    data
      // Filter to only certain dates.
      .filter((d) => !floodDates.includes(d.key))
      .filter(
        (d) =>
          d.value.maxAccumulation &&
          d.value.maxAccumulation >= 1.5 &&
          d.value.maxRate &&
          d.value.maxRate >= 1.1
      )
      .sort((a, b) =>
        // Sort by max accumulation (descending).
        descending(a.value.maxAccumulation || 0, b.value.maxAccumulation || 0)
      )
      .map((a, index) => {
        // Find the item with the max rate. We will display our data based on that.
        const maxRateItem = a.value.data.find(
          (b) => b.rate === a.value.maxRate
        );
        const maxRateDate =
          maxRateItem && new Date(`${maxRateItem.date} ${maxRateItem.time}`);

        let startTime: Date | null = null;

        return {
          date: a.key,
          data: a.value.data
            .filter((b) => {
              if (!maxRateDate) {
                return true;
              }

              const comparisonDate = new Date(`${b.date} ${b.time}`);
              const minuteDiff = diffMinutes(maxRateDate, comparisonDate);

              return minuteDiff < 120;
            })
            .map((b) => {
              if (!startTime) {
                startTime = new Date(`${b.date} ${b.time}`);
              }

              const thisTime = new Date(`${b.date} ${b.time}`);

              return {
                ...b,
                elapsedTime: diffMinutes(startTime, thisTime),
              };
            })
            .sort((a, b) => ascending(a.elapsedTime, b.elapsedTime)),
          color: nonFloodColors[index],
        };
      });

  return (
    <div className="container">
      <div className="header text-center">
        <h1>
          Precipitation Stats for Major Flash Flood Events in Hooffs Run,
          Alexandria,&nbsp;VA
        </h1>
      </div>
      <Intro />
      {floodData && nonFloodData ? (
        <div>
          <Charts floodData={floodData} nonFloodData={nonFloodData} />
          <hr />
          <Tables data={floodData} />
        </div>
      ) : (
        <div className="row align-items-center">
          <div className="col text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {data && (
        <div className="row border-top mt-3 pt-2">
          <div className="col-lg-3" />
          <div className="col-lg-6">
            <h2 className="text-center">Daily data</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Max precip. rate</th>
                  <th>Total accumulation</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.key}>
                    <th>
                      <a
                        href={`https://www.wunderground.com/dashboard/pws/KVAALEXA9/table/${d.key}/${d.key}/daily#history-toolbar`}
                      >
                        {d.key}
                      </a>
                    </th>
                    <td align="right">
                      {formatNumber(d.value.maxRate, ' in.')}
                    </td>
                    <td align="right">
                      {formatNumber(d.value.maxAccumulation, ' in.')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-3" />
        </div>
      )}
      <hr />
      <div className="row">
        <div className="col text-center">
          <p className="mb-0">
            Data retrieved from{' '}
            <a
              href="https://www.wunderground.com/dashboard/pws/KVAALEXA9"
              target="_blank"
              rel="noopener noreferrer"
            >
              PWS Rosemont Park - KVAALEXA9
            </a>
          </p>
          <p>
            Icons made by{' '}
            <a
              href="https://www.flaticon.com/authors/good-ware"
              title="Good Ware"
            >
              Good Ware
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
