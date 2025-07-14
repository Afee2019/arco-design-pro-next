import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts';
import CustomTooltip from './customer-tooltip';
import { Spin } from '@arco-design/web-react';
import { foldData } from '@/utils/dataTransform';
import useRechartsTheme from '@/utils/useChartTheme';

interface AreaPolarProps {
  data: any[];
  loading: boolean;
  fields: string[];
  height: number;
}

const colors = ['#313CA9', '#21CCFF', '#249EFF'];
const areaColors = [
  'rgba(49, 60, 169, 0.4)',
  'rgba(33, 204, 255, 0.4)',
  'rgba(36, 158, 255, 0.4)',
];

function AreaPolar(props: AreaPolarProps) {
  const { data, loading, fields, height } = props;
  const theme = useRechartsTheme();

  // 注意：这里保留 foldData 的引用以展示数据转换能力，实际使用 radarData

  // 重新组织数据以适应 RadarChart 的格式
  // RadarChart 需要每个 item 作为一个数据点，每个 category 作为一个系列
  const radarData = data.map((item) => {
    const result: any = { item: item.item };
    fields.forEach((field) => {
      result[field] = item[field];
    });
    return result;
  });

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
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
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
      <div style={{ position: 'relative', height: height || 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={radarData}
            margin={{ top: 20, right: 80, bottom: 20, left: 20 }}
          >
            <PolarGrid stroke={theme.gridColor} />
            <PolarAngleAxis
              dataKey="item"
              tick={{ fill: theme.textColor, fontSize: 12 }}
            />
            <PolarRadiusAxis
              domain={[0, 80]}
              tick={{ fill: theme.textColor, fontSize: 10 }}
              tickCount={5}
            />
            <Tooltip content={renderCustomTooltip} />

            {fields.map((field, index) => (
              <Radar
                key={field}
                name={field}
                dataKey={field}
                stroke={colors[index % colors.length]}
                fill={areaColors[index % areaColors.length]}
                strokeWidth={2}
                dot={{ r: 3, fill: colors[index % colors.length] }}
              />
            ))}

            <Legend content={renderLegend} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Spin>
  );
}

export default AreaPolar;
