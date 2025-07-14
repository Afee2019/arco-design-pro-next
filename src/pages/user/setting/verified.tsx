import React, { useEffect, useState } from 'react';
import {
  Descriptions,
  Table,
  Typography,
  Skeleton,
  Tag,
  Space,
  Button,
  Badge,
} from '@arco-design/web-react';
import axios from 'axios';
import styles from './style/index.module.less';

function Verified() {
  const [data, setData] = useState({
    accountType: '',
    isVerified: true,
    verifiedTime: '',
    legalPersonName: '',
    certificateType: '',
    certificationNumber: '',
    enterpriseName: '',
    enterpriseCertificateType: '',
    organizationCode: '',
  });

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  const getData = async () => {
    const { data } = await axios
      .get('/api/user/verified/enterprise')
      .finally(() => setLoading(false));
    setData(data);

    const { data: tableData } = await axios
      .get('/api/user/verified/authList')
      .finally(() => setTableLoading(false));
    setTableData(tableData);
  };

  useEffect(() => {
    getData();
  }, []);

  const loadingNode = <Skeleton text={{ rows: 1 }} />;

  return (
    <div className={styles.verified}>
      <Typography.Title heading={6}>企业认证</Typography.Title>
      <Descriptions
        className={styles['verified-enterprise']}
        labelStyle={{ textAlign: 'right' }}
        layout="inline-horizontal"
        colon="："
        column={3}
        data={Object.entries(data).map(([key, value]) => ({
          label:
            key === 'accountType'
              ? '账户类型'
              : key === 'isVerified'
                ? '认证状态'
                : key === 'verifiedTime'
                  ? '认证时间'
                  : key === 'legalPersonName'
                    ? '法人姓名'
                    : key === 'certificateType'
                      ? '证件类型'
                      : key === 'certificationNumber'
                        ? '证件号码'
                        : key === 'enterpriseName'
                          ? '企业名称'
                          : key === 'enterpriseCertificateType'
                            ? '企业证件类型'
                            : key === 'organizationCode'
                              ? '组织代码'
                              : key,
          value: loading ? (
            loadingNode
          ) : typeof value === 'boolean' ? (
            value ? (
              <Tag color="green">已认证</Tag>
            ) : (
              <Tag color="red">未认证</Tag>
            )
          ) : (
            value
          ),
        }))}
      />

      <Typography.Title heading={6}>认证记录</Typography.Title>
      <Table
        columns={[
          { title: '认证类型', dataIndex: 'authType' },
          {
            title: '认证内容',
            dataIndex: 'authContent',
          },
          {
            title: '认证状态',
            dataIndex: 'authStatus',
            render(x) {
              return x ? (
                <Badge status="success" text="认证成功"></Badge>
              ) : (
                <span>
                  <Badge status="processing" text="等待认证"></Badge>
                </span>
              );
            },
          },
          {
            title: '创建时间',
            dataIndex: 'createdTime',
          },
          {
            title: '操作',
            headerCellStyle: { paddingLeft: '15px' },
            render: (_, x) => {
              if (x.authStatus) {
                return <Button type="text">查看</Button>;
              }
              return (
                <Space>
                  <Button type="text">查看</Button>
                  <Button type="text">撤销</Button>
                </Space>
              );
            },
          },
        ]}
        data={tableData}
        loading={tableLoading}
      />
    </div>
  );
}

export default Verified;
