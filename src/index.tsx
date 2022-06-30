import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { routes, IRoute } from '~bootstrap/routes';
import { NotFound } from '~pages/NotFound/NotFound';
import reportWebVitals from './reportWebVitals';

import './index.css';

const renderRoute = (route: IRoute) =>
  route.childRoutes?.length ? (
    <Route path={route.path} element={route.component}>
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

console.log(process.env.config);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          {routes.map((route: IRoute) => renderRoute(route))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
