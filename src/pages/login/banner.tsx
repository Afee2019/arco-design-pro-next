import React from 'react';
import { Carousel } from '@arco-design/web-react';
import styles from './style/index.module.less';

export default function LoginBanner() {
  const data = [
    {
      slogan: 'Arco Design Pro',
      subSlogan: '开箱即用的中后台管理系统',
      image:
        'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png',
    },
    {
      slogan: '内容管理系统',
      subSlogan: '丰富的页面模板，开箱即用',
      image:
        'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png',
    },
    {
      slogan: '品质保证',
      subSlogan: '严格的代码审查和测试',
      image:
        'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png',
    },
  ];
  return (
    <Carousel className={styles.carousel} animation="fade">
      {data.map((item, index) => (
        <div key={`${index}`}>
          <div className={styles['carousel-item']}>
            <div className={styles['carousel-title']}>{item.slogan}</div>
            <div className={styles['carousel-sub-title']}>{item.subSlogan}</div>
            <img
              alt="banner-image"
              className={styles['carousel-image']}
              src={item.image}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
