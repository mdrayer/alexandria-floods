import React from 'react';

const Intro = (): JSX.Element => (
  <div className="row">
    <div className="col">
      <p>
        In the Hooffs Run/Blue Park neighborhood, there have been 4 major flood
        events in 2019, 2020, and 2021: <strong>July 8, 2019</strong>;{" "}
        <strong>July 23, 2020</strong>; <strong>September 10, 2020</strong>; and{" "}
        <strong>August 15, 2021</strong>. Using local personal weather stations
        (PWS), we gathered data dating back to October 2012 looking for major
        precipitation events. In the charts below, we show the{" "}
        <strong>precipitation rate (inch per hour)</strong> and{" "}
        <strong>total accumulation (inches)</strong> for selected flood and
        heavy rain events. Flood events use reds/oranges/yellows, while heavy
        rain events use blues/greens.
      </p>
    </div>
  </div>
);

export default Intro;
