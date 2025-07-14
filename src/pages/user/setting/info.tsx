import React from 'react';
import {
  Input,
  Select,
  Cascader,
  Button,
  Form,
  Space,
  Message,
  Skeleton,
} from '@arco-design/web-react';

function InfoForm({ loading }: { loading?: boolean }) {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      await form.validate();
      Message.success('保存成功');
    } catch (_) {}
  };

  const handleReset = () => {
    form.resetFields();
  };

  const loadingNode = (rows = 1) => {
    return (
      <Skeleton
        text={{
          rows,
          width: new Array(rows).fill('100%'),
        }}
        animation
      />
    );
  };

  return (
    <Form
      style={{ width: '500px', marginTop: '6px' }}
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Form.Item
        label="邮箱地址"
        field="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: '请输入正确的邮箱地址',
          },
        ]}
      >
        {loading ? loadingNode() : <Input placeholder="请输入邮箱地址" />}
      </Form.Item>
      <Form.Item
        label="昵称"
        field="nickName"
        rules={[
          {
            required: true,
            message: '请输入昵称',
          },
        ]}
      >
        {loading ? loadingNode() : <Input placeholder="请输入昵称" />}
      </Form.Item>
      <Form.Item
        label="地区"
        field="rangeArea"
        rules={[{ required: true, message: '请选择地区' }]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Select options={['中国']} placeholder="请选择地区" />
        )}
      </Form.Item>
      <Form.Item
        label="所在城市"
        field="location"
        initialValue={['BeiJing', 'BeiJing', 'HaiDian']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Cascader
            options={[
              {
                label: '北京市',
                value: 'BeiJing',
                children: [
                  {
                    label: '北京市',
                    value: 'BeiJing',
                    children: [
                      { label: '海淀区', value: 'HaiDian' },
                      { label: '朝阳区', value: 'ChaoYang' },
                    ],
                  },
                ],
              },
              {
                label: '上海市',
                value: 'ShangHai',
                children: [
                  {
                    label: '上海市',
                    value: 'ShangHai',
                    children: [
                      { label: '黄浦区', value: 'HuangPu' },
                      { label: '静安区', value: 'JingAn' },
                    ],
                  },
                ],
              },
            ]}
          />
        )}
      </Form.Item>
      <Form.Item label="详细地址" field="address">
        {loading ? loadingNode() : <Input placeholder="请输入详细地址" />}
      </Form.Item>
      <Form.Item label="个人简介" field="profile">
        {loading ? (
          loadingNode(3)
        ) : (
          <Input.TextArea placeholder="请输入个人简介" />
        )}
      </Form.Item>

      <Form.Item label=" ">
        <Space>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default InfoForm;
