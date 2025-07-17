import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

interface AppBreadcrumbProps {
  crumbs: Route[];
}

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = props => {
  const { crumbs } = props;

  const itemRender = (route: Route, params: object, routes: Route[]) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  };

  return (
    <Breadcrumb
      className="app-breadcrumb"
      itemRender={itemRender}
      routes={crumbs}
    />
  );
};

export default AppBreadcrumb;
