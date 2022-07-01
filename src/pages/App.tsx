import React, { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import { routeMenus } from '~bootstrap/routes';

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
  const navigate = useNavigate();

  const handleMenuClick = useCallback(
    ({ key }: any) => {
      navigate(key);
    },
    [navigate]
  );

  return (
    <Layout>
      <SiderStyled breakpoint="md" collapsedWidth={0}>
        <LogoStyled />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          items={routeMenus}
          onClick={handleMenuClick}
        />
      </SiderStyled>

      <LayoutStyled>
        <ContentStyled>
          <Outlet />
        </ContentStyled>
        <FooterStyled>Qkids Admin ©2022 Created by Nerona</FooterStyled>
      </LayoutStyled>
    </Layout>
  );
});
