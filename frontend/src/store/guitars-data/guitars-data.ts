import { createSlice } from '@reduxjs/toolkit';
import { GuitarsState } from '../../types/state.type';
import { ReducerName } from '../../utils/constant';
import { fetchGuitars, fetchPagesAmount } from './api-actions';

const initialState:GuitarsState = {
  guitars: [],
  isGuitarsLoading:false,
  pages:null
};

export const guitarsData = createSlice({
  name: ReducerName.Guitars,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(fetchGuitars.pending, (state) => {
        state.isGuitarsLoading = true;
      })
      .addCase(fetchGuitars.fulfilled, (state, action) => {
        state.isGuitarsLoading = false;
        state.guitars = action.payload ?? [];
      })
      .addCase(fetchGuitars.rejected, (state) => {
        state.isGuitarsLoading = false;
        state.guitars = [];
      })
      .addCase(fetchPagesAmount.fulfilled, (state, action) => {
        state.pages = action.payload ?? null;
      });
  }
});
