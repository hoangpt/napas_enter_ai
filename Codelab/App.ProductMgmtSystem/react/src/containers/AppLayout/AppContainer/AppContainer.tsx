import React from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';

const { Title } = Typography;

interface AppContainerProps {
  title: React.ReactNode;
  head?: React.ReactNode;
  className?: string;
}

const AppContainer: React.FC<AppContainerProps> = props => {
  const { title, head, className, children } = props;

  return (
    <div className="app-container">
      <div className="app-container-head">
        <Title className="app-title" level={4}>
          {title}
        </Title>
        {head}
      </div>

      {children && (
        <div
          className={classNames({
            'app-container-body': true,
            ...(className && { [className]: true }),
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AppContainer;
