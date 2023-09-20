import { createAsyncThunk } from '@reduxjs/toolkit';
import { Guitar, NewGuitar } from '../../types/guitar.type';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosError, AxiosInstance } from 'axios';
import { ActionName, ApiRoute, AppRoute, ReducerName } from '../../utils/constant';
import { toast } from 'react-toastify';
import { AxiosErrorResponse } from '../../types/axios-error-response.type';
import { StatusCodes } from 'http-status-codes';
import { redirectToRoute } from '../action';
import { fetchGuitars } from '../guitars-data/api-actions';
import { adaptGuitarToClient } from '../../utils/adapters/adaptersToClient';
import { adaptCreateGuitarToServer, adaptEditGuitarToServer, adaptPhotoToServer } from '../../utils/adapters/adaptersToServer';
import GuitarDto from '../../dto/guitar/guitar.dto';


export const fetchGuitarById = createAsyncThunk<Guitar|void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Guitar}/${ActionName.FetchGuitar}`,
  async (guitarId, {dispatch, extra:api}) => {
    try {
      const {data} = await api.get<Guitar>(`${ApiRoute.GuitarList}/${guitarId}`);
      return adaptGuitarToClient(data);
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


export const editGuitar = createAsyncThunk<Guitar, Guitar, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     `${ReducerName.Guitar}/${ActionName.EditGuitar}`,
     async (guitar, { dispatch, extra: api }) => {
       const postPhotoApiRoute = `${ApiRoute.GuitarList}/${guitar.id}/${ApiRoute.Photo}`;
       await api.post(postPhotoApiRoute, adaptPhotoToServer(guitar.photo), {
         headers: { 'Content-Type': 'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
       });
       const { data } = await api.patch<GuitarDto>(`${ApiRoute.GuitarList}/${guitar.id}`, adaptEditGuitarToServer(guitar));

       dispatch(redirectToRoute(`${AppRoute.List}/${data.id}`));
       return adaptGuitarToClient(data);
     });

export const createGuitar = createAsyncThunk<Guitar, NewGuitar, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     `${ReducerName.Guitar}/${ActionName.CreateGuitar}`,
     async (newGuitar, { dispatch, extra: api }) => {
       const { data } = await api.post<GuitarDto>(`${ApiRoute.GuitarList}`, adaptCreateGuitarToServer(newGuitar));
       if(data){
         const postPhotoApiRoute = `${ApiRoute.GuitarList}/${data.id}/${ApiRoute.Photo}`;
         await api.post(postPhotoApiRoute, adaptPhotoToServer(newGuitar.photo), {
           headers: { 'Content-Type': 'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
         });

       }
       dispatch(redirectToRoute(`${AppRoute.List}/${data.id}`));
       return adaptGuitarToClient(data);
     });
