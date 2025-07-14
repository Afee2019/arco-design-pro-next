import React from 'react';
import { Typography, Result, Button, Steps } from '@arco-design/web-react';
import styles from './style/index.module.less';

const Step = Steps.Step;

function Success() {
  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="success"
          title="提交成功"
          subTitle="你的任务已经提交成功"
          extra={[
            <Button key="again" type="secondary" style={{ marginRight: 16 }}>
              打印结果
            </Button>,
            <Button key="back" type="primary">
              项目列表
            </Button>,
          ]}
        />
        <div className={styles['steps-wrapper']}>
          <Typography.Paragraph bold>进度情况</Typography.Paragraph>
          <Steps type="dot" current={2}>
            <Step title="提交申请" description="2020/10/10 14:00:39" />
            <Step title="领导审批" description="处理中" />
            <Step title="购买证书" description="等待中" />
            <Step title="安全测试" description="等待中" />
            <Step title="上线发布" description="等待中" />
          </Steps>
        </div>
      </div>
    </div>
  );
}

export default Success;
