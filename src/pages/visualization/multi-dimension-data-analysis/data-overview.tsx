// 数据总览
import React, { useEffect, useState, useMemo } from 'react';
import {
  Card,
  Typography,
  Grid,
  Statistic,
  Skeleton,
} from '@arco-design/web-react';
import axios from 'axios';
import {
  IconUser,
  IconEdit,
  IconHeart,
  IconThumbUp,
} from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import styles from './style/data-overview.module.less';
import MultiAreaLine from '@/components/Chart/multi-area-line';

const { Title } = Typography;
export default () => {
  const [isClient, setIsClient] = useState(false);
  const t = useLocale();
  const [overview, setOverview] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const getData = async () => {
    if (typeof window === 'undefined') return;

    setLoading(true);
    try {
      const { data } = await axios.get('/api/multi-dimension/overview');
      const { overviewData, chartData } = data || {};
      setLineData(chartData || []);
      setOverview(overviewData || []);
    } catch (error) {
      console.error('Failed to fetch overview data:', error);
      setLineData([]);
      setOverview([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getData();
    }
  }, []);

  const formatedData = useMemo(() => {
    return [
      {
        title:
          t['multiDAnalysis.dataOverview.contentProduction'] || '内容生产量',
        icon: <IconEdit />,
        value: overview[0],
        background: 'rgb(var(--orange-2))',
        color: 'rgb(var(--orange-6))',
      },
      {
        title: t['multiDAnalysis.dataOverview.contentClicks'] || '内容点击量',
        icon: <IconThumbUp />,
        value: overview[1],
        background: 'rgb(var(--cyan-2))',
        color: 'rgb(var(--cyan-6))',
      },
      {
        title: t['multiDAnalysis.dataOverview.contextExposure'] || '内容曝光量',
        value: overview[2],
        icon: <IconHeart />,
        background: 'rgb(var(--arcoblue-1))',
        color: 'rgb(var(--arcoblue-6))',
      },
      {
        title: t['multiDAnalysis.dataOverview.activeUsers'] || '活跃用户数',
        value: overview[3],
        icon: <IconUser />,
        background: 'rgb(var(--purple-1))',
        color: 'rgb(var(--purple-6))',
      },
    ];
  }, [t, overview]);

  return (
    <Grid.Row justify="space-between">
      {formatedData.map((item, index) => (
        <Grid.Col span={24 / formatedData.length} key={`${index}`}>
          <Card className={styles.card} title={null}>
            <Title heading={6}>{item.title}</Title>
            <div className={styles.content}>
              <div
                style={{ backgroundColor: item.background, color: item.color }}
                className={styles['content-icon']}
              >
                {item.icon}
              </div>
              {loading ? (
                <Skeleton
                  animation
                  text={{ rows: 1, className: styles['skeleton'] }}
                  style={{ width: '120px' }}
                />
              ) : (
                <Statistic value={item.value} groupSeparator />
              )}
            </div>
          </Card>
        </Grid.Col>
      ))}
      <Grid.Col span={24}>
        <MultiAreaLine data={lineData} loading={loading} />
      </Grid.Col>
    </Grid.Row>
  );
};
