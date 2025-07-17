import { useState, useEffect, useContext } from 'react';
import userHelpers from 'helpers/user';
import { userServices } from 'services';
import { IRoute } from 'interfaces';
import { StoreContext } from 'contexts';
interface IUserDetailsInfo {
  sub?: string;
  nickname?: string;
  name?: string;
  picture?: string;
  updated_at?: string;
  email?: string;
  email_verified?: string;
}
const useUserInfo = () => {
  const [currentUser, setCurrentUser] = useState<IUserDetailsInfo>();

  const getFullUserInfo = async () => {
    const fullUserInfo = await userServices.getFullUserInfo();
    setCurrentUser(fullUserInfo);
  };

  useEffect(() => {
    getFullUserInfo();
  }, []);

  return { currentUser };
};

const useAuthorizationData = (items: IRoute[]) => {
  const { currentUser } = useContext(StoreContext);

  // Get navigation which match permissions to build menu
  const filteredNavigation = userHelpers.filterHasPermissions(
    items,
    currentUser.permissions
  );

  // Only get routes which is link to a component
  const filteredRoutes = filteredNavigation.filter(
    item => !item.children && item.component
  );

  return {
    filteredNavigation,
    filteredRoutes,
  };
};

export default {
  useUserInfo,
  useAuthorizationData,
};
