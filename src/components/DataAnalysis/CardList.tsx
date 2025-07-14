import React, { useEffect, useState, useMemo } from 'react';
import {
  Statistic,
  Typography,
  Spin,
  Grid,
  Card,
  Skeleton,
} from '@arco-design/web-react';
import cs from 'classnames';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Tooltip,
} from 'recharts';
import axios from 'axios';

import { IconArrowRise, IconArrowFall } from '@arco-design/web-react/icon';
import styles from '@/pages/visualization/multi-dimension-data-analysis/style/card-block.module.less';

const { Row, Col } = Grid;
const { Title, Text } = Typography;
// Recharts 不需要这些基础配置

export interface CardProps {
  key: string;
  title?: string;
  chartData?: any[];
  chartType: string;
  count?: number;
  increment?: boolean;
  diff?: number;
  loading?: boolean;
}

function CustomTooltip(props: { payload?: any[] }) {
  const { payload } = props;
  if (!payload || payload.length === 0) return null;

  return (
    <div className={styles.tooltip}>
      {payload.map((item, index) => (
        <div key={index}>
          <Text bold>{Number(item.value).toLocaleString()}</Text>
        </div>
      ))}
    </div>
  );
}
function SimpleLine(props: { chartData: any[] }) {
  const { chartData } = props;

  const renderTooltip = (props: any) => {
    if (props.active && props.payload) {
      return <CustomTooltip payload={props.payload} />;
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart
        data={chartData}
        margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
      >
        <Line
          type="monotone"
          dataKey="y"
          stroke="#165DFF"
          strokeWidth={2}
          dot={false}
          strokeDasharray="5 5"
        />
        <Tooltip content={renderTooltip} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function SimpleInterval(props: { chartData: any[] }) {
  const { chartData } = props;

  const renderTooltip = (props: any) => {
    if (props.active && props.payload) {
      return <CustomTooltip payload={props.payload} />;
    }
    return null;
  };

  // 为数据添加颜色
  const dataWithColors = chartData.map((item, index) => ({
    ...item,
    fill: index % 2 === 0 ? '#86DF6C' : '#468DFF',
  }));

  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart
        data={dataWithColors}
        margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
      >
        <Bar dataKey="y" />
        <Tooltip content={renderTooltip} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CardBlock(props: CardProps) {
  const { chartType, title, count, increment, diff, chartData, loading } =
    props;

  return (
    <Card className={styles.card}>
      <div className={styles.statistic}>
        <Statistic
          title={
            <Title heading={6} className={styles.title}>
              {title}
            </Title>
          }
          loading={loading}
          value={count}
          extra={
            <div className={styles['compare-yesterday']}>
              {loading ? (
                <Skeleton
                  text={{ rows: 1 }}
                  style={{ width: '100px' }}
                  animation
                />
              ) : (
                <span
                  className={cs(styles['diff'], {
                    [styles['diff-increment']]: increment,
                  })}
                >
                  {diff}
                  {increment ? <IconArrowRise /> : <IconArrowFall />}
                </span>
              )}
            </div>
          }
          groupSeparator
        />
      </div>
      <div className={styles.chart}>
        <Spin style={{ width: '100%' }} loading={loading}>
          {chartType === 'interval' && <SimpleInterval chartData={chartData} />}
          {chartType === 'line' && <SimpleLine chartData={chartData} />}
        </Spin>
      </div>
    </Card>
  );
}

const cardInfo = [
  {
    key: 'userRetentionTrend',
    type: 'line',
  },
  {
    key: 'userRetention',
    type: 'interval',
  },
  {
    key: 'contentConsumptionTrend',
    type: 'line',
  },
  {
    key: 'contentConsumption',
    type: 'interval',
  },
];

function getCardTitle(key: string): string {
  const titleMap = {
    userRetentionTrend: '用户留存趋势',
    userRetention: '用户留存',
    contentConsumptionTrend: '内容消费趋势',
    contentConsumption: '内容消费',
  };
  return titleMap[key] || key;
}
function CardList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    cardInfo.map((item) => ({
      ...item,
      chartType: item.type,
    })),
  );

  const getData = async () => {
    if (typeof window === 'undefined') return;

    setLoading(true);
    try {
      const requestList = cardInfo.map(async (info) => {
        try {
          const { data } = await axios.get(
            `/api/multi-dimension/card?type=${info.type}`,
          );
          return {
            ...data,
            key: info.key,
            chartType: info.type,
          };
        } catch (error) {
          console.error(`Failed to fetch card data for ${info.type}:`, error);
          return {
            key: info.key,
            chartType: info.type,
            count: 0,
            increment: false,
            diff: 0,
            chartData: [],
          };
        }
      });
      const result = await Promise.all(requestList);
      setData(result);
    } catch (error) {
      console.error('Failed to fetch card list data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getData();
    }
  }, []);

  const formatData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      title: getCardTitle(item.key),
    }));
  }, [data]);

  return (
    <Row gutter={16}>
      {formatData.map((item, index) => (
        <Col span={6} key={index}>
          <CardBlock {...item} loading={loading} />
        </Col>
      ))}
    </Row>
  );
}

export default CardList;
