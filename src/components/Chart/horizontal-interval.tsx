import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Spin } from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';
import useRechartsTheme from '@/utils/useChartTheme';

// 自定义圆角柱状图形状
const RoundedBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  const radius = Math.min(height / 2, 4); // 限制圆角半径

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={radius}
        ry={radius}
      />
    </g>
  );
};

function HorizontalInterval({
  data,
  loading,
  height,
}: {
  data: any[];
  loading: boolean;
  height?: number;
}) {
  const theme = useRechartsTheme();

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

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={height || 370}>
        <BarChart
          layout="horizontal"
          data={data}
          margin={{ top: 10, right: 30, left: 60, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis
            type="number"
            tickFormatter={(value) => `${Number(value) / 1000}k`}
            axisLine={{ stroke: theme.axisColor }}
            tickLine={{ stroke: theme.axisColor }}
            tick={{ fill: theme.textColor }}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={{ stroke: theme.axisColor }}
            tickLine={{ stroke: theme.axisColor }}
            tick={{ fill: theme.textColor }}
            width={50}
          />
          <Tooltip
            content={renderCustomTooltip}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />

          <Bar
            dataKey="count"
            fill="#4086FF"
            shape={<RoundedBar />}
            barSize={10}
          />
        </BarChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default HorizontalInterval;
