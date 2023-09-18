import {AxiosInstance, AxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {saveToken} from '../../services/token';
import { toast } from 'react-toastify';
import { AppDispatch, State } from '../../types/state.type';
import { UserData } from '../../types/user-data.type';
import { ActionName, ApiRoute, AppRoute, ReducerName } from '../../utils/constant';
import { AuthData } from '../../types/auth-data.type';
import { redirectToRoute } from '../action';
import CreateUserDto from '../../dto/user/create-user.dto';
import { AxiosErrorResponse } from '../../types/axios-error-response.type';


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
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message, {toastId:ActionName.CheckAuth});
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
    catch(error){
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message, {toastId:ActionName.Login});
    }
  },
);

export const register = createAsyncThunk< void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.Register}`,
  async (authData, { dispatch, extra: api}) => {
    try{
      await api.post<CreateUserDto>(ApiRoute.Register, authData);
      dispatch(redirectToRoute(AppRoute.Login));
    }
    catch(error){
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message, {toastId:ActionName.Register});
    }
  },
);
