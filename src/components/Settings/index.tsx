import React, { useState } from 'react';
import { Drawer, Alert, Message } from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';
import copy from 'copy-to-clipboard';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../store';
import Block from './block';
import ColorPanel from './color';
import IconButton from '../NavBar/IconButton';

interface SettingProps {
  trigger?: React.ReactElement;
}

function Setting(props: SettingProps) {
  const { trigger } = props;
  const [visible, setVisible] = useState(false);
  const settings = useSelector((state: GlobalState) => state.settings);

  function onCopySettings() {
    copy(JSON.stringify(settings, null, 2));
    Message.success('复制成功，请贴到 src/settings.json 中');
  }

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger as React.ReactElement<any>, {
          onClick: () => setVisible(true),
        })
      ) : (
        <IconButton icon={<IconSettings />} onClick={() => setVisible(true)} />
      )}
      <Drawer
        width={300}
        title={
          <>
            <IconSettings />
            页面配置
          </>
        }
        visible={visible}
        okText="复制配置"
        cancelText="关闭"
        onOk={onCopySettings}
        onCancel={() => setVisible(false)}
      >
        <Block title="主题颜色">
          <ColorPanel />
        </Block>
        <Block
          title="内容区域"
          options={[
            { name: '导航栏', value: 'navbar' },
            { name: '菜单栏', value: 'menu' },
            { name: '底部', value: 'footer' },
            { name: '菜单宽度', value: 'menuWidth', type: 'number' },
          ]}
        />
        <Block
          title="其他设置"
          options={[{ name: '色弱模式', value: 'colorWeek' }]}
        />
        <Alert content="配置之后仅对当前页面生效，要想在整个项目中生效，请点击上方按钮复制配置到 src/settings.json 中" />
      </Drawer>
    </>
  );
}

export default Setting;
