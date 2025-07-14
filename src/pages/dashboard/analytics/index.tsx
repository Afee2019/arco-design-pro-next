import React from 'react';
import { Typography, Card, Grid } from '@arco-design/web-react';

const { Row, Col } = Grid;
const { Title } = Typography;

function Analytics() {
  return (
    <div>
      <Title heading={6}>数据分析</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户统计">
            <p>用户相关数据统计...</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="销售统计">
            <p>销售相关数据统计...</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="流量统计">
            <p>流量相关数据统计...</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Analytics;
