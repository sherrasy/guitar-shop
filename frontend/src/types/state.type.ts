import {store} from '../store/index.js';
import { UserAuthStatus } from './user-auth-status.type.js';
import { UserData } from './user-data.type.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authStatus: UserAuthStatus;
  userData: UserData | null;
 }
