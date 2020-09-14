import { ascending } from 'd3-array';
import { nest } from 'd3-collection';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import NwsData, { NestedNwsData } from '../../models/NwsData';
import PhNames from '../../models/PhNames';
import { nonFloodColors } from '../../util/colors';

interface NWSWWAInfoProps {
  data: NwsData[];
}

const NWSWWAInfo = ({ data }: NWSWWAInfoProps) => {
  const nestedData = nest<NwsData>()
    .key((d) => {
      const date = new Date(d.iso_issued);
      return String(date.getFullYear());
    })
    .sortKeys(ascending)
    .key((d) => d.ph_name)
    .sortKeys(ascending)
    .entries(data.filter((d) => d.sig_name === 'Warning')) as NestedNwsData[];

  const precipBarData = nestedData
    .filter((a) => a.key > '2009')
    .map((a) => {
      const tStormData = a.values.find(
        (b) => b.key === PhNames.SEVERE_THUNDERSTORM
      );
      const floodData = a.values.find((b) => b.key === PhNames.FLOOD);
      const flashFloodData = a.values.find(
        (b) => b.key === PhNames.FLASH_FLOOD
      );

      return {
        key: a.key,
        [PhNames.SEVERE_THUNDERSTORM]: tStormData
          ? tStormData.values.length
          : 0,
        [PhNames.FLOOD]: floodData ? floodData.values.length : 0,
        [PhNames.FLASH_FLOOD]: flashFloodData
          ? flashFloodData.values.length
          : 0,
      };
    });

  return (
    <div className="row border-top mt-3 pt-3">
      <div className="col">
        <h2 className="text-center">
          NWS Warnings for the City of Alexandria since 2010
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={precipBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={PhNames.FLOOD} fill={nonFloodColors[1]} />
            <Bar dataKey={PhNames.FLASH_FLOOD} fill={nonFloodColors[2]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NWSWWAInfo;
