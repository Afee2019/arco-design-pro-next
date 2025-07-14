import Mock from 'mockjs';

// 工作台概览数据
Mock.mock('/api/workplace/overview-content', 'get', {
  'data|1': {
    allContents: '@integer(1000, 5000)',
    liveContents: '@integer(800, 4000)',
    increaseComments: '@integer(50, 200)',
    growthRate: '@float(0.1, 0.8, 1, 2)',
    popularAuthor: '@name',
    contentPublishNumber: '@integer(100, 500)',
  },
});

// 热门内容列表
Mock.mock(/\/api\/workplace\/popular-contents/, 'get', {
  'data|5-10': [
    {
      id: '@increment',
      key: '@increment',
      clickNumber: '@integer(1000, 9999)',
      title: '@ctitle(10, 20)',
      increases: '@integer(10, 100)',
      content: '@cparagraph(1, 3)',
      category:
        '@pick(["设计资源", "技术文档", "产品介绍", "用户指南", "最佳实践"])',
      status: '@pick([0, 1, 2])', // 0: 已发布, 1: 审核中, 2: 已下线
      filterType: '@pick([0, 1, 2, 3])',
      createdTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    },
  ],
  total: '@integer(50, 100)',
});

// 内容占比数据
Mock.mock('/api/workplace/content-percentage', 'get', {
  'data|5': [
    {
      type: '@pick(["文本内容", "图片内容", "视频内容", "音频内容", "文档内容"])',
      value: '@integer(10, 40)',
      count: '@integer(100, 1000)',
    },
  ],
});

// 公告数据
Mock.mock('/api/workplace/announcement', 'get', {
  'data|5-8': [
    {
      id: '@increment',
      title: '@ctitle(10, 30)',
      content: '@cparagraph(2, 5)',
      type: '@pick(["activity", "info", "notice"])',
      date: '@date("yyyy-MM-dd")',
      read: '@boolean',
    },
  ],
});

// 用户信息API已在 user.ts 中定义，这里删除重复定义
