import auth, { AuthParams } from '@/utils/authentication';
import { useEffect, useMemo, useState } from 'react';

export type IRoute = AuthParams & {
  name: string;
  key: string;
  // 当前页是否展示面包屑
  breadcrumb?: boolean;
  children?: IRoute[];
  // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
  ignore?: boolean;
};

export const routes: IRoute[] = [
  {
    name: '仪表板',
    key: 'dashboard',
    children: [
      {
        name: '工作台',
        key: 'dashboard/workplace',
      },
      {
        name: '监控页',
        key: 'dashboard/monitor',
        requiredPermissions: [
          { resource: 'menu.dashboard.monitor', actions: ['write'] },
        ],
      },
      {
        name: '分析页',
        key: 'dashboard/analytics',
      },
    ],
  },
  {
    name: '数据可视化',
    key: 'visualization',
    children: [
      {
        name: '数据分析',
        key: 'visualization/data-analysis',
        requiredPermissions: [
          { resource: 'menu.visualization.dataAnalysis', actions: ['read'] },
        ],
      },
      {
        name: '多维数据分析',
        key: 'visualization/multi-dimension-data-analysis',
        requiredPermissions: [
          {
            resource: 'menu.visualization.dataAnalysis',
            actions: ['read', 'write'],
          },
          {
            resource: 'menu.visualization.multiDimensionDataAnalysis',
            actions: ['write'],
          },
        ],
        oneOfPerm: true,
      },
    ],
  },
  {
    name: '列表页',
    key: 'list',
    children: [
      {
        name: '查询表格',
        key: 'list/search-table',
      },
      {
        name: '卡片列表',
        key: 'list/card',
      },
    ],
  },
  {
    name: '表单页',
    key: 'form',
    children: [
      {
        name: '分组表单',
        key: 'form/group',
        requiredPermissions: [
          { resource: 'menu.form.group', actions: ['read', 'write'] },
        ],
      },
      {
        name: '分步表单',
        key: 'form/step',
        requiredPermissions: [
          { resource: 'menu.form.step', actions: ['read'] },
        ],
      },
    ],
  },
  {
    name: '详情页',
    key: 'profile',
    children: [
      {
        name: '基础详情',
        key: 'profile/basic',
      },
    ],
  },

  {
    name: '结果页',
    key: 'result',
    children: [
      {
        name: '成功页',
        key: 'result/success',
        breadcrumb: false,
      },
      {
        name: '失败页',
        key: 'result/error',
        breadcrumb: false,
      },
    ],
  },
  {
    name: '异常页',
    key: 'exception',
    children: [
      {
        name: '403',
        key: 'exception/403',
      },
      {
        name: '404',
        key: 'exception/404',
      },
      {
        name: '500',
        key: 'exception/500',
      },
    ],
  },
  {
    name: '用户中心',
    key: 'user',
    children: [
      {
        name: '用户信息',
        key: 'user/info',
      },
      {
        name: '用户设置',
        key: 'user/setting',
      },
    ],
  },
];

export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

export const generatePermission = (role: string) => {
  const actions = role === 'admin' ? ['*'] : ['read'];
  const result = {};
  routes.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        result[child.name] = actions;
      });
    }
  });
  return result;
};

const useRoute = (userPermission): [IRoute[], string] => {
  const filterRoute = (routes: IRoute[], arr = []): IRoute[] => {
    if (!routes.length) {
      return [];
    }
    for (const route of routes) {
      const { requiredPermissions, oneOfPerm } = route;
      let visible = true;
      if (requiredPermissions) {
        visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
      }

      if (!visible) {
        continue;
      }
      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        filterRoute(route.children, newRoute.children);
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }

    return arr;
  };

  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    const newRoutes = filterRoute(routes);
    setPermissionRoute(newRoutes);
  }, [JSON.stringify(userPermission)]);

  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

export default useRoute;
