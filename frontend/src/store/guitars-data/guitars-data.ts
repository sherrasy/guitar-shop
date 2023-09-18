import { createSlice } from '@reduxjs/toolkit';
import { GuitarsState } from '../../types/state.type';
import { ReducerName } from '../../utils/constant';
import { fetchGuitars } from './api-actions';

const initialState:GuitarsState = {
  guitars: [],
  isGuitarsLoading:false,
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
      .addCase(fetchGuitars.rejected, (state, ) => {
        state.isGuitarsLoading = false;
        state.guitars = [];
      });
  }
});
