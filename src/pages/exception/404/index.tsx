import React from 'react';
import { Result, Button } from '@arco-design/web-react';
import styles from './style/index.module.less';

function Exception404() {
  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.result}
        status="404"
        subTitle="抱歉，您访问的页面不存在"
        extra={[
          <Button key="again" style={{ marginRight: 16 }}>
            重试
          </Button>,
          <Button key="back" type="primary">
            返回首页
          </Button>,
        ]}
      />
    </div>
  );
}

export default Exception404;
