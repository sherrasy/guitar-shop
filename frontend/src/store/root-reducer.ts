import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../utils/constant';
import { userData } from './user-data/user-data';
import { guitarsData } from './guitars-data/guitars-data';
import { guitarData } from './guitar-data/guitar-data';


export const rootReducer = combineReducers({
  [ReducerName.Guitars]: guitarsData.reducer,
  [ReducerName.Guitar]: guitarData.reducer,
  [ReducerName.User]: userData.reducer
});
