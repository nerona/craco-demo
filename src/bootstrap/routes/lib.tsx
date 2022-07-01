import { Route, Link } from 'react-router-dom';
import { NotFound } from '~pages/NotFound/NotFound';

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

      const { childRoutes = [], link, path, navigatorName, navigatorIcon } = route || [];
      const computedPath = buildPath(contextPath, path);
      const menuItem: any = {
        label: link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {navigatorName}
          </a>
        ) : childRoutes.length ? (
          <span>{navigatorName}</span>
        ) : (
          <Link to={computedPath}>{navigatorName}</Link>
        ),
        icon: navigatorIcon,
        key: link ? link : computedPath,
      };

      if (childRoutes.length > 0) {
        menuItem.children = buildMenuTree(childRoutes, computedPath);
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
      <Route path="*" element={<NotFound />} />
    </Route>
  ) : (
    renderRouteItem(route, `${index}`)
  );
