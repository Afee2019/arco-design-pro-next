import React, { useState, useEffect } from 'react';
import { Typography, Card, Grid, Space } from '@arco-design/web-react';
import axios from 'axios';
import useLocale from '@/utils/useLocale';
import HorizontalInterval from '@/components/Chart/horizontal-interval';
import AreaPolar from '@/components/Chart/area-polar';
import FactMultiPie from '@/components/Chart/fact-multi-pie';
import locale from './locale';
import DataOverview from './data-overview';
import CardList from '@/components/DataAnalysis/CardList';

const { Row, Col } = Grid;
const { Title } = Typography;

function DataAnalysis() {
  const [isClient, setIsClient] = useState(false);
  const t = useLocale(locale);
  const [loading, setLoading] = useState(false);
  const [interval, setInterval] = useState([]);
  const [polarLoading, setPolarLoading] = useState(false);
  const [polar, setPolar] = useState({ list: [], fields: [] });
  const [multiPieLoading, setMultiPieLoading] = useState(false);
  const [multiPie, setMultiPie] = useState([]);

  // 条件导入mock
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      import('./mock');
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getInterval();
      getPolar();
      getMultiPie();
    }
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const getInterval = async () => {
    if (typeof window === 'undefined') return;

    setLoading(true);
    try {
      const { data } = await axios.get('/api/multi-dimension/activity');
      setInterval(data || []);
    } catch (error) {
      console.error('Failed to fetch interval data:', error);
      setInterval([]);
    } finally {
      setLoading(false);
    }
  };

  const getPolar = async () => {
    if (typeof window === 'undefined') return;

    setPolarLoading(true);
    try {
      const { data } = await axios.get('/api/multi-dimension/polar');
      setPolar(data || { list: [], fields: [] });
    } catch (error) {
      console.error('Failed to fetch polar data:', error);
      setPolar({ list: [], fields: [] });
    } finally {
      setPolarLoading(false);
    }
  };

  const getMultiPie = async () => {
    if (typeof window === 'undefined') return;

    setMultiPieLoading(true);
    try {
      const { data } = await axios.get('/api/multi-dimension/content-source');
      setMultiPie(data || []);
    } catch (error) {
      console.error('Failed to fetch multi pie data:', error);
      setMultiPie([]);
    } finally {
      setMultiPieLoading(false);
    }
  };

  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row gutter={20}>
        <Col span={16}>
          <Card>
            <Title heading={6}>
              {t['multiDAnalysis.card.title.dataOverview'] || '数据总览'}
            </Title>
            <DataOverview />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Title heading={6}>
              {t['multiDAnalysis.card.title.todayActivity'] || '今日转赞评统计'}
            </Title>
            <HorizontalInterval
              data={interval}
              loading={loading}
              height={160}
            />
          </Card>
          <Card>
            <Title heading={6}>
              {t['multiDAnalysis.card.title.contentTheme'] || '内容题材分布'}
            </Title>
            <AreaPolar
              data={polar.list}
              fields={polar.fields}
              height={197}
              loading={polarLoading}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CardList />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
            <Title heading={6}>
              {t['multiDAnalysis.card.title.contentSource'] || '内容发布来源'}
            </Title>
            <FactMultiPie
              loading={multiPieLoading}
              data={multiPie}
              height={240}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
export default DataAnalysis;
