import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Card, Skeleton, Tag, Typography } from '@arco-design/web-react';
import styles from './style/announcement.module.less';

function Announcement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios
      .get('/api/workplace/announcement')
      .then((res) => {
        setData(res.data.data || []);
      })
      .catch((error) => {
        console.error('Failed to fetch announcement data:', error);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getTagColor(type) {
    switch (type) {
      case 'activity':
        return 'orangered';
      case 'info':
        return 'cyan';
      case 'notice':
        return 'arcoblue';
      default:
        return 'arcoblue';
    }
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title heading={6}>公告</Typography.Title>
        <Link>查看更多</Link>
      </div>
      <Skeleton loading={loading} text={{ rows: 5, width: '100%' }} animation>
        <div>
          {Array.isArray(data) &&
            data.map((d) => (
              <div key={d.id} className={styles.item}>
                <Tag color={getTagColor(d.type)} size="small">
                  {d.type === 'activity'
                    ? '活动'
                    : d.type === 'info'
                      ? '信息'
                      : d.type === 'notice'
                        ? '通知'
                        : d.type}
                </Tag>
                <span className={styles.link}>{d.content}</span>
              </div>
            ))}
        </div>
      </Skeleton>
    </Card>
  );
}

export default Announcement;
