import Mock from 'mockjs';
import { isSSR } from '@/utils/is';

// 直接导入 mock 文件
import './user';
import './message-box';
import './workplace';

// 确保在客户端环境下才初始化 Mock
if (!isSSR && typeof window !== 'undefined') {
  Mock.setup({
    timeout: '500-1500',
  });
}
