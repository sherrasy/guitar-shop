import {store} from '../store/index.js';
import { Guitar, Guitars } from './guitar.type.js';
import { UserAuthStatus } from './user-auth-status.type.js';
import { User } from './user.type.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authStatus: UserAuthStatus;
  userData: User | null;
 }

export type GuitarState = {
  guitar: Guitar|null;
  isGuitarLoading:boolean;
  hasError: boolean;
 }

export type GuitarsState = {
  guitars: Guitars;
  isGuitarsLoading: boolean;
  pages:number|null;
 }
