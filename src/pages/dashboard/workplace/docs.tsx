import React from 'react';
import { Link, Card, Typography } from '@arco-design/web-react';
import styles from './style/docs.module.less';

const links = {
  react: 'https://arco.design/react/docs/start',
  vue: 'https://arco.design/vue/docs/start',
  designLab: 'https://arco.design/themes',
  materialMarket: 'https://arco.design/material/',
};
function QuickOperation() {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title heading={6}>快速开始</Typography.Title>
        <Link>查看更多</Link>
      </div>
      <div className={styles.docs}>
        {Object.entries(links).map(([key, value]) => (
          <Link className={styles.link} key={key} href={value} target="_blank">
            {key === 'react'
              ? 'React 组件'
              : key === 'vue'
                ? 'Vue 组件'
                : key === 'designLab'
                  ? '设计实验室'
                  : key === 'materialMarket'
                    ? '物料市场'
                    : key}
          </Link>
        ))}
      </div>
    </Card>
  );
}

export default QuickOperation;
