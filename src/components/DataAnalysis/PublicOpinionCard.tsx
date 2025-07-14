import React from 'react';
import { Skeleton, Statistic, Typography } from '@arco-design/web-react';
import cs from 'classnames';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  Tooltip,
} from 'recharts';

import { IconArrowRise, IconArrowFall } from '@arco-design/web-react/icon';
import styles from '@/pages/visualization/data-analysis/style/public-opinion.module.less';

const { Title, Text } = Typography;

export interface PublicOpinionCardProps {
  key: string;
  title: string;
  chartData?: any[];
  chartType: 'line' | 'interval' | 'pie';
  count?: number;
  increment?: boolean;
  diff?: number;
  compareTime?: string;
  loading?: boolean;
}

function SimpleLine(props: { chartData: any[] }) {
  const { chartData } = props;

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length > 0) {
      return (
        <div className={styles.tooltip}>
          {props.payload.map((entry: any, index: number) => (
            <div key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
      >
        <Line
          type="monotone"
          dataKey="y"
          stroke="#165DFF"
          strokeWidth={3}
          dot={false}
          strokeDasharray="0"
        />
        <Line
          type="monotone"
          dataKey="y2"
          stroke="rgba(106,161,255,0.3)"
          strokeWidth={3}
          dot={false}
          strokeDasharray="8,10"
        />
        <Tooltip content={renderTooltip} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function SimpleInterval(props: { chartData: any[] }) {
  const { chartData } = props;

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length > 0) {
      return (
        <div className={styles.tooltip}>
          {props.payload.map((entry: any, index: number) => (
            <div key={index} style={{ color: entry.color }}>
              {entry.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // 为数据添加颜色
  const dataWithColors = chartData.map((item) => ({
    ...item,
    fill: Number(item.x) % 2 === 0 ? '#2CAB40' : '#86DF6C',
  }));

  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart
        data={dataWithColors}
        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
      >
        <Bar dataKey="y" radius={[4, 4, 0, 0]} />
        <Tooltip content={renderTooltip} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function SimplePie(props: { chartData: any[] }) {
  const { chartData } = props;

  const COLORS = ['#8D4EDA', '#00B2FF', '#165DFF'];

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length > 0) {
      const data = props.payload[0];
      return (
        <div className={styles.tooltip}>
          <div style={{ color: data.color }}>
            {data.name}: {data.value}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={80}>
      <PieChart margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={32}
          innerRadius={22}
          dataKey="count"
          nameKey="name"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={renderTooltip} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function PublicOpinionCard(props: PublicOpinionCardProps) {
  const { chartType, title, count, increment, diff, chartData, loading } =
    props;
  const className = cs(styles.card, styles[`card-${chartType}`]);

  return (
    <div className={className}>
      <div className={styles.statistic}>
        <Statistic
          title={
            <Title heading={6} className={styles.title}>
              {title}
            </Title>
          }
          loading={loading}
          value={count}
          groupSeparator
        />
        <div className={styles['compare-yesterday']}>
          <Text type="secondary" className={styles['compare-yesterday-text']}>
            {props.compareTime}
          </Text>
          <span
            className={cs(styles['diff'], {
              [styles['diff-increment']]: increment,
            })}
          >
            {loading ? (
              <Skeleton text={{ rows: 1 }} animation />
            ) : (
              <>
                {diff}
                {increment ? <IconArrowRise /> : <IconArrowFall />}
              </>
            )}
          </span>
        </div>
      </div>
      <div className={styles.chart}>
        {loading ? (
          <Skeleton
            text={{ rows: 3, width: Array(3).fill('100%') }}
            animation
          />
        ) : (
          <>
            {chartType === 'interval' && (
              <SimpleInterval chartData={chartData} />
            )}
            {chartType === 'line' && <SimpleLine chartData={chartData} />}
            {chartType === 'pie' && <SimplePie chartData={chartData} />}
          </>
        )}
      </div>
    </div>
  );
}

export default PublicOpinionCard;
