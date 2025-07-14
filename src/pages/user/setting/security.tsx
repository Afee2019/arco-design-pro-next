import React from 'react';
import { useSelector } from 'react-redux';
import cs from 'classnames';
import { Button } from '@arco-design/web-react';
import styles from './style/index.module.less';

function Security() {
  const userInfo = useSelector((state: any) => {
    return state.userInfo || {};
  });

  const data = [
    {
      title: '登录密码',
      value: '当前密码强度：强',
    },
    {
      title: '密保问题',
      value: '',
      placeholder: '请设置密保问题',
    },
    {
      title: '手机号码',
      value: userInfo.phoneNumber ? `已绑定手机： ${userInfo.phoneNumber}` : '',
    },
    {
      title: '邮箱地址',
      value: '',
      placeholder: '请设置邮箱地址',
    },
  ];

  return (
    <div className={styles['security']}>
      {data.map((item, index) => (
        <div className={styles['security-item']} key={index}>
          <span className={styles['security-item-title']}>{item.title}</span>
          <div className={styles['security-item-content']}>
            <span
              className={cs({
                [`${styles['security-item-placeholder']}`]: !item.value,
              })}
            >
              {item.value || item.placeholder}
            </span>

            <span>
              <Button type="text">{item.value ? '修改' : '设置'}</Button>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Security;
