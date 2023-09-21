import { Guitar } from '../../types/guitar.type';
import { State } from '../../types/state.type';
import { ReducerName } from '../../utils/constant';

export const getGuitar = (state:State):Guitar|null => state[ReducerName.Guitar].guitar;
export const getGuitarStatus = (state:State):boolean => state[ReducerName.Guitar].isGuitarLoading;
export const getGuitarError = (state:State):boolean => state[ReducerName.Guitar].hasError;
