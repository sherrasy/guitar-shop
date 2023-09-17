import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {saveToken} from '../../services/token';
import { toast } from 'react-toastify';
import { AppDispatch, State } from '../../types/state.type';
import { UserData } from '../../types/user-data.type';
import { ActionName, ApiError, ApiRoute, AppRoute, ReducerName } from '../../utils/constant';
import { AuthData } from '../../types/auth-data.type';
import { redirectToRoute } from '../action';


export const checkAuth = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.CheckAuth}`,
  async (_arg, {extra: api}) => {
    try{
      const {data} = await api.get<UserData>(ApiRoute.Login);
      return data;
    }catch(error){
      return Promise.reject(error);
    }
  }
);

export const login = createAsyncThunk<UserData|void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.Login}`,
  async (authData, { dispatch, extra: api}) => {
    try{
      const {data} = await api.post<UserData>(ApiRoute.Login, authData);
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.List));
      return data;}
    catch{
      toast.error(ApiError.Login, {toastId:'login'});
    }
  },
);
