import { createAsyncThunk } from '@reduxjs/toolkit';
import { Guitars } from '../../types/guitar.type';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosError, AxiosInstance } from 'axios';
import { ActionName, ApiRoute, ReducerName } from '../../utils/constant';
import { toast } from 'react-toastify';
import { AxiosErrorResponse } from '../../types/axios-error-response.type';

export const fetchGuitars = createAsyncThunk<Guitars|void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Guitars}/${ActionName.FetchGuitars}`,
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<Guitars>(ApiRoute.GuitarList);
      return data;
    } catch(error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message, {toastId:ActionName.FetchGuitars});
    }
  },
);

