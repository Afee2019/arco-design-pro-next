import React, { useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  InputTag,
  Button,
  Typography,
  Space,
  Card,
  Switch,
  Result,
} from '@arco-design/web-react';
import styles from './style/index.module.less';

const { Title, Paragraph } = Typography;
function StepForm() {
  const [current, setCurrent] = useState(1);

  const [form] = Form.useForm();

  const viewForm = () => {
    const values = form.getFields();
    form.setFields(values);
    setCurrent(1);
  };

  const reCreateForm = () => {
    form.resetFields();
    setCurrent(1);
  };

  const toNext = async () => {
    try {
      await form.validate();
      setCurrent(current + 1);
    } catch (_) {}
  };
  return (
    <div className={styles.container}>
      <Card>
        <Title heading={5}>基本信息</Title>
        <div className={styles.wrapper}>
          <Steps current={current} lineless>
            <Steps.Step title="基本信息" description="基本信息" />
            <Steps.Step title="渠道信息" description="渠道信息" />
            <Steps.Step title="完成" description="完成" />
          </Steps>
          <Form form={form} className={styles.form}>
            {current === 1 && (
              <Form.Item noStyle>
                <Form.Item
                  label="名称"
                  required
                  field="basic.name"
                  rules={[
                    {
                      required: true,
                      message: '请输入名称',
                    },
                    {
                      validator: (value: string, callback) => {
                        if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/g.test(value)) {
                          callback('请输入正确的名称格式');
                        }
                      },
                    },
                  ]}
                >
                  <Input placeholder="请输入名称" />
                </Form.Item>
                <Form.Item
                  label="渠道类型"
                  required
                  initialValue="app"
                  field="basic.channelType"
                  rules={[
                    {
                      required: true,
                      message: '请选择渠道类型',
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="app">APP通用渠道</Select.Option>
                    <Select.Option value="site">网页通用渠道</Select.Option>
                    <Select.Option value="game">游戏通用渠道</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="有效时间"
                  required
                  field="basic.time"
                  rules={[
                    {
                      required: true,
                      message: '请选择有效时间',
                    },
                  ]}
                >
                  <DatePicker.RangePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label="链接"
                  required
                  extra="请输入完整的链接地址"
                  field="basic.link"
                  initialValue={'https://arco.design'}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="请输入链接地址" />
                </Form.Item>
              </Form.Item>
            )}
            {current === 2 && (
              <Form.Item noStyle>
                <Form.Item
                  label="渠道来源"
                  required
                  field="channel.source"
                  rules={[
                    {
                      required: true,
                      message: '请输入渠道来源',
                    },
                  ]}
                >
                  <Input placeholder="请输入渠道来源" />
                </Form.Item>
                <Form.Item
                  label="媒体来源"
                  required
                  field="channel.media"
                  rules={[
                    {
                      required: true,
                      message: '请输入媒体来源',
                    },
                  ]}
                >
                  <Input placeholder="请输入媒体来源" />
                </Form.Item>
                <Form.Item
                  label="关键词"
                  required
                  field="channel.keywords"
                  initialValue={['今日头条', '火山']}
                  rules={[{ required: true }]}
                >
                  <InputTag />
                </Form.Item>
                <Form.Item
                  label="提醒设置"
                  required
                  initialValue={true}
                  field="channel.remind"
                  triggerPropName="checked"
                  rules={[{ required: true }]}
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label="内容说明"
                  required
                  field="channel.content"
                  rules={[
                    {
                      required: true,
                      message: '请输入内容说明',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="请输入内容说明" />
                </Form.Item>
              </Form.Item>
            )}
            {current !== 3 ? (
              <Form.Item label=" ">
                <Space>
                  {current === 2 && (
                    <Button
                      size="large"
                      onClick={() => setCurrent(current - 1)}
                    >
                      上一步
                    </Button>
                  )}
                  {current !== 3 && (
                    <Button type="primary" size="large" onClick={toNext}>
                      下一步
                    </Button>
                  )}
                </Space>
              </Form.Item>
            ) : (
              <Form.Item noStyle>
                <Result
                  status="success"
                  title="创建成功"
                  subTitle="您的渠道已经创建成功"
                  extra={[
                    <Button
                      key="reset"
                      style={{ marginRight: 16 }}
                      onClick={viewForm}
                    >
                      查看表单
                    </Button>,
                    <Button key="again" type="primary" onClick={reCreateForm}>
                      再次创建
                    </Button>,
                  ]}
                />
              </Form.Item>
            )}
          </Form>
        </div>
        {current === 3 && (
          <div className={styles['form-extra']}>
            <Title heading={6}>更多信息</Title>
            <Paragraph type="secondary">
              您可以在这里查看更多相关信息。
              <Button type="text">查看详情</Button>
            </Paragraph>
          </div>
        )}
      </Card>
    </div>
  );
}

export default StepForm;
