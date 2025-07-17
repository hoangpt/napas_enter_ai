import React from 'react';
import { Layout, Dropdown, Avatar, Switch, MenuProps } from 'antd';
import { DownOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { localizationConstants } from 'constants/index';
import { localizationHelpers } from 'helpers';
import { t } from 'helpers/i18n';
import { IRegionItem } from 'interfaces';
import { useThemeSwitch } from 'hooks/theme';
import sunIcon from 'assets/images/sun.png';
import moonIcon from 'assets/images/moon.png';
import { useAuth0 } from '@auth0/auth0-react';

const { Header } = Layout;
const { REGIONS } = localizationConstants;
const { getCurrentLanguage, changeLanguage } = localizationHelpers;

const AppHeader: React.FC<{ onClickSiderIcon: () => void }> = ({
  onClickSiderIcon,
}) => {
  // part handle logout redirect
  const { user, logout } = useAuth0();

  // get infor of user loaded through google api in session

  const localizationMenu: MenuProps = {
    items: Object.values(REGIONS).map((el: IRegionItem) => {
      return {
        label: (
          <div data-testid="btn-logout">
            <Avatar src={el.flag} shape="square" />
            <span style={{ marginLeft: 10 }}>{el.name}</span>
          </div>
        ),
        key: el.key,
        onClick: () => changeLanguage(el.key),
      };
    }),
  };

  const userMenu: MenuProps = {
    items: [
      {
        key: 1,
        label: (
          <>
            <LogoutOutlined />
            <span style={{ marginLeft: 10 }}>{t('Logout')}</span>
          </>
        ),
        onClick: () => logout({ returnTo: window.location.origin }),
      },
    ],
  };
  const currentRegion = REGIONS[getCurrentLanguage()];
  const { isDarkMode, toggleDarkMode } = useThemeSwitch();
  return (
    <Header className="app-header">
      <div className="d-flex align-items-center">
        <MenuOutlined
          data-testid="sider-icon"
          className="app-icon"
          onClick={onClickSiderIcon}
        />
      </div>

      <div>
        <Switch
          data-testid="theme-switch"
          className="theme-switch"
          title={t('SwitchTheme')}
          checked={isDarkMode}
          checkedChildren={
            <img width="16" height="16" src={moonIcon} alt="dark" />
          }
          unCheckedChildren={
            <img width="16" height="16" src={sunIcon} alt="light" />
          }
          onClick={toggleDarkMode}
        />
        <Dropdown menu={localizationMenu} trigger={['click']}>
          <span className="app-user">
            <Avatar src={currentRegion && currentRegion.flag} shape="square" />
            <span className="label">{currentRegion && currentRegion.name}</span>
            <DownOutlined />
          </span>
        </Dropdown>

        <Dropdown menu={userMenu} trigger={['click']}>
          <span className="app-user">
            <Avatar src={user?.picture} />
            <span className="label">{user?.name}</span>
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
