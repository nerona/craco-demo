import React, { useMemo, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { routes } from '~bootstrap/routes';

const { Content, Footer, Sider } = Layout;

const SiderStyled = styled(Sider)``;
const LogoStyled = styled.div`
  height: 48px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
`;
const LayoutStyled = styled(Layout)`
  height: 100vh;
`;
const ContentStyled = styled(Content)`
  flex: 1;
  padding: 24px 16px 0;
`;
const FooterStyled = styled(Footer)`
  text-align: center;
`;

export const App: React.FC<{}> = React.memo(() => {
  const items: MenuProps['items'] = useMemo(
    () =>
      (routes[routes.length - 1].childRoutes || []).map(
        ({ path, navigatorIcon, navigatorName }) => ({
          key: path,
          icon: navigatorIcon,
          label: navigatorName,
        })
      ),
    []
  );

  const navigate = useNavigate();

  const handleMenuClick = useCallback(
    ({ key }: any) => {
      navigate(key);
    },
    [navigate]
  );

  return (
    <Layout>
      <SiderStyled breakpoint="lg" collapsedWidth={0}>
        <LogoStyled />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          items={items}
          onClick={handleMenuClick}
        />
      </SiderStyled>

      <LayoutStyled>
        <ContentStyled>
          <div style={{ textAlign: 'center', background: '#fff', height: '100%' }}>
            <Outlet />
          </div>
        </ContentStyled>
        <FooterStyled>Ant Design ©2018 Created by Ant UED</FooterStyled>
      </LayoutStyled>
    </Layout>
  );
});
