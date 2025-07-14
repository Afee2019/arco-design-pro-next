import React, { useState, useRef } from 'react';
import {
  Typography,
  Card,
  Form,
  Select,
  Input,
  Grid,
  Space,
  Button,
  Message,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import axios from 'axios';
import styles from './style/index.module.less';
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  import('./mock');
}

function GroupForm() {
  const formRef = useRef<FormInstance>(null);
  const [loading, setLoading] = useState(false);

  function submit(data) {
    setLoading(true);
    axios
      .post('/api/groupForm', {
        data,
      })
      .then(() => {
        Message.success('提交成功');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSubmit() {
    formRef.current.validate().then((values) => {
      submit(values);
    });
  }

  function handleReset() {
    formRef.current.resetFields();
  }

  return (
    <div className={styles.container}>
      <Form layout="vertical" ref={formRef} className={styles['form-group']}>
        <Card>
          <Typography.Title heading={6}>视频设置</Typography.Title>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label="视频模式"
                field="video.mode"
                initialValue={'custom'}
              >
                <Select placeholder="请选择视频模式">
                  <Select.Option value="custom">自定义</Select.Option>
                  <Select.Option value="mode1">模式1</Select.Option>
                  <Select.Option value="mode2">模式2</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item
                label="采集分辨率"
                field="video.acquisition.resolution"
              >
                <Select placeholder="请选择采集分辨率">
                  <Select.Option value="resolution1">分辨率1</Select.Option>
                  <Select.Option value="resolution2">分辨率2</Select.Option>
                  <Select.Option value="resolution3">分辨率3</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="采集帧率" field="video.acquisition.frameRate">
                <Input placeholder="请输入采集帧率" addAfter="fps" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item label="编码分辨率" field="video.encoding.resolution">
                <Select placeholder="请选择编码分辨率">
                  <Select.Option value="resolution1">分辨率1</Select.Option>
                  <Select.Option value="resolution2">分辨率2</Select.Option>
                  <Select.Option value="resolution3">分辨率3</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="最小码率" field="video.encoding.rate.min">
                <Input placeholder="请输入最小码率" addAfter="bps" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="最大码率" field="video.encoding.rate.max">
                <Input placeholder="请输入最大码率" addAfter="bps" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item label="默认码率" field="video.encoding.rate.default">
                <Input placeholder="请输入默认码率" addAfter="bps" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="编码帧率" field="video.encoding.frameRate">
                <Input placeholder="请输入编码帧率" addAfter="fps" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="编码配置" field="video.encoding.profile">
                <Input placeholder="请输入编码配置" addAfter="bps" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Card>
        <Card>
          <Typography.Title heading={6}>音频设置</Typography.Title>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item
                label="音频模式"
                initialValue={'custom'}
                field="audio.mode"
              >
                <Select placeholder="请选择音频模式">
                  <Select.Option value="custom">自定义</Select.Option>
                  <Select.Option value="mode1">模式1</Select.Option>
                  <Select.Option value="mode2">模式2</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="采集声道" field="audio.acquisition.channels">
                <Select placeholder="请选择采集声道">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="编码码率" field="audio.encoding.rate">
                <Input placeholder="请输入编码码率" addAfter="bps" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={8}>
              <Form.Item label="编码配置" field="audio.encoding.profile">
                <Input placeholder="请输入编码配置" addAfter="fps" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Card>
        <Card style={{ marginBottom: '40px' }}>
          <Typography.Title heading={6}>说明信息</Typography.Title>
          <Form.Item label="说明" field="audio.explanation">
            <Input.TextArea placeholder="请输入说明信息" />
          </Form.Item>
        </Card>
      </Form>
      <div className={styles.actions}>
        <Space>
          <Button onClick={handleReset} size="large">
            重置
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            size="large"
          >
            提交
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default GroupForm;
