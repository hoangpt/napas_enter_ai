import { IPermission } from 'interfaces';

export const permission = (
  app: IPermission['app'],
  resource: IPermission['resource'],
  action?: IPermission['action']
) => ({
  app,
  resource,
  action,
});

const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export default {
  getWindowDimensions,
};
