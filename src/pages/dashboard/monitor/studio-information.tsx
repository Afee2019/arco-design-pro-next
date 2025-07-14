import { Card, Typography, Form, Input, Button } from '@arco-design/web-react';
import React from 'react';

export default function StudioInformation() {
  return (
    <Card>
      <Typography.Title style={{ marginTop: 0, marginBottom: 16 }} heading={6}>
        工作台信息
      </Typography.Title>
      <Form layout="vertical">
        <Form.Item label="工作台标题" required>
          <Input placeholder="admin的工作台" />
        </Form.Item>
        <Form.Item label="上线通知" required>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="工作台分类" required>
          <Input.Search />
        </Form.Item>
        <Form.Item label="工作台分类" required>
          <Input.Search />
        </Form.Item>
      </Form>
      <Button type="primary">更新</Button>
    </Card>
  );
}
