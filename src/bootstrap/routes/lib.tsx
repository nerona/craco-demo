import { Route } from 'react-router-dom';

export type IRoute = {
  id?: string;
  path: string;
  component?: React.ReactNode;
  navigatorName?: string;
  navigatorIcon?: React.ReactNode;
  childRoutes?: IRoute[];
  roleRequire?: any[];
};

export function buildPath(contextPath: string, path?: string) {
  let newContextPath;
  if (typeof path === 'string' && /^\//.test(path)) {
    newContextPath = path;
  } else {
    newContextPath = `${contextPath}/${path}`;
  }

  return newContextPath;
}

export function buildMenuTree(routes: IRoute[] = [], contextPath = '') {
  return routes.map((route) => {
    const path = buildPath(contextPath, route.path);
    const menuItem: any = {
      label: route.navigatorName,
      icon: route.navigatorIcon,
      key: path,
    };

    if (route.childRoutes && route.childRoutes.length > 0) {
      menuItem.children = buildMenuTree(route.childRoutes, path);
    }

    return menuItem;
  });
}

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
