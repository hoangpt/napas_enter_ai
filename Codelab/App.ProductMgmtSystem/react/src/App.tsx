import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.less';
import './App.scss';
import Page403 from 'containers/shared/Page403';
import Page404 from 'containers/shared/Page404';
import Page500 from 'containers/shared/Page500';
import AppLayout from 'containers/AppLayout';
import { Spin } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from 'components/shared/ProtectedRoute';

const App: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return (
      <div>
        <Spin className="app-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/403" component={Page403} />
        <Route exact path="/404" component={Page404} />
        <Route exact path="/500" component={Page500} />
        <ProtectedRoute component={AppLayout} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
