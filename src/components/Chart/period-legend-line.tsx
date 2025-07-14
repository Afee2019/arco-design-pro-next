import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Spin } from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';
import useRechartsTheme from '@/utils/useChartTheme';

const lineColor = ['#21CCFF', '#313CA9', '#249EFF'];

function PeriodLine({ data, loading }: { data: any[]; loading: boolean }) {
  const theme = useRechartsTheme();

  // 获取所有的数据系列名称（除了 time 字段）
  const seriesNames =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'time') : [];

  const renderCustomTooltip = (props: any) => {
    if (props.active && props.payload && props.label) {
      const tooltipData = props.payload.map((item: any) => ({
        name: item.dataKey,
        value: item.value,
        color: item.stroke,
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
          marginBottom: '20px',
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
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 60, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis
            dataKey="time"
            axisLine={{ stroke: theme.axisColor }}
            tickLine={{ stroke: theme.axisColor }}
            tick={{ fill: theme.textColor }}
          />
          <YAxis
            tickFormatter={(value) => `${Number(value)}%`}
            axisLine={{ stroke: theme.axisColor }}
            tickLine={{ stroke: theme.axisColor }}
            tick={{ fill: theme.textColor }}
          />
          <Tooltip
            content={renderCustomTooltip}
            cursor={{ stroke: theme.gridColor }}
          />

          {seriesNames.map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={lineColor[index % lineColor.length]}
              strokeWidth={2}
              dot={{ r: 4, fill: lineColor[index % lineColor.length] }}
              activeDot={{ r: 6, fill: lineColor[index % lineColor.length] }}
            />
          ))}

          <Legend content={renderLegend} />
        </LineChart>
      </ResponsiveContainer>
      {/* 注意：Slider 功能已移除，因为 Recharts 没有内置的 Slider 组件 */}
      {/* 如果需要 Slider 功能，建议使用 Arco Design 的 Slider 组件在外部实现 */}
    </Spin>
  );
}

export default PeriodLine;
