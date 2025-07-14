import { Button, Card, Radio, Tabs } from '@arco-design/web-react';
import React from 'react';
import DataStatisticList from './data-statistic-list';
import styles from './style/index.module.less';

export default function DataStatistic() {
  return (
    <Card>
      <Tabs defaultActiveTab="liveMethod">
        <Tabs.TabPane key="liveMethod" title="直播方式" />
        <Tabs.TabPane key="onlineUsers" title="在线用户" />
      </Tabs>
      <div className={styles['data-statistic-content']}>
        <Radio.Group defaultValue="3" type="button">
          <Radio value="1">正常直播</Radio>
          <Radio value="2">流量控制</Radio>
          <Radio value="3">视频直播</Radio>
          <Radio value="4">网页直播</Radio>
        </Radio.Group>

        <div className={styles['data-statistic-list-wrapper']}>
          <div className={styles['data-statistic-list-header']}>
            <Button type="text">编辑轮播</Button>
            <Button disabled>开始轮播</Button>
          </div>
          <div className={styles['data-statistic-list-content']}>
            <DataStatisticList />
          </div>
        </div>
      </div>
    </Card>
  );
}
