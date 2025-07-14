import React from 'react';
import { Typography, Result, Button, Link } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';

function Success() {
  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="error"
          title="提交失败"
          subTitle="请检查信息后重新提交"
          extra={[
            <Button key="again" type="secondary" style={{ marginRight: 16 }}>
              返回上一步
            </Button>,
            <Button key="back" type="primary">
              重新提交
            </Button>,
          ]}
        />
        <div className={styles['details-wrapper']}>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            错误详情
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            <ol>
              <li>
                您的账户已被冻结，请联系管理员
                <Link>
                  <IconLink />
                  立即解冻
                </Link>
              </li>
              <li>
                您的账户还未完成实名认证
                <Link>立即认证</Link>
              </li>
            </ol>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}

export default Success;
