import { createAsyncThunk } from '@reduxjs/toolkit';
import { Guitar } from '../../types/guitar.type';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosError, AxiosInstance } from 'axios';
import { ActionName, ApiRoute, AppRoute, ReducerName } from '../../utils/constant';
import { toast } from 'react-toastify';
import { AxiosErrorResponse } from '../../types/axios-error-response.type';
import { StatusCodes } from 'http-status-codes';
import { redirectToRoute } from '../action';
import { fetchGuitars } from '../guitars-data/api-actions';


export const fetchGuitarById = createAsyncThunk<Guitar|void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Guitar}/${ActionName.FetchGuitar}`,
  async (guitarId, {dispatch, extra:api}) => {
    try {
      const {data} = await api.get<Guitar>(`${ApiRoute.GuitarList}/${guitarId}`);
      return data;
    }catch(error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;

      if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
        dispatch(redirectToRoute(AppRoute.Error));
      }

      toast.error(axiosError.response?.data.message, {toastId:ActionName.FetchGuitar});
    }
  },
);

export const deleteGuitar = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Guitar}/${ActionName.FetchGuitar}`,
  async (id, {dispatch, extra:api }) => {
    await api.delete(`${ApiRoute.GuitarList}/${id}`);
    dispatch(fetchGuitars());
    dispatch(redirectToRoute(AppRoute.List));
  });
