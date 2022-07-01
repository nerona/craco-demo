import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { routes } from '~bootstrap/routes';
import { IRoute, renderRoute } from '~bootstrap/routes/lib';
import { NotFound } from '~pages/NotFound/NotFound';
import reportWebVitals from './reportWebVitals';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Routes>
          {routes.map((route: IRoute, index: number) => renderRoute(route, index))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
