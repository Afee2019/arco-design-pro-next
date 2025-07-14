import React, { useState, useEffect, useMemo } from 'react';
import PublicOpinionCard, {
  PublicOpinionCardProps,
} from '@/components/DataAnalysis/PublicOpinionCard';
import axios from 'axios';
import { Grid } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from '../locale';

const { Row, Col } = Grid;

const cardInfo = [
  {
    key: 'visitor',
    type: 'line',
  },
  {
    key: 'content',
    type: 'interval',
  },
  {
    key: 'comment',
    type: 'line',
  },
  {
    key: 'share',
    type: 'pie',
  },
];

function PublicOpinion() {
  const t = useLocale(locale);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PublicOpinionCardProps[]>(
    cardInfo.map((item) => ({
      ...item,
      chartType: item.type as 'line' | 'pie' | 'interval',
      title: t[`dataAnalysis.publicOpinion.${item.key}`] || item.key,
    })),
  );

  const getData = async () => {
    if (typeof window === 'undefined') return;

    try {
      const requestList = cardInfo.map(async (info) => {
        try {
          const { data } = await axios.get(
            `/api/data-analysis/overview?type=${info.type}`,
          );
          return {
            ...data,
            key: info.key,
            chartType: info.type,
          };
        } catch (error) {
          console.error(`Failed to fetch data for ${info.type}:`, error);
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
      console.error('Failed to fetch public opinion data:', error);
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
      title: t[`dataAnalysis.publicOpinion.${item.key}`] || item.key,
    }));
  }, [t, data]);

  return (
    <div>
      <Row gutter={20}>
        {formatData.map((item, index) => (
          <Col span={6} key={index}>
            <PublicOpinionCard
              {...item}
              compareTime={t['dataAnalysis.yesterday'] || '昨日'}
              loading={loading}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PublicOpinion;
