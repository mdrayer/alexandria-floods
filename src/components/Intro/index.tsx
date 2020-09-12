import React from 'react';

const Intro = (): JSX.Element => (
  <div className="row">
    <div className="col">
      <p>
        In the Hooffs Run/Blue Park neighborhood, we have had 3 major flood
        events in 2019 and 2020: <strong>July 8, 2019</strong>;{' '}
        <strong>July 23, 2020</strong>; and <strong>September 10, 2020</strong>.
        Using local personal weather stations (PWS), we gathered data dating
        back to October 2012 looking for major precipitation events (note that
        only 2019 and 2020 data are currently in the app). In the charts below,
        we show the <strong>precipition rate (inch per hour)</strong> and{' '}
        <strong>total accumulation (inches)</strong> for selected flood and
        heavy rain events. Flood events use reds/oranges/yellows, while heavy
        rain events use blues/greens.
      </p>
    </div>
  </div>
);

export default Intro;
