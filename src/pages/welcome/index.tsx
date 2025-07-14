import React from 'react';
import { Alert, Card, Link, Typography, Tag } from '@arco-design/web-react';
import { IconDoubleRight } from '@arco-design/web-react/icon';
import { useSelector } from 'react-redux';
import CodeBlock from './code-block';
import styles from './style/index.module.less';

export default function Welcome() {
  const userInfo = useSelector((state: any) => state.userInfo) || {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          欢迎使用 Arco Design Pro
        </Typography.Title>
        <Typography.Text type="secondary">
          {userInfo.name}, {userInfo.email}
        </Typography.Text>
      </div>
      <div>
        <Alert
          type="success"
          content="欢迎使用 Arco Design Pro，快速开始您的开发之旅吧！"
        />
        <Card style={{ marginTop: 20 }} title="使用指南">
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            1. 选择模板
          </Typography.Title>
          <Typography.Text>
            您可以从以下页面模板中选择适合的开始您的项目
            <Tag style={{ marginLeft: 8 }}>
              @arco-design/pro-pages-workplace
            </Tag>
          </Typography.Text>

          <Typography.Title heading={6}>2. 安装使用</Typography.Title>
          <Typography.Text>使用以下命令安装页面模板：</Typography.Text>
          <CodeBlock code="arco block use @arco-design/pro-pages-workplace" />

          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            3. 完成配置
          </Typography.Title>
          <Typography.Text>
            安装完成后，您可以在项目中看到新的页面模板并开始使用。
          </Typography.Text>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <Typography.Text>
            您可以从以下链接获取更多的页面模板和组件资源：
          </Typography.Text>
          <div style={{ marginTop: 8 }}>
            <Link
              target="_blank"
              href="https://arco.design/material?category=arco-design-pro"
            >
              Arco Pro 物料市场 <IconDoubleRight />
            </Link>
          </div>
          <div style={{ marginTop: 8 }}>
            <Link target="_blank" href="https://arco.design/material">
              Arco 物料市场 <IconDoubleRight />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
