import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Tabs } from '@arco-design/web-react';
import InfoHeader from './header';
import InfoForm from './info';
import Security from './security';
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  import('./mock');
}
import Verified from './verified';

function UserInfo() {
  const userInfo = useSelector((state: any) => state.userInfo);
  const loading = useSelector((state: any) => state.userLoading);
  const [activeTab, setActiveTab] = useState('basic');
  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={userInfo} loading={loading} />
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane key="basic" title="基本信息">
            <InfoForm loading={loading} />
          </Tabs.TabPane>
          <Tabs.TabPane key="security" title="安全设置">
            <Security />
          </Tabs.TabPane>
          <Tabs.TabPane key="verified" title="企业认证">
            <Verified />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default UserInfo;
