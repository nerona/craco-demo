import React, { useCallback, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Grid } from 'antd';
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
  const { pathname } = useLocation();
  const breakpoint = Grid.useBreakpoint();
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    if (pathname.length > 0) {
      setActiveKey([pathname]);
      setOpenKeys([pathname.split('/').slice(0, -1).join('/')]);
    }
  }, [pathname]);

  const handleSubMenuClick = useCallback((keys: string[]) => {
    const value = keys.length > 0 ? keys.pop() : undefined;
    setOpenKeys(value ? [value] : []);
  }, []);

  return (
    <Layout>
      <SiderStyled breakpoint="md" collapsedWidth={0}>
        <LogoStyled />
        <Menu
          theme="dark"
          mode="inline"
          items={routeMenus}
          selectedKeys={activeKey}
          openKeys={breakpoint.md ? openKeys : undefined}
          onOpenChange={handleSubMenuClick}
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
