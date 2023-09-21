import { Guitars } from '../../types/guitar.type';
import { State } from '../../types/state.type';
import { ReducerName } from '../../utils/constant';

export const getGuitars = (state:State):Guitars => state[ReducerName.Guitars].guitars;
export const getGuitarsStatus = (state:State):boolean => state[ReducerName.Guitars].isGuitarsLoading;
export const getPagesAmount = (state:State):number|null => state[ReducerName.Guitars].pages;
