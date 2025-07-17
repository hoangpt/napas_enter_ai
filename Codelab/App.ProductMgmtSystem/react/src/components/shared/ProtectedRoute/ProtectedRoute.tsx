import React, { ComponentType } from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Spin } from 'antd';
interface ProtectedRouteProp {
  path: string;
  component: ComponentType;
}
const ProtectedRoute: React.FC<ProtectedRouteProp> = ({
  component,
  ...res
}: ProtectedRouteProp) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Spin className="app-spin" />,
    })}
    {...res}
  />
);

export default ProtectedRoute;
