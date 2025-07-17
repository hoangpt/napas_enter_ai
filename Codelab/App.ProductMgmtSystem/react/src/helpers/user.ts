import commonConstants from 'constants/common';
import { userServices } from 'services';
import { IRoute } from 'interfaces';

const { ALL } = commonConstants;

const permission = (app: string, resource: string, action?: string) => {
  return [app, resource, action].filter(x => !!x).join(':');
};

const checkPermission = (
  permissions: string[],
  app: string,
  resource: string,
  action?: string
) => {
  const perform = permission(app, resource, action);
  const performAllAction = permission(app, resource, ALL);
  const performAllResource = permission(app, ALL, ALL);
  const allPerforms = [perform, performAllAction, performAllResource];

  return !!(permissions && permissions.find(p => allPerforms.includes(p)));
};

const filterHasPermissions = (
  items: IRoute[],
  currentPermissions: string[]
) => {
  return items.filter(item => {
    const { permissions, children } = item;
    if (!permissions) return true;
    const intersection = permissions.find(x => {
      const { app, resource, action } = x;
      if (children) {
        if (!currentPermissions) return false;
        return currentPermissions.some(p => {
          return (
            p.startsWith(permission(app, resource, action)) ||
            p.startsWith(permission(app, resource, ALL)) ||
            p.startsWith(permission(app, ALL, ALL))
          );
        });
      }
      return checkPermission(currentPermissions, app, resource, action);
    });
    return !!intersection;
  });
};

const logout = () => {
  userServices.logout();
};

export default {
  permission,
  checkPermission,
  filterHasPermissions,
  logout,
};
