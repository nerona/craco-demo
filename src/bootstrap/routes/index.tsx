import { App } from '~pages/App';

export type IRoute = {
  id?: string;
  path: string;
  component: React.ReactNode;
  navigatorName?: string;
  navigatorIcon?: React.ReactNode;
  childRoutes?: IRoute[];
  roleRequire?: any[];
};

export const routes: IRoute[] = [
  {
    path: '/',
    navigatorName: '首页',
    component: <App />,
    childRoutes: [],
  },
];
