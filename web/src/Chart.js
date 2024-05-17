import * as React from 'react';
import { LineChart} from '@mui/x-charts';
import Title from './Title';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#01579b", // Change to darkblue
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
// 테이블 1차 헤더 색깔

const otherSetting = {
  yAxis: [{ label: 'Sales(판매수치)' }],
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translateX(-40px)',
    },
  },
};

export default function TestChart() {
  return (
    <React.Fragment>
      <Title>피를 마시는 새의 2023년 판매수치</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden'}}>
        <LineChart
          margin={{left:80}}
          xAxis={[
            {
              dataKey: 'month',
              valueFormatter: (value) => value.toString(),
              min: 1,
              max: 12,
              label: 'Month(월)'
            },
          ]}
         
          
          series={Object.keys(keyToLabel).map((key) => ({
            dataKey: key,
            label: keyToLabel[key],
            curve: "linear",
          }))}
          dataset={worldElectricityProduction}
          {...customize}
          {...otherSetting}
          grid={{ vertical: true, horizontal: true }}
          // xAxisName="Month" // Adding x-axis name
          // yAxisName="Sales" // Adding y-axis name
        />
      </div>
    </React.Fragment>
  );
}

const worldElectricityProduction = [

  {
    country: 'World',
    month: 1,
    coal: 9518,
  },
  {
    country: 'World',
    month: 2,
    coal: 9899,
  },
  {
    country: 'World',
    month: 3,
    coal: 9680,
  },
  {
    country: 'World',
    month: 4,
    coal: 9292,
  },
  {
    country: 'World',
    month: 5,
    coal: 10081,
  },
  {
    country: 'World',
    month: 6,
    coal: 10190,
  },
  {
    country: 'World',
    month: 7,
    coal: 10390,
  },
  {
    country: 'World',
    month: 8,
    coal: 10521,
  },
  {
    country: 'World',
    month: 9,
    coal: 10712,
  },
  {
    country: 'World',
    month: 10,
    coal: 10931,
  },
  {
    country: 'World',
    month: 11,
    coal: 11130,
  },
  {
    country: 'World',
    month: 12,
    coal: 11320,
  },
];
const keyToLabel = {
  coal: '판매지수 : ',
};
const customize = {
  height: 300,
  legend: { hidden: true },
  // margin: { top: 5 },
};





// // Generate Sales Data
// function createData(time, amount) {
//   return { time, amount: amount ?? null };
// }

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00'),
// ];

// export default function Chart() {
//   const theme = useTheme();

//   return (
//     <React.Fragment>
//       <Title>Today</Title>
//       <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
//         <LineChart
//           dataset={data}
//           margin={{
//             top: 16,
//             right: 20,
//             left: 70,
//             bottom: 30,
//           }}
//           xAxis={[
//             {
//               scaleType: 'point',
//               dataKey: 'time',
//               tickNumber: 2,
//               tickLabelStyle: theme.typography.body2,
//             },
//           ]}
//           yAxis={[
//             {
//               label: 'Sales ($)',
//               labelStyle: {
//                 ...theme.typography.body1,
//                 fill: theme.palette.text.primary,
//               },
//               tickLabelStyle: theme.typography.body2,
//               max: 2500,
//               tickNumber: 3,
//             },
//           ]}
//           series={[
//             {
//               dataKey: 'amount',
//               showMark: false,
//               color: theme.palette.primary.light,
//             },
//           ]}
//           sx={{
//             [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
//             [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
//             [`& .${axisClasses.left} .${axisClasses.label}`]: {
//               transform: 'translateX(-25px)',
//             },
//           }}
//         />
//       </div>
//     </React.Fragment>
//   );
// }
