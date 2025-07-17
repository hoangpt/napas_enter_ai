import React from 'react';
import { Result } from 'antd';
import { t } from 'helpers/i18n';
import { BackToHomeButton, LogoutButton } from 'components/shared/Button';

const Page500: React.FC = () => {
  return (
    <Result
      className="app-result-page"
      status="500"
      title="500"
      subTitle={t('SomethingWentWrong')}
      extra={
        <>
          <BackToHomeButton className="mr-half" />
          <LogoutButton />
        </>
      }
    />
  );
};

export default Page500;
