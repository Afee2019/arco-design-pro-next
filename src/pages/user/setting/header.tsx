import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Upload,
  Descriptions,
  Tag,
  Skeleton,
  Link,
} from '@arco-design/web-react';
import { IconCamera, IconPlus } from '@arco-design/web-react/icon';
import styles from './style/header.module.less';

export default function Info({
  userInfo = {},
  loading,
}: {
  userInfo: Record<string, any>;
  loading: boolean;
}) {
  const [avatar, setAvatar] = useState('');

  function onAvatarChange(_, file) {
    setAvatar(file.originFile ? URL.createObjectURL(file.originFile) : '');
  }

  useEffect(() => {
    setAvatar(userInfo.avatar);
  }, [userInfo]);

  const loadingImg = (
    <Skeleton
      text={{ rows: 0 }}
      style={{ width: '100px', height: '100px' }}
      animation
    />
  );

  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;
  return (
    <div className={styles['info-wrapper']}>
      <Upload showUploadList={false} onChange={onAvatarChange}>
        {loading ? (
          loadingImg
        ) : (
          <Avatar
            size={100}
            triggerIcon={<IconCamera />}
            className={styles['info-avatar']}
          >
            {avatar ? <img src={avatar} /> : <IconPlus />}
          </Avatar>
        )}
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={2}
        colon="："
        labelStyle={{ textAlign: 'right' }}
        data={[
          {
            label: '用户名',
            value: loading ? loadingNode : userInfo.name,
          },
          {
            label: '认证状态',
            value: loading ? (
              loadingNode
            ) : (
              <span>
                {userInfo.verified ? (
                  <Tag color="green" className={styles['verified-tag']}>
                    已认证
                  </Tag>
                ) : (
                  <Tag color="red" className={styles['verified-tag']}>
                    未认证
                  </Tag>
                )}
                <Link role="button" className={styles['edit-btn']}>
                  编辑
                </Link>
              </span>
            ),
          },
          {
            label: '账户ID',
            value: loading ? loadingNode : userInfo.accountId,
          },
          {
            label: '手机号码',
            value: loading ? (
              loadingNode
            ) : (
              <span>
                {userInfo.phoneNumber}
                <Link role="button" className={styles['edit-btn']}>
                  编辑
                </Link>
              </span>
            ),
          },
          {
            label: '注册时间',
            value: loading ? loadingNode : userInfo.registrationTime,
          },
        ]}
      ></Descriptions>
    </div>
  );
}
