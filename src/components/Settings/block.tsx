import React, { ReactNode } from 'react';
import { Switch, Divider, InputNumber } from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../store';
import styles from './style/block.module.less';

export interface BlockProps {
  title?: ReactNode;
  options?: { name: string; value: string; type?: 'switch' | 'number' }[];
  children?: ReactNode;
}

export default function Block(props: BlockProps) {
  const { title, options, children } = props;
  const settings = useSelector((state: GlobalState) => state.settings);
  const dispatch = useDispatch();

  return (
    <div className={styles.block}>
      <h5 className={styles.title}>{title}</h5>
      {options &&
        options.map((option) => {
          const type = option.type || 'switch';

          return (
            <div className={styles['switch-wrapper']} key={option.value}>
              <span>
                {option.name === 'settings.navbar'
                  ? '导航栏'
                  : option.name === 'settings.menu'
                    ? '菜单'
                    : option.name === 'settings.footer'
                      ? '底部'
                      : option.name === 'settings.themeColor'
                        ? '主题色'
                        : option.name === 'settings.colorWeek'
                          ? '色弱模式'
                          : option.name === 'settings.menuWidth'
                            ? '菜单宽度'
                            : option.name}
              </span>
              {type === 'switch' && (
                <Switch
                  size="small"
                  checked={!!settings[option.value]}
                  onChange={(checked) => {
                    const newSetting = {
                      ...settings,
                      [option.value]: checked,
                    };
                    dispatch({
                      type: 'update-settings',
                      payload: { settings: newSetting },
                    });
                    // set color week
                    if (checked && option.value === 'colorWeek') {
                      document.body.style.filter = 'invert(80%)';
                    }
                    if (!checked && option.value === 'colorWeek') {
                      document.body.style.filter = 'none';
                    }
                  }}
                />
              )}
              {type === 'number' && (
                <InputNumber
                  style={{ width: 80 }}
                  size="small"
                  value={settings.menuWidth}
                  onChange={(value) => {
                    const newSetting = {
                      ...settings,
                      [option.value]: value,
                    };
                    dispatch({
                      type: 'update-settings',
                      payload: { settings: newSetting },
                    });
                  }}
                />
              )}
            </div>
          );
        })}
      {children}
      <Divider />
    </div>
  );
}
