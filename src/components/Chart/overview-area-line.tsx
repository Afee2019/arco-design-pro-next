import React from 'react';
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Spin } from '@arco-design/web-react';

function OverviewAreaLine({
  data,
  loading,
  name = '总内容量',
  color = '#4080FF',
}: {
  data: any[];
  loading: boolean;
  name?: string;
  color?: string;
}) {
  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 40, bottom: 50 }}
        >
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgba(17, 126, 255, 0.5)"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="rgba(17, 128, 255, 0)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1EE7FF" />
              <stop offset="57%" stopColor="#249AFF" />
              <stop offset="85%" stopColor="#6F42FB" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#E5E8EF" />
          <XAxis
            dataKey="date"
            axisLine={{ stroke: '#E5E8EF' }}
            tickLine={{ stroke: '#E5E8EF' }}
          />
          <YAxis
            tickFormatter={(value) => `${Number(value) / 1000}k`}
            axisLine={{ stroke: '#E5E8EF' }}
            tickLine={{ stroke: '#E5E8EF' }}
          />
          <Tooltip
            formatter={(value) => [Number(value).toLocaleString(), name]}
            labelStyle={{ color: '#1D2129' }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E8EF',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="url(#colorLine)"
            strokeWidth={3}
            fill="url(#colorArea)"
            dot={{ r: 4, fill: color, stroke: '#ffffff', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: color, stroke: '#ffffff', strokeWidth: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default OverviewAreaLine;
