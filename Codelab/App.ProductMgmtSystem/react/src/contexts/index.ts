import { createContext } from 'react';
import { IUserDetailsInfo } from 'teko-oauth2';
import { currentUser } from 'services/mocks/user';

interface StoreContextType {
  currentUser: IUserDetailsInfo;
}

const StoreContext = createContext<StoreContextType>({
  currentUser,
});

export { StoreContext };
