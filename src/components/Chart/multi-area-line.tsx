import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Spin } from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';
import useRechartsTheme from '@/utils/useChartTheme';

const lineColorMap = ['#722ED1', '#33D1C9', '#F77234', '#165DFF'];

function MultiAreaLine({ data, loading }: { data: any[]; loading: boolean }) {
  const theme = useRechartsTheme();

  // 获取所有的数据系列名称
  const seriesNames =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'time') : [];

  const renderCustomTooltip = (props: any) => {
    if (props.active && props.payload && props.label) {
      const tooltipData = props.payload
        .map((item: any) => ({
          name: item.dataKey,
          value: item.value,
          color: item.color,
        }))
        .sort((a: any, b: any) => b.value - a.value);

      return (
        <CustomTooltip
          title={props.label}
          data={tooltipData}
          formatter={(value) => Number(value).toLocaleString()}
        />
      );
    }
    return null;
  };

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={352}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 0, left: 30, bottom: 30 }}
        >
          <defs>
            {seriesNames.map((name, index) => (
              <linearGradient
                key={`gradient-${name}`}
                id={`area-gradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={lineColorMap[index % lineColorMap.length]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor={lineColorMap[index % lineColorMap.length]}
                  stopOpacity={0.001}
                />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis
            dataKey="time"
            axisLine={{ stroke: theme.axisColor }}
            tickLine={{ stroke: theme.axisColor }}
            tick={{ fill: theme.textColor }}
          />
          <YAxis
            tickFormatter={(value) => `${Number(value) / 100}k`}
            axisLine={{ stroke: theme.axisColor }}
            tickLine={{ stroke: theme.axisColor }}
            tick={{ fill: theme.textColor }}
          />
          <Tooltip
            content={renderCustomTooltip}
            cursor={{ stroke: theme.gridColor }}
          />

          {seriesNames.map((name, index) => (
            <React.Fragment key={name}>
              <Area
                type="monotone"
                dataKey={name}
                fill={`url(#area-gradient-${index})`}
                stroke="none"
              />
              <Line
                type="monotone"
                dataKey={name}
                stroke={lineColorMap[index % lineColorMap.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: lineColorMap[index % lineColorMap.length],
                }}
              />
            </React.Fragment>
          ))}

          <Legend display="none" />
        </ComposedChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default MultiAreaLine;
