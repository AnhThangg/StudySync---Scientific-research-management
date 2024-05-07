import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, color: '#DC143C' },
            { id: 1, value: 15, color: '#F08080' },
            { id: 2, value: 20, color: '#FFA07A' },
          ],
        },
      ]}
      width={600}
      height={400}
    />
  );
}