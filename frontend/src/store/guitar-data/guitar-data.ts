import { createSlice } from '@reduxjs/toolkit';
import { GuitarState } from '../../types/state.type';
import { ReducerName } from '../../utils/constant';
import { fetchGuitarById } from './api-actions';

const initialState:GuitarState = {
  guitar: null,
  isGuitarLoading:false,
  hasError: false,
};

export const guitarData = createSlice({
  name: ReducerName.Guitar,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(fetchGuitarById.pending, (state) => {
        state.isGuitarLoading = true;
      })
      .addCase(fetchGuitarById.rejected, (state) => {
        state.isGuitarLoading = false;
        state.hasError = true;
      })
      .addCase(fetchGuitarById.fulfilled, (state, action) => {
        state.isGuitarLoading = false;
        state.guitar = action.payload ?? null;
        state.hasError = false;
      });
  }
});
