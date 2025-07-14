import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Spin } from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';
import useRechartsTheme from '@/utils/useChartTheme';

const stackColors = ['#81E2FF', '#00B2FF', '#246EFF'];

function MultiInterval({ data, loading }: { data: any[]; loading: boolean }) {
  const theme = useRechartsTheme();

  // 获取所有的数据系列名称（除了 time 字段）
  const seriesNames =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'time') : [];

  const renderCustomTooltip = (props: any) => {
    if (props.active && props.payload && props.label) {
      const tooltipData = props.payload.map((item: any) => ({
        name: item.dataKey,
        value: item.value,
        color: item.fill,
      }));

      return <CustomTooltip title={props.label} data={tooltipData} />;
    }
    return null;
  };

  const renderLegend = (props: any) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '10px',
        }}
      >
        {props.payload.map((entry: any, index: number) => (
          <div
            key={index}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: entry.color,
              }}
            />
            <span style={{ color: theme.textColor, fontSize: '12px' }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={370}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 30, bottom: 50 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis
            dataKey="time"
            axisLine={{ stroke: theme.axisColor }}
            tickLine={{ stroke: theme.axisColor }}
            tick={{ fill: theme.textColor }}
          />
          <YAxis
            tickFormatter={(value) => `${Number(value) / 1000}k`}
            axisLine={{ stroke: theme.axisColor }}
            tickLine={{ stroke: theme.axisColor }}
            tick={{ fill: theme.textColor }}
          />
          <Tooltip
            content={renderCustomTooltip}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />

          {seriesNames.map((name, index) => (
            <Bar
              key={name}
              dataKey={name}
              stackId="stack"
              fill={stackColors[index % stackColors.length]}
              radius={
                index === seriesNames.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]
              }
            />
          ))}

          <Legend content={renderLegend} />
        </BarChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default MultiInterval;
