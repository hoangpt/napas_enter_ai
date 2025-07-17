import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonProps } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { userHelpers } from 'helpers';
import { t } from 'helpers/i18n';

const { logout } = userHelpers;

export const BackToHomeButton: React.FC<ButtonProps> = props => (
  <Link to="/">
    <Button type="primary" icon={<HomeOutlined />} {...props}>
      {t('BackToHome')}
    </Button>
  </Link>
);

export const LogoutButton: React.FC<ButtonProps> = props => (
  <Button icon={<LogoutOutlined />} onClick={logout} {...props}>
    {t('Logout')}
  </Button>
);
