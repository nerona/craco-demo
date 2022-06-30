import { Route } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { App } from '~pages/App';
import { NotFound } from '~pages/NotFound/NotFound';

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
    childRoutes: [
      {
        path: 'home',
        navigatorName: '首页',
        navigatorIcon: <HomeOutlined />,
        component: <NotFound />,
      },
    ],
  },
];

export const renderRoute = (route: IRoute) =>
  route.childRoutes?.length ? (
    <Route key={route.path} path={route.path} element={route.component}>
      {route.childRoutes.map((childRoute: IRoute) =>
        childRoute.childRoutes?.length ? (
          renderRoute(childRoute)
        ) : (
          <Route key={childRoute.path} path={childRoute.path} element={childRoute.component} />
        )
      )}
    </Route>
  ) : (
    <Route key={route.path} path={route.path} element={route.component} />
  );
