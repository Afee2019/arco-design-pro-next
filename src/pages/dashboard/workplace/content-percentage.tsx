import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from '@arco-design/web-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import axios from 'axios';

function PopularContent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios
      .get('/api/workplace/content-percentage')
      .then((res) => {
        // 确保返回的是数组
        const responseData = res.data?.data || res.data || [];
        setData(Array.isArray(responseData) ? responseData : []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <Typography.Title heading={6}>内容分布</Typography.Title>
      <Spin loading={loading} style={{ display: 'block' }}>
        <div style={{ position: 'relative' }}>
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={110}
                outerRadius={140}
                paddingAngle={5}
                dataKey="count"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {Array.isArray(data) &&
                  data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#21CCFF', '#313CA9', '#249EFF'][index % 3]}
                    />
                  ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  Number(value).toLocaleString(),
                  props.payload.type,
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry: any) => entry.payload.type}
              />
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '14px', color: '#86909C', lineHeight: 2 }}>
              内容量
            </div>
            <div style={{ fontSize: '16px', color: '#1D2129' }}>
              {Array.isArray(data) && data.length > 0
                ? Number(data.reduce((a, b) => a + b.count, 0)).toLocaleString()
                : '0'}
            </div>
          </div>
        </div>
      </Spin>
    </Card>
  );
}

export default PopularContent;
