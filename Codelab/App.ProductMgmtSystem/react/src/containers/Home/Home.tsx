import React from 'react';
import { t } from 'helpers/i18n';
import AppContainer from 'containers/AppLayout/AppContainer';

const Home: React.FC = () => {
  return <AppContainer title={t('WelcomeText')} />;
};

export default Home;
