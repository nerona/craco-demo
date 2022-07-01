import { Route } from 'react-router-dom';

export type IRoute = Partial<{
  id: string;
  path: string;
  component: React.ReactNode;
  navigatorName: string;
  navigatorIcon: React.ReactNode;
  childRoutes: IRoute[];
  roleRequire: any[];
  index: boolean;
  link: string;
}>;

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
  return routes
    .map((route) => {
      if (route.index) return null;

      const path = buildPath(contextPath, route.path);
      const menuItem: any = {
        label: route.navigatorName,
        icon: route.navigatorIcon,
        key: route.path ? path : route.link,
      };

      if (route.childRoutes && route.childRoutes.length > 0) {
        menuItem.children = buildMenuTree(route.childRoutes, path);
      }

      return menuItem;
    })
    .filter(Boolean);
}

export const renderRouteItem = (route: IRoute, key: string) => {
  if (route.index) {
    return <Route key={key} index={route.index} element={route.component} />;
  }

  if (route.path) {
    return <Route key={route.path} path={route.path} element={route.component} />;
  }

  return null;
};

export const renderRoute = (route: IRoute, index: number) =>
  route.childRoutes?.length ? (
    <Route key={route.path} path={route.path} element={route.component}>
      {route.childRoutes.map((childRoute: IRoute, childIndex: number) =>
        childRoute.childRoutes?.length
          ? renderRoute(childRoute, childIndex)
          : renderRouteItem(childRoute, `${index}_${childIndex}`)
      )}
    </Route>
  ) : (
    renderRouteItem(route, `${index}`)
  );
