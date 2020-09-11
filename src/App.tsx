import React, { useEffect, useState } from 'react';

import Chart from './components/Chart';
import Tables from './components/Tables';
import load from './data/load';
import { DateItem } from './models/data';

function App() {
  const [data, setData] = useState<DateItem[] | null>(null);

  useEffect(() => {
    // Load and set data on app initialization.
    load().then(setData);
  }, []);

  return (
    <div className="container">
      <div className="header text-center">
        <h1>Precipitation Stats for Major Flood Events in Alexandria, VA</h1>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            Data retrieved from PWS Rosemont Park - KVAALEXA9:{' '}
            <a
              href="https://www.wunderground.com/dashboard/pws/KVAALEXA9"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.wunderground.com/dashboard/pws/KVAALEXA9
            </a>
          </p>
        </div>
      </div>
      {data ? (
        <div>
          <Chart data={data} />
          <Tables data={data} />
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
      <div className="row">
        <div className="col text-center">
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
        </div>
      </div>
    </div>
  );
}

export default App;
