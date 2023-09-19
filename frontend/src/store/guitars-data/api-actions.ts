import { createAsyncThunk } from '@reduxjs/toolkit';
import { Guitars } from '../../types/guitar.type';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosError, AxiosInstance } from 'axios';
import { ActionName, ApiErrosMessage, ApiRoute, DEFAULT_PAGE_SERVER, PaginationParam, ReducerName } from '../../utils/constant';
import { toast } from 'react-toastify';
import { AxiosErrorResponse } from '../../types/axios-error-response.type';

export const fetchGuitars = createAsyncThunk<Guitars|void, number|undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Guitars}/${ActionName.FetchGuitars}`,
  async (page, {extra: api}) => {
    try {
      const serverPage = page ? page - PaginationParam.DefaultPage : DEFAULT_PAGE_SERVER;
      const {data} = await api.get<Guitars>(`${ApiRoute.GuitarList}?page=${serverPage}`);
      return data;
    } catch(error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message, {toastId:ActionName.FetchGuitars});
    }
  },
);

export const fetchPagesAmount = createAsyncThunk<number|void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Guitars}/${ActionName.FetchPagesAmount}`,
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<number>(ApiRoute.PagesAmount);
      return data;
    } catch {
      toast.error(ApiErrosMessage.FetchPagesError, {toastId:ActionName.FetchPagesAmount});
    }
  },
);

