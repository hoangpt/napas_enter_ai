import { browserHistory } from 'helpers';
import Auth from 'helpers/auth';

const auth = new Auth();

const isLoggedIn = () => {
  return auth.isAuthenticated();
};

const login = () => {
  auth.login();
};

const logout = () => {
  auth.logout();
};

const getAccessToken = () => {
  return auth.getAccessToken();
};

const getUserInfo = () => {
  return auth.getProfile();
};

const getFullUserInfo = async () => {
  const fullUserInfo = await auth.getProfile();
  return fullUserInfo;
};

const denyAccess = () => {
  browserHistory.push('/403');
};

export default {
  isLoggedIn,
  login,
  logout,
  getAccessToken,
  getUserInfo,
  getFullUserInfo,
  denyAccess,
};
