interface NwsData {
  iso_issued: string;
  issued: string;
  iso_expired: string;
  expired: string;
  eventid: number;
  phenomena: string;
  significance: string;
  hvtec_nwsli: string;
  wfo: string;
  name: string;
  ph_name: string;
  sig_name: string;
}

export interface NestedNwsData {
  key: string;
  values: {
    key: string;
    values: NwsData[];
  }[];
}

export default NwsData;
