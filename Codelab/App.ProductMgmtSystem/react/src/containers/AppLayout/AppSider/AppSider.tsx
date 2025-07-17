import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import classNames from 'classnames';
import { IRoute } from 'interfaces';
import { commonHooks } from 'hooks';
import logo from 'assets/images/honda-logo.svg';

const { Sider, Footer } = Layout;
const { useAppMenu } = commonHooks;

interface AppSiderProps {
  filteredNavigation: IRoute[];
  collapsed: boolean;
}

type MenuItem = Required<MenuProps>['items'][number];

const AppSider: React.FC<AppSiderProps> = props => {
  // Get selectedKey, openKey from route & pathname
  const { filteredNavigation, collapsed } = props;

  const { selectedKey, openKey } = useAppMenu(filteredNavigation);

  const menuItems: MenuItem[] = filteredNavigation.map(item => {
    if (!item.icon) return null;
    if (!item.children) {
      return {
        key: item.path,
        label: (
          <Link to={item.path}>
            <item.icon className="app-icon" />
            <span>{item.name}</span>
          </Link>
        ),
      };
    } else {
      const { children } = item;
      const childs = filteredNavigation.filter(
        child => children.includes(child.path) && !child.children
      );
      return {
        key: item.path,
        label: (
          <span>
            <item.icon className="app-icon" />
            <span>{item.name}</span>
          </span>
        ),
        children: childs.map(child => {
          return {
            key: child.path,
            label: <Link to={child.path}>{child.name}</Link>,
          };
        }),
      };
    }
  });

  return (
    <Sider
      className={classNames({
        'app-sider': true,
        collapsed,
      })}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={270}
    >
      <div className="app-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <Menu
        className="app-menu"
        // theme="dark"
        mode="inline"
        defaultOpenKeys={[openKey]}
        selectedKeys={[selectedKey]}
        items={menuItems}
      />

      {!collapsed && (
        <Footer className="app-footer">
          Honda IQBooster © {process.env.REACT_APP_VERSION}
        </Footer>
      )}
    </Sider>
  );
};

export default AppSider;
