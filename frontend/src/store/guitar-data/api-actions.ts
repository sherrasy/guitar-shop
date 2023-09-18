import { createAsyncThunk } from '@reduxjs/toolkit';
import { Guitar } from '../../types/guitar.type';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosError, AxiosInstance } from 'axios';
import { ActionName, ApiRoute, ReducerName } from '../../utils/constant';
import { toast } from 'react-toastify';
import { AxiosErrorResponse } from '../../types/axios-error-response.type';

export const fetchGuitarById = createAsyncThunk<Guitar|void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Guitar}/${ActionName.FetchGuitar}`,
  async (guitarId, {extra: api}) => {
    try {
      const {data} = await api.get<Guitar>(`${ApiRoute.GuitarList}/${guitarId}`);
      return data;
    }catch(error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message, {toastId:ActionName.FetchGuitar});
    }
  },
);
