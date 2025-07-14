import React, { useEffect, useState } from 'react';
import {
  Space,
  Select,
  Input,
  Button,
  Typography,
  Spin,
} from '@arco-design/web-react';
import { IconDownload, IconFaceSmileFill } from '@arco-design/web-react/icon';
import axios from 'axios';
import MessageList from './message-list';
import styles from './style/index.module.less';

export default function ChatPanel() {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchMessageList() {
    setLoading(true);
    axios
      .get('/api/chatList')
      .then((res) => {
        setMessageList(res.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchMessageList();
  }, []);

  return (
    <div className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <Typography.Title
          style={{ marginTop: 0, marginBottom: 16 }}
          heading={6}
        >
          聊天面板
        </Typography.Title>
        <Space size={8}>
          <Select style={{ width: 80 }} defaultValue="all">
            <Select.Option value="all">全部</Select.Option>
          </Select>
          <Input.Search placeholder="搜索分类" />
          <Button type="text" iconOnly>
            <IconDownload />
          </Button>
        </Space>
      </div>
      <div className={styles['chat-panel-content']}>
        <Spin loading={loading} style={{ width: '100%' }}>
          <MessageList data={messageList} />
        </Spin>
      </div>
      <div className={styles['chat-panel-footer']}>
        <Space size={8}>
          <Input suffix={<IconFaceSmileFill />} />
          <Button type="primary">发送</Button>
        </Space>
      </div>
    </div>
  );
}
