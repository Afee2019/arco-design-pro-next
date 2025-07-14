import React from 'react';
import { Result, Button } from '@arco-design/web-react';
import styles from './style/index.module.less';

function Exception403() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="403"
          subTitle="抱歉，您无权访问该页面"
          extra={
            <Button key="back" type="primary">
              返回首页
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default Exception403;
