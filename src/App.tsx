import { ascending, descending } from 'd3-array';
import React, { useEffect, useState } from 'react';

import Charts from './components/Charts';
import Intro from './components/Intro';
import Tables from './components/Tables';
import DailyData from './components/Tables/DailyData';
import load from './data/load';
import loadNwsData from './data/loadNwsData';
import { DateItem, NestedData } from './models/data';
import NwsData from './models/NwsData';
import { floodColors, nonFloodColors } from './util/colors';
import diffMinutes from './util/diffMinutes';
import getDate from './util/getDate';

// Rate threshold.
const threshold = 0.5;
// Ideally, we want the index of the threshold data item to be third in the array.
const minThresholdIndex = 2;
// List of dates with confirmed flooding in the Rosemont neighborhood.
const floodDates = ['2019-07-08', '2020-07-23', '2020-09-10', '2021-08-15'];

function App() {
  const [data, setData] = useState<NestedData[] | null>(null);
  const [nwsData, setNwsData] = useState<NwsData[] | null>(null);

  useEffect(() => {
    // Load and set data on app initialization.
    load().then(setData);
    loadNwsData().then(setNwsData);
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
                  startTime = getDate(d.date, d.time);
                }

                const thisTime = getDate(d.date, d.time);

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
        const maxRateItemIndex = a.value.data.findIndex(
          (b) => b.rate === a.value.maxRate
        );
        const maxRateItem =
          maxRateItemIndex > -1 ? a.value.data[maxRateItemIndex] : undefined;
        const maxRateDate =
          maxRateItem && getDate(maxRateItem.date, maxRateItem.time);

        let startTime: Date | null = null;

        return {
          date: a.key,
          data: a.value.data
            .filter((b, i) => {
              if (!maxRateDate) {
                return true;
              }

              if (i > maxRateItemIndex) {
                return true;
              }

              const comparisonDate = getDate(b.date, b.time);
              const minuteDiff = diffMinutes(maxRateDate, comparisonDate);

              return minuteDiff <= 80;
            })
            .map((b) => {
              if (!startTime) {
                startTime = getDate(b.date, b.time);
              }

              const thisTime = getDate(b.date, b.time);

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
      {data && nwsData ? (
        <DailyData data={data} nwsData={nwsData} floodDates={floodDates} />
      ) : null}
      <hr />
      <div className="row">
        <div className="col text-center">
          <p className="mb-0">
            Local weather data retrieved from{' '}
            <a
              href="https://www.wunderground.com/dashboard/pws/KVAALEXA9"
              target="_blank"
              rel="noopener noreferrer"
            >
              PWS Rosemont Park - KVAALEXA9
            </a>
          </p>
          <p className="mb-0">
            National Weather Service (NWS) Watch, Warning, and Advisories data
            retrieved from{' '}
            <a
              href="https://mesonet.agron.iastate.edu/vtec/search.php#byugc/VA/VAC510/20000101/20200913"
              target="_blank"
              rel="noopener noreferrer"
            >
              Iowa State University
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
