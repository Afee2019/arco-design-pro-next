import { Table, Tag, Typography } from '@arco-design/web-react';
import React from 'react';
import styles from './style/index.module.less';

export default function QuickOperation() {
  const columns = [
    {
      title: '排序',
      render: (_col, _record, index) => <span>{index + 1}</span>,
    },
    {
      title: '封面',
      dataIndex: 'cover',
      render: (_col, record) => (
        <div className={styles['data-statistic-list-cover-wrapper']}>
          <img src={record.cover} />
          {record.status === -1 && (
            <Tag
              color="red"
              className={styles['data-statistic-list-cover-tag']}
            >
              审核失败
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      dataIndex: 'duration',
      title: '时长',
    },
    {
      dataIndex: 'id',
      title: 'ID',
    },
  ];
  const data = [
    {
      cover:
        'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp',
      name: '视频直播',
      duration: '00:05:19',
      id: '54e23ade',
      status: -1,
    },
  ];
  return (
    <div className={styles['']}>
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
        }}
        border={false}
        pagination={false}
      />
      <Typography.Text
        type="secondary"
        className={styles['data-statistic-list-tip']}
      >
        当前轮播
        {data.length}
        条视频
      </Typography.Text>
    </div>
  );
}
