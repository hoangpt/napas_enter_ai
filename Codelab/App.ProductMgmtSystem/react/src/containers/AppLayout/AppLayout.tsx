import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { userHooks, commonHooks } from 'hooks';
import routes from 'routes';
import { IRoute } from 'interfaces';
import AppSider from './AppSider';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import './AppLayout.scss';

const { useWindowDimensions } = commonHooks;

let autoCollapseSider = true;

/**
 * This container is for lifting-up the `AppContent` to the parent node,
 * so we can avoid unnecessary re-calculation when resizing window
 * */
const AppLayoutContainer: React.FC<{ filteredNavigation: IRoute[] }> = ({
  children,
  filteredNavigation,
}) => {
  const { isTabletView } = useWindowDimensions();
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const toggleSider = () => {
    autoCollapseSider = false;
    setSiderCollapsed(collapsed => !collapsed);
  };

  useEffect(() => {
    if (autoCollapseSider) {
      setSiderCollapsed(isTabletView);
    }
  }, [isTabletView]);

  return (
    <Layout className="app-layout">
      <AppSider
        filteredNavigation={filteredNavigation}
        collapsed={siderCollapsed}
      />
      <Layout>
        <AppHeader onClickSiderIcon={toggleSider} />
        {children}
      </Layout>
    </Layout>
  );
};

const AppLayout: React.FC = () => {
  const { filteredRoutes, filteredNavigation } = userHooks.useAuthorizationData(
    routes as IRoute[]
  );

  return (
    <AppLayoutContainer filteredNavigation={filteredNavigation}>
      <AppContent filteredRoutes={filteredRoutes} />
    </AppLayoutContainer>
  );
};

export default AppLayout;
