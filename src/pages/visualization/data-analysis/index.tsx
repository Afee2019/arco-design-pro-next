import React, { useEffect, useMemo, useState } from 'react';
import { Card, Grid, Table, Space, Typography } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import axios from 'axios';
import PublicOpinion from './public-opinion';
import MultiInterval from '@/components/Chart/multi-stack-interval';
import PeriodLine from '@/components/Chart/period-legend-line';

const { Row, Col } = Grid;

function DataAnalysis() {
  const t = useLocale();
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  // 条件导入mock
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      import('./mock');
    }
  }, []);

  const getChartData = async () => {
    if (typeof window === 'undefined') return;

    setLoading(true);
    try {
      const { data } = await axios.get('/api/data-analysis/content-publishing');
      setChartData(data || []);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const getTableData = async () => {
    if (typeof window === 'undefined') return;

    setTableLoading(true);
    try {
      const { data } = await axios.get('/api/data-analysis/author-list');
      setTableData(data?.list || []);
    } catch (error) {
      console.error('Failed to fetch table data:', error);
      setTableData([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getChartData();
      getTableData();
    }
  }, []);

  const columns = useMemo(() => {
    return [
      {
        title: t['dataAnalysis.authorTable.rank'],
        dataIndex: 'id',
      },
      {
        title: t['dataAnalysis.authorTable.author'],
        dataIndex: 'author',
      },
      {
        title: t['dataAnalysis.authorTable.content'],
        dataIndex: 'contentCount',
        sorter: (a, b) => a.contentCount - b.contentCount,
        render(x) {
          return Number(x).toLocaleString();
        },
      },
      {
        title: t['dataAnalysis.authorTable.click'],
        dataIndex: 'clickCount',
        sorter: (a, b) => a.clickCount - b.clickCount,
        render(x) {
          return Number(x).toLocaleString();
        },
      },
    ];
  }, [t]);

  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Card>
        <Typography.Title heading={6}>
          {t['dataAnalysis.title.publicOpinion']}
        </Typography.Title>
        <PublicOpinion />
      </Card>
      <Row gutter={16}>
        <Col span={14}>
          <Card>
            <Typography.Title heading={6}>
              {t['dataAnalysis.title.publishingRate']}
            </Typography.Title>
            <MultiInterval data={chartData} loading={loading} />
          </Card>
        </Col>
        <Col span={10}>
          <Card>
            <Typography.Title heading={6}>
              {t['dataAnalysis.title.authorsList']}
            </Typography.Title>
            <div style={{ height: '370px' }}>
              <Table
                rowKey="id"
                loading={tableLoading}
                pagination={false}
                data={tableData}
                columns={columns}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
            <Typography.Title heading={6}>
              {t['dataAnalysis.title.publishingTiming']}
            </Typography.Title>
            <PeriodLine data={chartData} loading={loading} />
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
export default DataAnalysis;
