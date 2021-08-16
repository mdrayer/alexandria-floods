import { csv } from 'd3-fetch';

import NwsData from '../models/NwsData';

const csvFile = 'vtec_VAC510.csv';

function getString(val: string | undefined): string {
  return val ? val.trim() : '';
}

const loadNwsData = (): Promise<NwsData[]> => {
  return csv(`/alexandria-floods/data/${csvFile}`, (d) => {
    return {
      iso_issued: getString(d['iso_issued']),
      issued: getString(d['issued']),
      iso_expired: getString(d['iso_expired']),
      expired: getString(d['expired']),
      eventid: Number(getString(d.eventid)),
      phenomena: getString(d['phenomena']),
      significance: getString(d['significance']),
      hvtec_nwsli: getString(d['hvtec_nwsli']),
      wfo: getString(d['wfo']),
      name: getString(d['name']),
      ph_name: getString(d['ph_name']),
      sig_name: getString(d['sig_name']),
    };
  });
};

export default loadNwsData;
