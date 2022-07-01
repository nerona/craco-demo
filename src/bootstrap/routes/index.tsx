import { HomeOutlined } from '@ant-design/icons';
import { App } from '~pages/App';
import { NotFound } from '~pages/NotFound/NotFound';
import { Dashboard } from '~pages/Dashboard/Dashboard';
import { IRoute, buildMenuTree } from './lib';

export const routes: IRoute[] = [
  {
    path: '/',
    navigatorName: '首页',
    component: <App />,
    childRoutes: [
      {
        index: true,
        component: <Dashboard />,
      },
      {
        path: 'home',
        navigatorName: '首页',
        navigatorIcon: <HomeOutlined />,
        component: <NotFound />,
      },
    ],
  },
];

export const routeMenus = buildMenuTree(routes[routes.length - 1].childRoutes || []);
