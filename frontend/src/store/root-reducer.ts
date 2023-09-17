import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../utils/constant';
import { userData } from './user-data/user-data';


export const rootReducer = combineReducers({
  // [ReducerName.Guitars]: guitarsData.reducer,
  // [ReducerName.Guitar]: guitarData.reducer,
  [ReducerName.User]: userData.reducer
});
