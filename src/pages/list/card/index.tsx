import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, Card, Input, Typography, Grid } from '@arco-design/web-react';
import styles from './style/index.module.less';
import CardBlock from './card-block';
import AddCard from './card-add';
import { QualityInspection, BasicCard } from './interface';
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  import('./mock');
}

const { Title } = Typography;
const { Row, Col } = Grid;

const defaultList = new Array(10).fill({});
export default function ListCard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    quality: defaultList,
    service: defaultList,
    rules: defaultList,
  });

  const [activeKey, setActiveKey] = useState('all');

  const getData = () => {
    axios
      .get('/api/cardList')
      .then((res) => {
        setData(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);
  const getCardList = (
    list: Array<BasicCard & QualityInspection>,
    type: keyof typeof data,
  ) => {
    return (
      <Row gutter={24} className={styles['card-content']}>
        {type === 'quality' && (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
            <AddCard description="添加质量检查" />
          </Col>
        )}
        {list.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} key={index}>
            <CardBlock card={item} type={type} loading={loading} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Card>
      <Title heading={6}>卡片列表</Title>
      <Tabs
        activeTab={activeKey}
        type="rounded"
        onChange={setActiveKey}
        extra={
          <Input.Search
            style={{ width: '240px' }}
            placeholder={
              activeKey === 'all'
                ? '搜索全部'
                : activeKey === 'quality'
                  ? '搜索质量检查'
                  : activeKey === 'service'
                    ? '搜索服务'
                    : '搜索规则'
            }
          />
        }
      >
        <Tabs.TabPane key="all" title="全部" />
        <Tabs.TabPane key="quality" title="质量检查" />
        <Tabs.TabPane key="service" title="服务" />
        <Tabs.TabPane key="rules" title="规则" />
      </Tabs>
      <div className={styles.container}>
        {activeKey === 'all' ? (
          Object.entries(data).map(([key, list]) => (
            <div key={key}>
              <Title heading={6}>
                {key === 'quality'
                  ? '质量检查'
                  : key === 'service'
                    ? '服务'
                    : '规则'}
              </Title>
              {getCardList(list, key as keyof typeof data)}
            </div>
          ))
        ) : (
          <div className={styles['single-content']}>
            {getCardList(data[activeKey], activeKey as keyof typeof data)}
          </div>
        )}
      </div>
    </Card>
  );
}
