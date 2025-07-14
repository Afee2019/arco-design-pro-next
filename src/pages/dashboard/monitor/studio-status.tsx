import React from 'react';
import {
  Card,
  Typography,
  Tag,
  Space,
  Descriptions,
} from '@arco-design/web-react';

export default function StudioStatus() {
  const dataStatus = [
    {
      label: (
        <span>
          <Typography.Text style={{ paddingRight: 8 }}>主流</Typography.Text>
          码率
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: '帧率',
      value: '60',
    },
    {
      label: (
        <span>
          <Typography.Text style={{ paddingRight: 8 }}>热备</Typography.Text>
          码率
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: '帧率',
      value: '60',
    },
    {
      label: (
        <span>
          <Typography.Text style={{ paddingRight: 8 }}>冷备</Typography.Text>
          码率
        </span>
      ),
      value: '6 Mbps',
    },
    {
      label: '帧率',
      value: '60',
    },
  ];
  const dataPicture = [
    {
      label: '线路',
      value: '热备',
    },
    {
      label: 'CDN',
      value: 'KS',
    },
    {
      label: '播放',
      value: 'FLV',
    },
    {
      label: '画质',
      value: '原画',
    },
  ];

  return (
    <Card>
      <Space align="start">
        <Typography.Title
          style={{ marginTop: 0, marginBottom: 16 }}
          heading={6}
        >
          工作台状态
        </Typography.Title>
        <Tag color="green">正常</Tag>
      </Space>
      <Descriptions
        colon=": "
        layout="horizontal"
        data={dataStatus}
        column={2}
      />
      <Typography.Title style={{ marginBottom: 16 }} heading={6}>
        画面信息
      </Typography.Title>
      <Descriptions
        colon=": "
        layout="horizontal"
        data={dataPicture}
        column={2}
      />
    </Card>
  );
}
